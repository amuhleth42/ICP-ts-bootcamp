import { Record, nat64, Vec, blob, Opt } from 'azle';
import { Principal } from "@dfinity/principal";

export type User = Record<{
    id: Principal;
    createdAt: nat64;
    recordingIds: Vec<Principal>;
    username: string;
}>;

export type Subaccount = blob;

export type Account = Record<{
    owner: Principal;
    subaccount: Opt<Subaccount>;
}>;