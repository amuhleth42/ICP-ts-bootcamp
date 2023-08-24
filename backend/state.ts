import { State } from './types';
import { Opt } from 'azle';

export let state: State = {
    accounts: {},
    decimals: 8,
    fee: 1n,
    metadata: [],
    minting_account: Opt.None,
    name: 'OnlyBeuteu',
    permitted_drift_nanos: 60_000_000_000n,
    supported_standards: [
        { name: "ICRC-1", url: "https://github.com/dfinity/ICRC-1" }
    ],
    symbol: 'GBZ',
    total_supply: 0n,
    transactions: [],
    transaction_window_nanos: 24n * 60n * 60n * 1_000_000_000n
};