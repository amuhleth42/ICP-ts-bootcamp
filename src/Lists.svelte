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


<div class="top">
  <h2>Select your Tier List</h2>
  <button on:click={() => { document.location.href = '/create_list'}}>Create list</button>
</div>

{#await init()}
<p>loading...</p>
{:then _} 
  {#if lists.length < 1}
    <p>No list available!</p>
  {:else}
    <div class="cont">
      {#each lists as list}
        <div class="box">
          <button on:click={() => {document.location.href = `/board/${list}`}}>Name: {list}</button>
        </div>
      {/each}
    </div>
  {/if}
{/await}

<style>

.top {
  display: flex;
  gap: 20px;
}

/* .box {
  border: 1px solid white;
  border-radius: 10px;
} */


</style>