<script lang='ts'>
  import { getBalance } from "../backend";
  import { backend } from "./declarations/backend";


  let users;

  async function getAll() {
    users = await backend.readUsers();
    console.log("get all");

  }


</script>

{#await getAll()}
    <p>loading...</p>
{:then _} 
    <div class="cont">
        {#each users as user}
            <div class="user">
                <p>Username: {user.username}</p>
                <p>Balance(user db): {user.balance}</p>
                <!--<p>Balance(token db): {}</p>-->
            </div>
        {/each}
    </div>
    
{/await}

<style>

    .user {
        border: 1px solid black;
    }

</style>