<script lang='ts'>

import { Opt, nat, nat8 } from "azle";
import { token } from "./declarations/token/index.js";

export let principal;

let fee: nat;
let decimals: nat8;
let name: string;
let symbol: string;
let balance: nat;

let init = async () => {
    fee = await token.icrc1_fee();
    decimals = await token.icrc1_decimals();
    name = await token.icrc1_name();
    symbol = await token.icrc1_symbol();
    balance = await token.icrc1_balance_of({ owner: principal, subaccount: Opt.None});


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