export enum BackendURLS {
    user_login_backend = "/api/user/auth/login-backend",
    user_login_blockchain_identity_name = "/api/user/auth/login-blockchain-identity-name",
    user_login_blockchain_identity_org = "/api/user/auth/login-blockchain-identity-org",
    user_login_blockchain = "/api/user/auth/login-blockchain",
    user_register = "/api/user/auth/register",
    
    notary_register = "/api/user/auth/register-notary",

    blockchain_query_land = "/api/blockchain/query-land",
    blockchain_query_all_lands = "/api/blockchain/query-all-lands",
    blockchain_get_history_for_land = "/api/blockchain/get-history-for-land",
}
