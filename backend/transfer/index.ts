import { ic, $update, Opt, Principal } from 'azle';
import { handle_burn } from '../transfer/burn';
import { handle_mint, is_minting_account } from '../transfer/mint';
import { handle_transfer } from '../transfer/transfer';
import { validate_transfer } from '../transfer/validate';
import {
    Account,
    TransferArgs,
    TransferResult
} from '../types';
import { state } from '../state';
import { getAccount } from '../account2';

$update
export function icrc1_transfer(args: TransferArgs): TransferResult {
    const from: Account = {
        owner: ic.caller(),
        subaccount: args.from_subaccount
    };

    console.log("icrc1_transfer: caller", from);

    const validate_transfer_result = validate_transfer(args, from);

    let isErr = validate_transfer_result.err;

    if (isErr !== undefined) {
        return {
            Err: isErr
        }
    }

    // if ('err' in validate_transfer_result) {
    //     return {
    //         Err: validate_transfer_result.err
    //     };
    // }

    const from_is_minting_account = is_minting_account(from.owner);
    const to_is_minting_account = is_minting_account(args.to.owner);

    if (from_is_minting_account === true) {
        return handle_mint(args, Opt.Some(from));
    }
    if (to_is_minting_account === true) {
        return handle_burn(args, from);
    }

    return handle_transfer(args, from);
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

//$update
export function icrc_transfer_from(amount: bigint, from: Account, to: Principal): TransferResult {

    console.log("icrc transfer from1");
    const args: TransferArgs = {
        amount: amount,
        created_at_time: {
            Some: ic.time()
        },
        fee: Opt.None,
        from_subaccount: Opt.None,
        memo: Opt.None,
        to: getAccount(to, Opt.None)
    };


    console.log("icrc transfer from 2");



    const validate_transfer_result = validate_transfer(args, from);

    let isErr = validate_transfer_result.err;

    if (isErr !== undefined) {
        return {
            Err: isErr
        }
    }

    // if ('err' in validate_transfer_result) {
    //     return {
    //         Err: validate_transfer_result.err
    //     };
    // }

    console.log("icrc transfer from");
    const from_is_minting_account = is_minting_account(from.owner);
    const to_is_minting_account = is_minting_account(args.to.owner);

    if (from_is_minting_account === true) {
        return handle_mint(args, Opt.Some(from));
    }
    if (to_is_minting_account === true) {
        return handle_burn(args, from);
    }

    return handle_transfer(args, from);
}