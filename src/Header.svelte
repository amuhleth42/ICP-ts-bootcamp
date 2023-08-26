<script lang='ts'>

import { AuthClient } from "@dfinity/auth-client";
import { all } from "./global";

export let authClient: AuthClient

$: isLoggedIn = all.loggedIn;

function logout() {
    console.log("clicked logout");
    //console.log(authClient);
    //console.log(loggedIn);
    authClient.logout();
    all.loggedIn = false;
    document.location.href = '/';
    //bound = false;
    //console.log(all.loggedIn);
}


</script>



<div class="header">
    <h1>ICP Rankers</h1>
    {#if !isLoggedIn}
        <button on:click={ logout } id='logoutButton'>Logout</button>
    {/if}
</div>


<style>

.header {
    display: flex;
    width: 100%;
    padding: 20px;
    gap: 30px;
    border-bottom: 1px solid white;
}

</style>