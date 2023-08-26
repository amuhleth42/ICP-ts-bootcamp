<script lang='ts'>

import { Principal } from "@dfinity/principal";


export let principal: Principal;


</script>

<div class="cont">
    <h2>Prop name</h2>
    <form action="">
        <input type="radio" id="s" name="fav_language" value="HTML">
        <label for="s">S</label>
        <input type="radio" id="a" name="fav_language" value="HTML">
        <label for="a">A</label>
        <input type="radio" id="b" name="fav_language" value="HTML">
        <label for="b">B</label>
        <input type="radio" id="c" name="fav_language" value="HTML">
        <label for="c">C</label>
        <input type="radio" id="d" name="fav_language" value="HTML">
        <label for="d">D</label>
        <button>Vote!</button>
    </form>
</div>