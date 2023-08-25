<script lang='ts'>
  import { backend } from "./declarations/backend";


  let users;

  async function getAll() {
    users = await backend.readUsers();

  }


</script>

{#await getAll()}
    <p>loading...</p>
{:then _} 
    <div class="cont">
        {#each users as user}
            <div class="user">
                <p>Username: {user.username}</p>
                <p>Balance: {user.balance}</p>
            </div>
        {/each}
    </div>
    
{/await}

<style>

    .user {
        border: 1px solid black;
    }

</style>