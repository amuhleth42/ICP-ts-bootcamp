<script lang="ts">

    import { AuthClient } from '@dfinity/auth-client';
    import { all } from './global';
    import Counter from './components/Counter.svelte';
    import { backend } from "./declarations/backend/index.js";
    import { Principal } from '@dfinity/principal';
    import type { User } from './types';
    import TokenInfos from './TokenInfos.svelte';
    import MemberList from './MemberList.svelte';
    import Board from './Board.svelte';
    import Vote from './Vote.svelte';
    import Lists from './Lists.svelte';
    import { Router, Route, Link } from 'svelte-routing';

    export let authClient: AuthClient;
    export let bound = true;

    let user: User;

    $: signedUp = false;
    let username = '';

    let principal: Principal;
    principal = authClient.getIdentity().getPrincipal();

    function logout() {
        console.log("clicked logout");
        //console.log(authClient);
        //console.log(loggedIn);
        authClient.logout();
        all.loggedIn = false;
        bound = false;
        //console.log(all.loggedIn);
    }

    async function handleSubmit(event: Event): Promise<void> {
    	event.preventDefault();

		const form: any = event.target;
		
		if (form == null)
			return ;
		if (form.checkValidity()) {
			user = await backend.createUser(principal, username);
            console.log("createUser done!");
            signedUp = true;
			form.reset();
            document.location.href = '/lists';
		} else{
			// Display validation errors
			//passwordInput.reportValidity();
            console.log("error form");
			//password2Input.reportValidity();
		}
	}
    //console.log(authClient.getIdentity().getPrincipal());
    //console.log(typeof authClient.getIdentity().getPrincipal());

    let isSignedUp = async (id: Principal) => {
        const found = await backend.readUserById(id);
        //console.log("found", found);
        //console.log("typeof found", typeof found);
        if (found.length > 0) {
            user = found[0];
            //console.log('user', user)
            return (true);
        }
        return (false);

    };

    let init = async () => {
        signedUp = await isSignedUp(principal);
        //console.log("issignedup: ", signedUp);
    };
    init();

</script>

    <h1>ICP Rankers</h1>
    
            <div class="signup">
                <h2>Choose your username :</h2>
                <form class="container" on:submit|preventDefault={handleSubmit}>
                    <div class="input">
                        <input type="text" id="username" bind:value={username} placeholder="Username" required minlength="3" maxlength="20">
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
    
    
        <!-- <h2>Hello, {user.username}</h2> -->
        <!-- <TokenInfos {principal}/>
        <MemberList {principal}/> -->
        <!-- <Board />
        <Vote {principal}/> -->

        <Route path='/lists'>
            <Lists />
        </Route>
    
    <div class="bottom">
        <Counter />
        <button on:click={ logout } id='logoutButton'>Logout</button>
    </div>

<style>

.bottom {
    display: flex;
    margin: 30px;
    gap: 15px;
}


</style>