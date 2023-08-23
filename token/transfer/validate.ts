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