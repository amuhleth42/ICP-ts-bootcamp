import { blob, Record, Principal, Opt } from 'azle';

type Subaccount = blob;
type Account = Record<{ owner: Principal; subaccount: Opt<Subaccount> }>;