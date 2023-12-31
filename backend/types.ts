import { 
    blob,
    int,
    nat,
    nat8,
    nat64,
    Opt,
    Principal,
    Variant,
    Record,
    Vec,
    Tuple
} from 'azle';

export type Subaccount = blob;

export type Account = Record<{
    owner: Principal;
    subaccount: Opt<Subaccount>;
}>;

export type InitialAccountBalance = Record<{
    account: Account;
    balance: nat;
}>;

export type OwnerKey = string;

export type SubaccountKey = string;

export type SupportedStandard = Record<{
    name: string;
    url: string;
}>;

export type TransactionKind = Variant<{
    Burn: null;
    Mint: null;
    Transfer: null;
}>;

export type TransferArgs = Record<{
    amount: nat;
    created_at_time: Opt<nat64>;
    fee: Opt<nat>;
    from_subaccount: Opt<Subaccount>;
    memo: Opt<blob>;
    to: Account;
}>;

export type Transaction = Record<{
    args: Opt<TransferArgs>;
    fee: nat;
    from: Opt<Account>;
    kind: TransactionKind;
    timestamp: nat64;
}>;

export type TransferError = Variant<{
    BadBurn: Record<{ min_burn_amount: nat }>;
    BadFee: Record<{ expected_fee: nat }>;
    CreatedInFuture: Record<{ ledger_time: nat64 }>;
    Duplicate: Record<{ duplicate_of: nat }>;
    GenericError: Record<{ error_code: nat; message: string }>;
    InsufficientFunds: Record<{ balance: nat }>;
    TemporarilyUnavailable: null;
    TooOld: null;
}>;

export type TransferResult = Variant<{
    Ok: nat;
    Err: TransferError;
}>;

export type ValidateTransferResult = Variant<{
    ok: boolean;
    err: TransferError;
}>;

export type Value = Variant<{
    Blob: blob;
    Int: int;
    Nat: nat;
    Text: string;
}>;

export type Metadatum = Tuple<[string, Value]>;

export type InitArgs = Record<{
    decimals: nat8;
    fee: nat;
    initial_account_balances: Vec<InitialAccountBalance>;
    metadata: Vec<Metadatum>;
    minting_account: Opt<Account>;
    name: string;
    symbol: string;
    permitted_drift_nanos: Opt<nat64>;
    transaction_window_nanos: Opt<nat64>;
    supported_standards: Vec<SupportedStandard>;
}>;


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
    permitted_drift_nanos: nat64;
    supported_standards: SupportedStandard[];
    symbol: string;
    total_supply: nat;
    transactions: Transaction[];
    transaction_window_nanos: nat64;
};