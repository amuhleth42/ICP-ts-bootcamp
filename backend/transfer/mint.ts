import { balance_of, set_account_balance } from '../account';
import { ic, Opt, Principal } from 'azle';
import { state } from '../state';
import {
    Account,
    Transaction,
    TransferArgs,
    TransferResult
} from '../types';

export function handle_mint(args: TransferArgs, from: Opt<Account>): TransferResult {
    set_account_balance(args.to, balance_of(args.to) + args.amount);
    state.total_supply += args.amount;

    const transaction: Transaction = {
        args: {
            Some: args
        },
        fee: 0n,
        from,
        kind: {
            Mint: null
        },
        timestamp: ic.time()
    };

    console.log("handle mint");
    state.transactions.push(transaction);

    const transfer_result: TransferResult = {
        Ok: args.amount
    };

    console.log("handle mint success");
    return transfer_result;
}

export function is_minting_account(owner: Principal): boolean {
    let minter = state.minting_account.Some;
    if (minter === undefined)
        return false;
    return owner.toText() === minter.owner.toText();
}