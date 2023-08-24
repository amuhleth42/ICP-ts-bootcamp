import { $query, Principal, int, Opt, blob, nat } from "azle";
import { Account } from "./types";
import { icrc1_balance_of } from "./api";

function getAccount(owner: Principal, sub: Opt<blob>): Account {
    return {
        owner: owner,
        subaccount: sub
    }
}

$query
export function getBalance(owner: Principal): nat {

    console.log('getBalance 1');

    return icrc1_balance_of(getAccount(owner, Opt.None));
}


// $query
// export function getBalance(owner: Principal, sub: string): nat {

//     let subaccount: Opt<blob>;
//     Uint8Array.from(sub);

//     if (sub == 'null')
//         subaccount = Opt.None;
//     else
//         subaccount = Opt.None;
//         //subaccount = Opt.Some(utf8EncodeText.encode(sub));

//     return icrc1_balance_of(getAccount(owner, subaccount));

// }