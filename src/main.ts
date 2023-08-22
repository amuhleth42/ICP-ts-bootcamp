import App from "./App.svelte"
import './index.scss';
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent"

const app = new App({
  target: document.getElementById("root"),
})




export default app
