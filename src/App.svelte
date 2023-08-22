<script lang="ts">

import { AuthClient } from '@dfinity/auth-client';
import { Actor, HttpAgent } from '@dfinity/agent';
  import { idlFactory } from './declarations/backend';

const init = async () => {
  const authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  }
  
  let loginButton = document.querySelector('#loginButton') as HTMLButtonElement;
  loginButton.onclick = async () => {
    await authClient.login({
      onSuccess: async () => {
        handleAuthenticated(authClient);
      },
    });
  };
};


async function handleAuthenticated(authClient: AuthClient) {
  const identity = await authClient.getIdentity();

  const agent = new HttpAgent({ identity });

  console.log(process.env.CANISTER_ID);
  const whoami_actor = Actor.createActor<_SERVICE>(idlFactory, {
    agent,
    canisterId: process.env.CANISTER_ID as string,
  });
  renderLoggedIn(whoami_actor, authClient);
}

init();

</script>

<main>
      <h1>Login test</h1>
    

     <button id="loginButton">Sign in with Internet Identity</button>
    
    
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
</style>
