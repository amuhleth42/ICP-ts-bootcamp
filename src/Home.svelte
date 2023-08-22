<script lang="ts">

    import { AuthClient } from '@dfinity/auth-client';
    import { all } from './global';

    export let authClient: AuthClient;

    function logout() {
        console.log("clicked logout");
        //console.log(authClient);

        //console.log(loggedIn);
        authClient.logout();
        all.loggedIn = false;
        console.log(all.loggedIn);
    }

</script>


<h1>You are inside !</h1>

<button on:click={ logout } id='logoutButton'>Logout</button>