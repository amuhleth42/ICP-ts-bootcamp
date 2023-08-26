<script lang="ts">

import { AuthClient } from '@dfinity/auth-client';
import { Actor, HttpAgent } from '@dfinity/agent';
import Home from './Home.svelte';
import { writable } from 'svelte/store';
import { all } from './global'
import { internet_identity, canisterId as iiId } from './declarations/internet_identity';

let authClient;

$: isLoggedIn = all.loggedIn;

$: console.log("bro? ", isLoggedIn);

let login = async () => {
  console.log(1, process.env.CANISTER_ID_INTERNET_IDENTITY);
  console.log(1, process.env.CANISTER_ID_internet_identity);
  console.log(1, process.env.INTERNET_IDENTITY_CANISTER_ID);
  console.log('damn boy', iiId);


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

let logout = () => {
  console.log("yo hey");

};


const init = async () => {

  all.loggedIn = false;
  //process.env.CANISTER_ID_INTERNET_IDENTITY = 'br5f7-7uaaa-aaaaa-qaaca-cai';
  //process.env.CANISTER_ID_INTERNET_IDENTITY = 'be2us-64aaa-aaaaa-qaabq-cai';
  console.table(process.env);
  authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  }
  

  /*let logoutButton = document.querySelector('#logoutButton') as HTMLButtonElement;
    logoutButton.onclick = async () => {
        await console.log("click");
    };*/
};



async function handleAuthenticated(authClient) {
  const identity = (await authClient.getIdentity());
  all.loggedIn = true;
  console.log("auth success!");
  document.location.href = '/signup';
}


init();

</script>

<main>
  {#if !isLoggedIn}
    <h1>Login test</h1>
    <button on:click={login} id="loginButton">Sign in with Internet Identity</button>
  {:else}
    <Home {authClient} bind:bound={isLoggedIn}></Home>
  {/if}
    
    
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
 
</style>
