# Change the variable to the principal that controls archive canisters.
export ARCHIVE_CONTROLLER=$(dfx identity get-principal)

export NAME="My Token"
export SYMBOL="GBZ"

#dfx deploy --network ${NETWORK} token --argument '(variant { Init = 
dfx deploy token --argument \
'
record {
    decimals = 8 : nat8;
    fee = 0 : nat;
    initial_account_balances = vec {
    };
    metadata = vec {};
    minting_account = opt record {
        owner = principal "jkpmw-aav35-wxvb3-lanyp-62lqw-fmtwc-cvqc3-jcn7p-6jtrt-x7csr-rae";
    };
    name = "TOKEN";
    supported_standards = vec {};
    symbol = "GBZ";
}'

#      record {
#        token_name = "'${TOKEN_NAME}'";
#        token_symbol = "'${TOKEN_SYMBOL}'";
#        minting_account = record { owner = principal "'${MINTER_PRINCIPAL}'";};
#        initial_balances = vec {};
#        metadata = vec {};
        #  transfer_fee = 10;
        #  archive_options = record {
#           trigger_threshold = 2000;
#           num_blocks_to_archive = 1000;
#           controller_id = principal "'${ARCHIVE_CONTROLLER}'";
#         }
# }})'


    # initial_account_balances = vec {
    #     record {
    #         account = record {
    #             owner = principal "jm5gm-r5btc-kor5h-mkrva-sbubi-z2krh-3flug-4xr2v-bnkhf-w23cq-dae";
    #             subaccount = opt vec { 0 : nat8; 0 : nat8; 0 : nat8; 0 : nat8 };
    #         };
    #         balance = 100_000_000_000 : nat;
    #     };
    # };