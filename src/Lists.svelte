<script lang='ts'>

  import { Principal } from "azle";
  import { backend } from "./declarations/backend";
  import { Route, Router, Link } from 'svelte-routing';
  import CreateList from "./CreateList.svelte";

  let lists: string[];

  async function init() {
    lists = await backend.readProps();
  }

</script>


<h2>Select your Tier List</h2>
<button on:click={() => { document.location.href = '/create_list'}}>Create list</button>

{#await init()}
<p>loading...</p>
{:then _} 
  {#if lists.length < 1}
    <p>No list available!</p>
  {:else}
    {#each lists as list}
      <div class="box">
        <p>Name: {list}</p>
      </div>
    {/each}
  {/if}
{/await}