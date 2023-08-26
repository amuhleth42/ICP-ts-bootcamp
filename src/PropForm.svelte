<script lang='ts'>

  import { all } from "./global";

export let propName = '';
export let url = '';

</script>


<div class="box">
    <p>Elem: </p>
    <div class="input">
        <input type="text" id="name" bind:value={propName} placeholder="Element name" required minlength="3" maxlength="20">
    </div>
    <div class="input">
        <input type="text" id="url" bind:value={url} placeholder="Url" required minlength="3" maxlength="20">
    </div>
</div>

<style>

.box {
    border: 1px solid white;

}

</style>