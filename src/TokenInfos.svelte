<script lang='ts'>

import { backend } from "./declarations/backend/index.js";
import { Principal } from "@dfinity/principal";
//import { Subaccount } from './types'

export let principal: Principal;

let fee;
let decimals;
let name: string;
let symbol: string;
let balance: bigint;

async function mint100() {
    console.log('mint100');
    let res = await backend.mint(100n, principal);
    balance = await backend.getBalance(principal);
    if (res === true)
        console.log('mint100 failed');
    else
        console.log('mint100 success');
}

async function burn50() {
    console.log('burn50');
    let res = await backend.burn(50n);
    balance = await backend.getBalance(principal);
    if (res === true)
        console.log('burn50 failed');
    else
        console.log('burn50 success');
}

let init = async () => {

    console.log("principal", principal);
    console.log("principal to text", principal.toText());
    fee = await backend.icrc1_fee();
    decimals = await backend.icrc1_decimals();
    name = await backend.icrc1_name();
    symbol = await backend.icrc1_symbol();
    console.log(principal);
    balance = await backend.getBalance(principal);

    //backend.icrc1_transfer


}

init();

</script>


<div class="cont">
    <h2>Token infos!</h2>
    <div>Name: {name}</div>
    <div>Symbol: {symbol}</div>
    <div>Decimals: {decimals}</div>
    <div>Fee: {fee}</div>
    <div>Your balance: {balance}</div>
    <button on:click={ mint100 }>Mint 100 GBZ</button>
    <button on:click={ burn50 }>Burn 50 GBZ</button>
</div>