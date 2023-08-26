<script lang='ts'>
  import { Principal } from "@dfinity/principal";
  import { getList } from "../backend/tierList";
  import { backend } from "./declarations/backend";

  import type { VoteType, PropType, List } from "./types";
  import Prop from "./Prop.svelte";


export let listName: string;

let list: List;

async function init() {

    let res = await backend.getList(listName);
    if (res.length > 0) {
        list = res[0];
        console.log(list);
    }

}
</script>

{#await init()}
    <p>loading...</p>
{:then _}
    <h2>{listName}</h2>

    <div class="board">
        <div class="row">
            <div class='box s'>
                <p>S</p>
            </div>
        </div>
        <div class="row">
            <div class='box a'>
                <p>A</p>
            </div>
        </div>
        <div class="row">
            <div class='box b'>
                <p>B</p>
            </div>
        </div>
        <div class="row">
            <div class='box c'>
                <p>C</p>
            </div>
        </div>
        <div class="row">
            <div class='box d'>
                <p>D</p>
            </div>
        </div>
        <div class="row">
            <div class='box e'>
                <p></p>
            </div>
            <div class="propCont">
                {#each list.elems as prop}
                    <Prop {prop}/>
                {/each}
            </div>
        </div>
    </div>

{/await}

<style>

.board {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    align-items: stretch;
    width: 80vw;
    height: 50vh;
    border: 1px solid black;
    background-color: rgb(32, 32, 32);
}

.row {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    background-color: #1A1A17;
    border: 1px solid black;
    color: black;

}

.box {
    width: 15%;
    /* padding: 24px 10px; */
    text-align: center;
    justify-self: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: 100%; */
    
}

.s {
    background-color: rgb(255, 127, 127);
}
.a {
    background-color: #FDBF84;
}
.b {
    background-color: #FEDE86;
}
.c {
    background-color: #FFFE87;
}
.d {
    background-color: #C0FD86;
}
.e {
    background-color: #000000;
}

.propCont {
    display: flex;
    gap: 20px;
}



</style>