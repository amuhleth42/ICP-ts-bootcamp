import { balance_of } from '../account';
import { blob, ic, nat, nat64, Opt, Principal } from 'azle';
import { state } from '../state';
import { is_minting_account } from '../transfer/mint';
import {
    Account,
    Subaccount,
    TransferArgs,
    ValidateTransferResult
} from '../types';

export function validate_transfer(
    args: TransferArgs,
    from: Account
): ValidateTransferResult {

    const from_is_anonymous = is_anonymous(from.owner);

    console.log('validate_transfer');

    if (from_is_anonymous === true) {
        console.log('anonymous');
        return {
            err: {
                GenericError: {
                    error_code: 0n,
                    message: 'anonymous user is not allowed to transfer funds'
                }
            }
        };
    }

    const from_subaccount_is_valid = is_subaccount_valid(args.from_subaccount);

    if (from_subaccount_is_valid === false) {
        console.log('sub invalid');
        return {
            err: {
                GenericError: {
                    error_code: 0n,
                    message: 'from_subaccount must be 32 bytes in length'
                }
            }
        };
    }

    const to_subaccount_is_valid = is_subaccount_valid(args.to.subaccount);

    if (to_subaccount_is_valid === false) {
        console.log('sub invalid');
        return {
            err: {
                GenericError: {
                    error_code: 0n,
                    message: 'to.subaccount must be 32 bytes in length'
                }
            }
        };
    }

    const memo_is_valid = is_memo_valid(args.memo);

    if (memo_is_valid === false) {
        console.log('memo invalid');
        return {
            err: {
                GenericError: {
                    error_code: 0n,
                    message: 'memo must be a maximum of 32 bytes in length'
                }
            }
        };
    }

    const created_at_time_is_in_future = is_created_at_time_in_future(
        args.created_at_time
    );

    if (created_at_time_is_in_future === true) {
        console.log('future');
        return {
            err: {
                CreatedInFuture: {
                    ledger_time: ic.time()
                }
            }
        };
    }

    const created_at_time_too_old = is_created_at_time_too_old(
        args.created_at_time
    );

    if (created_at_time_too_old === true) {
        console.log('too old');
        return {
            err: {
                TooOld: null
            }
        };
    }

    const duplicate_transaction_index = find_duplicate_transaction_index(args, from);
    let dti = duplicate_transaction_index.Some;

    if (dti !== undefined) {
        console.log('duplicate');
        return {
            err: {
                Duplicate: {
                    duplicate_of: dti
                }
            }
        };
    }

    const from_is_minting_account = is_minting_account(from.owner);

    let argsFee = args.fee.Some;
    if (from_is_minting_account === true && argsFee !== undefined && argsFee !== 0n) {
        console.log('badfee');
        return {
            err: {
                BadFee: {
                    expected_fee: 0n
                }
            }
        };
    }

    const to_is_minting_account = is_minting_account(args.to.owner);

    if (to_is_minting_account === true) {
        if (argsFee !== undefined && argsFee !== 0n) {
            console.log('badfee');
            return {
                err: {
                    BadFee: {
                        expected_fee: 0n
                    }
                }
            };
        }

        if (args.amount < state.fee) {
            console.log('badburn');
            return {
                err: {
                    BadBurn: {
                        min_burn_amount: state.fee
                    }
                }
            };
        }
    }

    if (!from_is_minting_account && !to_is_minting_account) {

        let actualFee = args.fee.Some;
        if (actualFee === undefined)
            actualFee = state.fee;
        if (actualFee !== state.fee) {
            console.log('badfee');
            return {
                err: {
                    BadFee: {
                        expected_fee: state.fee
                    }
                }
            };
        }
    }

    const from_balance = balance_of(from);

    if (
        from_is_minting_account === false &&
        from_balance < args.amount + state.fee
    ) {
        console.log('insufficient funds');
        return {
            err: {
                InsufficientFunds: {
                    balance: from_balance
                }
            }
        };
    }

    return {
        ok: true
    };
}

function is_anonymous(principal: Principal): boolean {
    return principal.toText() === '2vxsx-fae';
}

export function is_subaccount_valid(subaccount: Opt<Subaccount>): boolean {
    let subValue = subaccount.Some;

    if (subValue === undefined)
        return true;
    return subValue.length <= 4;
}


function is_memo_valid(memo: Opt<blob>): boolean {
    let memoValue = memo.Some;

    if (memoValue === undefined)
        return true;
    return memoValue.length <= 4;
}

function is_created_at_time_in_future(created_at_time: Opt<nat64>): boolean {
    const now = ic.time();
    let tx_time = created_at_time.Some;
    if (tx_time === undefined)
        tx_time = now;

    if (tx_time > now && tx_time - now > state.permitted_drift_nanos) {
        return true;
    } else {
        return false;
    }
}

function is_created_at_time_too_old(created_at_time: Opt<nat64>): boolean {
    const now = ic.time();
    let tx_time = created_at_time.Some;
    if (tx_time === undefined)
        tx_time = now;
    if (
        tx_time < now &&
        now - tx_time > state.transaction_window_nanos + state.permitted_drift_nanos
    ) {
        return true;
    } else {
        return false;
    }
}

function find_duplicate_transaction_index(
    transfer_args: TransferArgs,
    from: Account
): Opt<nat> {
    const now = ic.time();

    for (let i = 0; i < state.transactions.length; i++) {
        const transaction = state.transactions[i];

        if (
            stringify({
                ...transfer_args,
                from
            }) === stringify({
                ...transaction.args,
                from: transaction.from
            }) &&
            transaction.timestamp < now + state.permitted_drift_nanos &&
            now - transaction.timestamp <
                state.transaction_window_nanos + state.permitted_drift_nanos
        ) {
            return Opt.Some(BigInt(i));
        }
    }

    return Opt.None;
}

export function stringify(value: any): string {
    return JSON.stringify(value, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
    );
}