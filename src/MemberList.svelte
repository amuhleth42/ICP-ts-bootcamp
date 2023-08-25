<script lang='ts'>
  import { Principal } from "@dfinity/principal";
  import { getBalance } from "../backend";
  import { backend } from "./declarations/backend";


  export let principal: Principal
  let users;

  async function getAll() {
    users = await backend.readUsers();
    console.log("get all");

  }

  async function send10 (to: Principal){
    console.log("send10");
    let res = await backend.transfer(10n, principal, to);
    
    if (res)
        console.log("send10 failed");
    else
        console.log("send10 success");
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
                <p>id: {user.id.toString()}</p>
                <button on:click={ async (e) => { await send10(user.id); } }>Give 10 GBZ</button>
            </div>
        {/each}
    </div>
    
{/await}

<style>

    .user {
        border: 1px solid black;
    }

</style>