<script lang='ts'>

  import { Router, Route, Link } from "svelte-routing";
  import Home from "./Home.svelte";
  import Login from './Login.svelte';
  import Signup from './Signup.svelte';
  import { AuthClient } from "@dfinity/auth-client";
  import { props } from "../backend/tierList";
  import Lists from "./Lists.svelte";
  import CreateList from "./CreateList.svelte";

  export let authClient: AuthClient;

</script>

<Router>
    <Route path='/'>
        <Login {authClient}/>
    </Route>
    <Route path='/home' component={Home}></Route>
    <Route path='/signup'>
        <Signup {authClient}/>
    </Route>
    <Route path='/lists'>
        <Lists />
    </Route>
    <Route path='/create_list'>
        <CreateList />
    </Route>



</Router>