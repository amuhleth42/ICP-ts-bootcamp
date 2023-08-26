<script lang='ts'>

import { Principal } from "@dfinity/principal";
import type { PropType } from "./types";

export let prop: PropType;


</script>

<div class="box">
    <img class='img' src={prop.img_url} alt={prop.name}>
    <p>{prop.name}</p>
</div>

<style>

.img {
}

.box {
    border: 1px solid white;
    color: white;
    width: 100px;
    max-height: 200px;
}

</style>