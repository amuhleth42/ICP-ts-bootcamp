import { $query, Principal, int, Opt, blob, nat, $update, ic } from "azle";
import { Account, Subaccount, TransferArgs, TransferResult } from "./types";
import { icrc1_balance_of, icrc1_transfer, icrc_transfer_from } from "./api";
import { state } from "./state";
import { handle_mint } from "./transfer/mint";
import { setUserBalance } from './user_db';

export function getAccount(owner: Principal, sub: Opt<blob>): Account {
    return {
        owner: owner,
        subaccount: sub
    }
}

$query
export function getBalance(owner: Principal): nat {

    //console.log('getBalance 1');
    return icrc1_balance_of(getAccount(owner, Opt.None));
}

$update
export function transfer(amount: bigint, from: Principal, to: Principal): boolean {

    // const args: TransferArgs = {
    //     amount: amount,
    //     created_at_time: {
    //         Some: ic.time()
    //     },
    //     fee: Opt.Some(state.fee),
    //     from_subaccount: Opt.None,
    //     memo: Opt.None,
    //     to: getAccount(to, Opt.None)
    // }
    let res = icrc_transfer_from(amount, getAccount(from, Opt.None), to);
    let resOk = res.Ok;
    if (resOk === undefined)
        return true;

    setUserBalance(to);
    setUserBalance(from);
    return false;
}

// $update
// export function transfer_from(amount: bigint, from: Account, to: Principal): boolean {

//     const args: TransferArgs = {
//         amount: amount,
//         created_at_time: {
//             Some: ic.time()
//         },
//         fee: Opt.Some(state.fee),
//         from_subaccount: Opt.None,
//         memo: Opt.None,
//         to: getAccount(to, Opt.None)
//     }
//     console.log('transfer from');
//     let res = icrc_transfer_from(from, args);
//     console.log(res);
//     let resOk = res.Ok;
//     if (resOk === undefined) {
//         console.log(res.Err);
//         return true;
//     }
//     console.log('transfer from success')
//     return false;
// }

$update
export function mint(amount: bigint, to: Principal): boolean {

    console.log('mint function');
    let minter = state.minting_account.Some;
    if (minter === undefined) {
        console.log('mint account none');
        return true;
    }
    let res = icrc_transfer_from(amount, minter, to);
    console.log(res);
    let resOk = res.Ok;
    if (resOk === undefined) {
        return true;
    }
    console.log("tu passes pas par la bro?");
    setUserBalance(to);
    return false;
}

$update
export function burn(amount: bigint): boolean {
    
    console.log('mint function');
    let minter = state.minting_account.Some;
    if (minter === undefined) {
        console.log('mint account none');
        return true;
    }

    console.log("icrc transfer from1");
    const args: TransferArgs = {
        amount: amount,
        created_at_time: {
            Some: ic.time()
        },
        fee: Opt.None,
        from_subaccount: Opt.None,
        memo: Opt.None,
        to: minter
    };

    let res = icrc1_transfer(args);
    console.log(res);
    let resOk = res.Ok;
    if (resOk === undefined) {
        return true;
    }
    return false;
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