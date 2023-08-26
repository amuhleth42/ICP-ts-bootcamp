<script lang='ts'>

import { Principal } from "@dfinity/principal";
import { backend } from "./declarations/backend";
import { AuthClient } from "@dfinity/auth-client";
import { all } from "./global";

export let authClient: AuthClient;


let principal: Principal;
principal = authClient.getIdentity().getPrincipal();

let user;
let username = '';

async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const form: any = event.target;
    
    if (form == null)
        return ;
    if (form.checkValidity()) {
        user = await backend.createUser(principal, username);
        console.log("createUser done!");
        form.reset();
        document.location.href = '/lists';
    } else{
        // Display validation errors
        //passwordInput.reportValidity();
        console.log("error form");
        //password2Input.reportValidity();
    }
}



</script>


<div class="signup">
    <h2>Choose your username :</h2>
    <form class="container" on:submit|preventDefault={handleSubmit}>
        <div class="input">
            <input type="text" id="username" bind:value={username} placeholder="Username" required minlength="3" maxlength="20">
        </div>
        <button type="submit">Submit</button>
    </form>
</div>