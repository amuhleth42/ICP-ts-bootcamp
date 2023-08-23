import { blob, int, nat, nat8, nat64, Opt, Principal, Variant } from 'azle';

export type Subaccount = blob;

export type Account = {
    owner: Principal;
    subaccount: Opt<Subaccount>;
};

export type InitialAccountBalance = {
    account: Account;
    balance: nat;
};

export type OwnerKey = string;

export type SubaccountKey = string;

export type SupportedStandard = {
    name: string;
    url: string;
};

export type TransactionKind = Variant<{
    Burn: null;
    Mint: null;
    Transfer: null;
}>;

export type TransferArgs = {
    amount: nat;
    created_at_time: Opt<nat64>;
    fee: Opt<nat>;
    from_subaccount: Opt<Subaccount>;
    memo: Opt<blob>;
    to: Account;
};

export type Transaction = {
    args: Opt<TransferArgs>;
    fee: nat;
    from: Opt<Account>;
    kind: TransactionKind;
    timestamp: nat64;
};

export type TransferError = Variant<{
    BadBurn: { min_burn_amount: nat };
    BadFee: { expected_fee: nat };
    CreatedInFuture: { ledger_time: nat64 };
    Duplicate: { duplicate_of: nat };
    GenericError: { error_code: nat; message: string };
    InsufficientFunds: { balance: nat };
    TemporarilyUnavailable: null;
    TooOld: null;
}>;

export type TransferResult = Variant<{
    Ok: nat;
    Err: TransferError;
}>;

export type Value = Variant<{
    Blob: blob;
    Int: int;
    Nat: nat;
    Text: string;
}>;

export type Metadatum = [string, Value];

export type InitArgs = {
    decimals: nat8;
    fee: nat;
    initial_account_balances: InitialAccountBalance[];
    metadata: Metadatum[];
    minting_account: Opt<Account>;
    name: string;
    symbol: string;
    permitted_drift_nanos: Opt<nat64>;
    transaction_window_nanos: Opt<nat64>;
    supported_standards: SupportedStandard[];
}


export type State = {
    accounts: {
        [key: OwnerKey]: 
        | { 
            [key: SubaccountKey]: nat | undefined;
          }
        | undefined;
    };
    decimals: nat8;
    fee: nat;
    metadata: Metadatum[];
    minting_account: Opt<Account>;
    name: string;
}