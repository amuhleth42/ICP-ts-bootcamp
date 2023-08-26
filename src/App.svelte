<script lang='ts'>

  import Routes from "./Routes.svelte";
  import Header from './Header.svelte';
  import { AuthClient } from "@dfinity/auth-client";

  let authClient: AuthClient;

  async function init() {
    authClient = await AuthClient.create();
  }

</script>

{#await init()}
  <p>loading...</p>  
{:then _} 
  <Header {authClient}/>
  <div class="body">
    <Routes {authClient}/>
  </div>
{/await}


<style>

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}

</style>