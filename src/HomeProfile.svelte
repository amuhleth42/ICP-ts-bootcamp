<script lang='ts'>

import { backend } from "./declarations/backend/index.js";
import { Principal } from "@dfinity/principal";

export let principal: Principal;

let balance: bigint;
let symbol: string;

async function init() {

    Promise.all([
        balance = await backend.getBalance(principal),
        symbol = await backend.icrc1_symbol()
    ]);
    
}

</script>

{#await init()}
   <p>loading...</p> 
{:then _} 
    <div class="cont">
        <h2>Profile</h2>
        <p>{balance} {symbol}</p>


    </div>
{/await}