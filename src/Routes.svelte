<script lang='ts'>

  import { Router, Route, Link } from "svelte-routing";
  import Home from "./Home.svelte";
  import Login from './Login.svelte';
  import Signup from './Signup.svelte';
  import { AuthClient } from "@dfinity/auth-client";
  import { props } from "../backend/tierList";
  import Lists from "./Lists.svelte";
  import CreateList from "./CreateList.svelte";
  import Board from "./Board.svelte";
  import TokenInfos from "./TokenInfos.svelte";
  import MemberList from "./MemberList.svelte";
  import HomeProfile from "./HomeProfile.svelte";

  export let authClient: AuthClient;
  let principal = authClient.getIdentity().getPrincipal();

</script>

<Router>
    <Route path='/'>
        <Login {authClient}/>
    </Route>
    <Route path='/home'>
        <!-- <TokenInfos principal={authClient.getIdentity().getPrincipal()}/> -->
        <HomeProfile {principal}/>
        <MemberList {principal}/>
        <Board listName={'hey'}/>
    </Route>
    <Route path='/signup'>
        <Signup {authClient}/>
    </Route>
    <Route path='/lists'>
        <Lists />
    </Route>
    <Route path='/create_list'>
        <CreateList {principal}/>
    </Route>
    <Route path='/board/:listName' let:params>
        <Board listName={params.listName}/>
    </Route>



</Router>