export declare type StringMapping = {
    [key: string]: string;
};
export declare type NETWORK = 'local' | 'devnet' | 'testnet' | 'mainnet';
export declare const chain: string;
export declare const publicApi: StringMapping;
export declare const shortChainId: StringMapping;
export declare const elrondExplorer: StringMapping;
export declare type ESDTTypes = 'FT' | 'NFT' | 'SFT';
export declare const esdtTokenProperties: string[];
export declare const sftTokenProperties: string[];
export declare enum esdtTokenSpecialRoles {
    ESDTRoleLocalBurn = "ESDTRoleLocalBurn",
    ESDTRoleLocalMint = "ESDTRoleLocalMint"
}
export declare enum nftTokenSpecialRoles {
    ESDTRoleNFTCreate = "ESDTRoleNFTCreate",
    ESDTRoleNFTBurn = "ESDTRoleNFTBurn",
    ESDTTransferRole = "ESDTTransferRole",
    ESDTRoleNFTAddURI = "ESDTRoleNFTAddURI",
    ESDTRoleNFTUpdateAttributes = "ESDTRoleNFTUpdateAttributes"
}
export declare enum sftTokenSpecialRoles {
    ESDTRoleNFTCreate = "ESDTRoleNFTCreate",
    ESDTRoleNFTBurn = "ESDTRoleNFTBurn",
    ESDTRoleNFTAddQuantity = "ESDTRoleNFTAddQuantity",
    ESDTTransferRole = "ESDTTransferRole"
}
export declare type ALL_PROPERTIES = typeof esdtTokenProperties | typeof nftTokenSpecialRoles | typeof sftTokenProperties;
export declare type ALL_SPECIAL_PROPERTIES = typeof esdtTokenSpecialRoles | typeof nftTokenSpecialRoles | typeof sftTokenSpecialRoles;
export declare const builtInSC = "erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u";
export declare const issueTokenPayment = "0.05";
export declare const commonOpertationsGasLimit = 60000000;
export declare const commonBuiltInOpertationsGasLimit = 6000000;
export declare const specialOpertationsGasLimit = 300000;
export declare enum issueESDTTypes {
    fungible = "issue",
    NFT = "issueNonFungible",
    SFT = "issueSemiFungible"
}
export declare enum BridgeAddress {
    devnet = "erd1qqqqqqqqqqqqqpgqy2nx5z4cpr90de4sga2v2yx62fph3lg8g6vskt0k2f",
    mainnet = "erd1qqqqqqqqqqqqqpgq3y98dyjdp72lwzvd35yt4f9ua2a3n70v0drsfycvu8"
}
