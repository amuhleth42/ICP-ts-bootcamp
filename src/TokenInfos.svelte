<script lang='ts'>

import { backend } from "./declarations/backend/index.js";
import { Principal } from "@dfinity/principal";
//import { Subaccount } from './types'

export let principal: Principal;

let fee;
let decimals;
let name: string;
let symbol: string;
let balance;

let init = async () => {

    console.log("principal", principal);
    fee = await backend.icrc1_fee();
    decimals = await backend.icrc1_decimals();
    name = await backend.icrc1_name();
    symbol = await backend.icrc1_symbol();
    console.log(principal);
    balance = await backend.getBalance(principal);


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
</div>