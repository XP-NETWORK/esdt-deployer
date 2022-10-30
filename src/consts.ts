import { config } from 'dotenv'; config();
import { env } from 'process';

// The mapping type where key & value are strings
export type StringMapping = { [key: string]: string };

// Chain to be used (local, devnet, testnet, mainnet)
export type NETWORK = 'local' | 'devnet' | 'testnet' | 'mainnet';

// Default id 'devnet'
export const chain = env.NETWORK! ? env.NETWORK! : 'devnet';

// Default will be devnet, based on chain value, 
// if the local is chosen you can change the proxy host
export const publicApi: StringMapping = {
    local: 'http://localhost:7950',
    testnet: 'https://testnet-api.elrond.com',
    devnet: 'https://devnet-api.elrond.com',
    mainnet: 'https://api.elrond.com',
};

export const shortChainId: StringMapping = {
    testnet: 'T',
    devnet: 'D',
    mainnet: '1',
};

export const elrondExplorer: StringMapping = {
    devnet: 'https://devnet-explorer.elrond.com',
    testnet: 'https://testnet-explorer.elrond.com',
    mainnet: 'https://explorer.elrond.com',
};

export type ESDTTypes = 'FT' | 'NFT' | 'SFT';

export const esdtTokenProperties = [
    'canFreeze', // the token manager may freeze the token balance in a specific account, preventing transfers to and from that account
    'canWipe', // the token manager may wipe out the tokens held by a frozen account, reducing the supply
    'canPause', // the token manager may prevent all transactions of the token, apart from minting and burning
    'canMint', // more units of this token can be minted by the token manager after initial issuance, increasing the supply
    'canBurn', // users may "burn" some of their tokens, reducing the supply
    'canChangeOwner', // token management can be transferred to a different account
    'canUpgrade', // the token manager may change these properties
    'canAddSpecialRoles', // the token manager can assign a specific role(s)
];

export const sftTokenProperties = [
    'canFreeze',
    'canWipe',
    'canPause',
    'canTransferNFTCreateRole',
    'canChangeOwner',
    'canUpgrade',
    'canAddSpecialRoles',
];

// SPECIAL ROLES:

export enum esdtTokenSpecialRoles {
    ESDTRoleLocalBurn = 'ESDTRoleLocalBurn',
    ESDTRoleLocalMint = 'ESDTRoleLocalMint'
}

export enum nftTokenSpecialRoles {
    ESDTRoleNFTCreate = 'ESDTRoleNFTCreate', // allows one to create a new NFT
    ESDTRoleNFTBurn = 'ESDTRoleNFTBurn', //allows one to burn quantity of a specific NFT
    ESDTTransferRole = 'ESDTTransferRole',//this role enables transfer only to specified addresses in the same shard
    ESDTRoleNFTAddURI = 'ESDTRoleNFTAddURI', //allows one add URIs for a specific NFT
    ESDTRoleNFTUpdateAttributes = 'ESDTRoleNFTUpdateAttributes', // allows one to change the attributes of a specific NFT
}

export enum sftTokenSpecialRoles {
    ESDTRoleNFTCreate = 'ESDTRoleNFTCreate', // allows one to create a new SFT
    ESDTRoleNFTBurn = 'ESDTRoleNFTBurn', //allows one to burn quantity of a specific SFT
    ESDTRoleNFTAddQuantity = 'ESDTRoleNFTAddQuantity', // allows one to add quantity of a specific SFT
    ESDTTransferRole = 'ESDTTransferRole',//this role enables transfer only to specified addresses in the same shard
}

// Comment out the unrequired roles
export const ftSpecialRoles = [
    esdtTokenSpecialRoles.ESDTRoleLocalBurn,
    esdtTokenSpecialRoles.ESDTRoleLocalMint
]

export const nftSpecialRoles = [
    nftTokenSpecialRoles.ESDTRoleNFTCreate,
    nftTokenSpecialRoles.ESDTRoleNFTBurn,
    nftTokenSpecialRoles.ESDTTransferRole,
    nftTokenSpecialRoles.ESDTRoleNFTUpdateAttributes
];

export const sftSpecialRoles = [
    sftTokenSpecialRoles.ESDTRoleNFTAddQuantity,
    sftTokenSpecialRoles.ESDTRoleNFTBurn,
    sftTokenSpecialRoles.ESDTRoleNFTCreate,
    sftTokenSpecialRoles.ESDTTransferRole
]
    

export declare type ALL_PROPERTIES = typeof esdtTokenProperties
    | typeof nftTokenSpecialRoles
    | typeof sftTokenProperties;

export declare type ALL_SPECIAL_PROPERTIES = typeof esdtTokenSpecialRoles
    | typeof nftTokenSpecialRoles
    | typeof sftTokenSpecialRoles

// Build in address for tokens operations
export const builtInSC =
    'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u';

// Predefined one time payment for token issuance (EGLD amount)
export const issueTokenPayment = '0.05';

export const commonOpertationsGasLimit = 60_000_000;
export const commonBuiltInOpertationsGasLimit = 6_000_000;
export const specialOpertationsGasLimit = 3_000_00;

export enum issueESDTTypes {
    fungible = 'issue',
    NFT = 'issueNonFungible',
    SFT = 'issueSemiFungible'
}

// XP.NETWORK Exclusive
export enum BridgeAddress {
    devnet = "erd1qqqqqqqqqqqqqpgqy2nx5z4cpr90de4sga2v2yx62fph3lg8g6vskt0k2f",
    mainnet = "erd1qqqqqqqqqqqqqpgq3y98dyjdp72lwzvd35yt4f9ua2a3n70v0drsfycvu8"
}

