import { State, Account } from './types';
import { Opt, Principal } from 'azle';

function getMintingAccount(): Account {
    let principal = Principal.fromText('27olm-cl2ri-ft5qk-nkhnr-v626z-alnla-dvqfz-mufg4-izbql-l72ky-bae');
    return {
        owner: principal,
        subaccount: Opt.None
    }
}

export let state: State = {
    accounts: {},
    decimals: 8,
    fee: 1n,
    metadata: [],
    minting_account: Opt.Some(getMintingAccount()),
    //minting_account: { owner: 'abcd-abcd-abcd'}
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