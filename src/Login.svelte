<script lang='ts'>

import { AuthClient } from "@dfinity/auth-client";
import { all } from "./global";
import { internet_identity, canisterId as iiId } from "./declarations/internet_identity";


export let authClient: AuthClient;


async function handleAuthenticated(authClient) {
  const identity = (await authClient.getIdentity());
  all.loggedIn = true;
  console.log("auth success!");
  document.location.href = '/signup';
}

let login = async () => {
  await authClient.login({
    identityProvider:
      process.env.DFX_NETWORK === "ic"
      ? "https://identity.ic0.app/#authorize"
      : `http://localhost:4943?canisterId=${iiId}#authorize`,
    onSuccess: async () => {
      handleAuthenticated(authClient);
    },
  });
};

async function init() {
    all.loggedIn = false;
    //process.env.CANISTER_ID_INTERNET_IDENTITY = 'br5f7-7uaaa-aaaaa-qaaca-cai';
    //process.env.CANISTER_ID_INTERNET_IDENTITY = 'be2us-64aaa-aaaaa-qaabq-cai';
    console.table(process.env);
    if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
    }
};




</script>

{#await init()}
    <p>loading...</p>   
{:then _} 
    <h1>Login test</h1>
    <button on:click={login} id="loginButton">Sign in with Internet Identity</button>
{/await}