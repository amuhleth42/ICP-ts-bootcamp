<script lang='ts'>

  import { all } from "./global";
  import PropForm from "./PropForm.svelte";

  let listName: '';
  let vec: FrontProp[] = new Array(0);
  
  for (let i = 0 ; i < 5 ; i++) {
    vec.push({
        name: '',
        img_url: ''
    });
  }
  console.log('init', vec);

  type FrontProp = {
    name: string,
    img_url: string
  }

  let addOne = () => {
    console.log('add one!');
    console.log(vec);
    vec.push({
        name: '',
        img_url: ''
    });
    vec = [...vec];
  }

  async function handleSubmit(event: Event): Promise<void> {

    event.preventDefault();
    console.log("handle submit");

    console.log(vec);
    document.location.href = `/board/${listName}`;
  }


</script>



    <div class="cont">
        <h1>Create list page</h1>
        <form on:submit|preventDefault={handleSubmit}>
            <div class="input">
                <input type="text" id="name" bind:value={listName} placeholder="List name" required minlength="3" maxlength="20">
            </div>
            {#each vec as elem}
                <!-- <p>{elem.name}</p> -->
                <PropForm bind:propName={elem.name} bind:url={elem.img_url}/>
        
            {/each}
            <button type='button' on:click={addOne}>One more</button>
            <button type='submit'>Submit</button>
        </form>
    </div>


<style>

.cont {
    display: flex;
    flex-direction: column;
}

</style>