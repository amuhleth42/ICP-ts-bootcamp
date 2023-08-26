import { Record, nat64, Vec, blob, Opt } from 'azle';
import { Principal } from "@dfinity/principal";

export type User = {
    id: Principal;
    createdAt: nat64;
    recordingIds: Vec<Principal>;
    username: string;
};

export type Subaccount = blob;

export type Account = {
    owner: Principal;
    subaccount: Opt<Subaccount>;
};

export type VoteType = {
    owner: Principal,
    rating: number
}

export type PropType = {
    name: string,
    img_url: string,
    voters: VoteType[]
}

export type List = {
    elems: PropType[],
    owner: Principal,
    name: string,
    tag: string
};