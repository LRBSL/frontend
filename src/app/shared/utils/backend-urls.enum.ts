export enum BackendURLS {
    user_rlr_register = "/api/user/auth/register/rlr/",
    user_notary_register = "/api/user/auth/register/notary/",
    user_surveyor_register = "/api/user/auth/register/surveyor/",
    user_login = "/api/user/auth/login/",

    user_getinfo_rlr = "/api/user/info/rlr/get/",

    land_owner_verification = "/api/land/owner-verification/",
    land_get_history = "/api/land/get-land-history/",
    land_buyer_verification = "/api/land/buyer-verification/",
    land_change_notary_vote = "/api/land/change-notary-vote/",

    user_login_backend = "/api/user/auth/login-backend",
    user_login_blockchain_identity_name = "/api/user/auth/login-blockchain-identity-name",
    user_login_blockchain_identity_org = "/api/user/auth/login-blockchain-identity-org",
    user_login_blockchain = "/api/user/auth/login-blockchain",
    user_register = "/api/user/auth/register",
    user_get_by_nic = "/api/user/auth//get-by-nic",

    notary_register = "/api/user/auth/register-notary",

    blockchain_query_land = "/api/blockchain/query-land",
    blockchain_query_all_lands = "/api/blockchain/query-all-lands",
    blockchain_get_history_for_land = "/api/blockchain/get-history-for-land",

    land_get_id_by_key_nic = "/api/land/get-id-by-key-nic",
    land_get_deed = "/api/land/get-deed",

    blockchain_get_test = "/api/user/auth/test",
}
