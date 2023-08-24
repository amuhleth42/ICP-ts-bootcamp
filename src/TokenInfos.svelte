<script lang='ts'>

import { token } from "./declarations/token/index.js";

let fee: nat;
let decimals;
let name;
let symbol;

let init = async () => {
    fee = await token.icrc1_fee();
    decimals = await token.icrc1_decimals();
    name = await token.icrc1_name();
    symbol = await token.icrc1_symbol();

}

init();

</script>


<div class="cont">
    <h2>Token infos!</h2>
    <div>Name: {name}</div>
    <div>Symbol: {symbol}</div>
    <div>Decimals: {decimals}</div>
    <div>Fee: {fee}</div>
</div>