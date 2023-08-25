import { Record, Opt, blob, nat, nat64, Variant, text } from 'azle';
import { Account } from './types';



//icrc2_approve : (ApproveArgs) -> (variant { Ok : nat; Err : ApproveError });

type ApproveArgs = Record<{
    from_subaccount : Opt<blob>;
    spender : Account;
    amount : nat;
    expected_allowance : Opt<nat>;
    expires_at : Opt<nat64>;
    fee : Opt<nat>;
    memo : Opt<blob>;
    created_at_time : Opt<nat64>;
}>;

type ApproveError = Variant<{
    BadFee : Record<{ expected_fee : nat }>;
    // The caller does not have enough funds to pay the approval fee.
    InsufficientFunds : Record<{ balance : nat }>;
    // The caller specified the [expected_allowance] field, and the current
    // allowance did not match the given value.
    AllowanceChanged : Record<{ current_allowance : nat }>;
    // The approval request expired before the ledger had a chance to apply it.
    Expired : Record<{ ledger_time : nat64; }>;
    TooOld: null;
    CreatedInFuture: Record<{ ledger_time : nat64 }>;
    Duplicate : Record<{ duplicate_of : nat }>;
    TemporarilyUnavailable: null;
    GenericError : Record<{ error_code : nat; message : text }>;
}>;

