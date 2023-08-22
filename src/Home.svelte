<script lang="ts">

    import { AuthClient } from '@dfinity/auth-client';
    import { all } from './global';
    import Counter from './components/Counter.svelte';

    export let authClient: AuthClient;
    export let bound = true;

    let username = '';

    function logout() {
        console.log("clicked logout");
        //console.log(authClient);

        //console.log(loggedIn);
        authClient.logout();
        all.loggedIn = false;
        bound = false;
        console.log(all.loggedIn);
    }

    function handleSubmit(event: Event): void {
    	event.preventDefault();

		const form: any = event.target;
		
		if (form == null)
			return ;
		if (form.checkValidity()) {
			//createUser();
			form.reset();
		} else{
			// Display validation errors
			//passwordInput.reportValidity();
            console.log("error form");
			//password2Input.reportValidity();
		}
	}

</script>


<h1>You are inside !</h1>

<h2>Choose your username :</h2>
<form class="container" on:submit|preventDefault={handleSubmit}>
    <div class="input">
        <input type="text" id="username" bind:value={username} placeholder="Username" required minlength="3" maxlength="20">
    </div>
    <button type="submit">Submit</button>
</form>

<Counter />

<button on:click={ logout } id='logoutButton'>Logout</button>