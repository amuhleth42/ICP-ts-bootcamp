import { balance_of, set_account_balance } from '../account';
import { ic, Opt } from 'azle';
import { state } from '../state';
import {
    Account,
    Transaction,
    TransactionKind,
    TransferArgs,
    TransferResult
} from '../types';

export function handle_transfer(args: TransferArgs, from: Account): TransferResult {
    const kind: TransactionKind = {
        Transfer: null
    };

    //const fee = args.fee ?? state.fee;
    let fee = args.fee.Some;
    if (fee === undefined)
        fee = state.fee;

    set_account_balance(from, balance_of(from) - args.amount - fee);
    set_account_balance(args.to, balance_of(args.to) + args.amount);

    let minter = state.minting_account.Some;
    if (minter !== undefined) {
        set_account_balance(
            minter,
            balance_of(minter) + fee
        );
    }

    state.total_supply -= fee;

    const transaction: Transaction = {
        args: {
            Some: args
        },
        fee,
        from: {
            Some: from
        },
        kind,
        timestamp: ic.time()
    };

    state.transactions.push(transaction);

    const transfer_result: TransferResult = {
        Ok: args.amount
    };

    return transfer_result;
}