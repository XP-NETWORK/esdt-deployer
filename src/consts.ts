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

export const esdtTokenProperties = [
    'canFreeze',
    'canWipe',
    'canPause',
    'canMint',
    'canBurn',
    'canChangeOwner',
    'canUpgrade',
    'canAddSpecialRoles',
] as const;

export const esdtTokenSpecialRoles = [
    'ESDTRoleLocalBurn',
    'ESDTRoleLocalMint'
]as const;

export const sftTokenProperties = [
    'canFreeze',
    'canWipe',
    'canPause',
    'canTransferNFTCreateRole',
    'canChangeOwner',
    'canUpgrade',
    'canAddSpecialRoles',
] as const;

export const sftTokenSpecialRoles = [
    'ESDTRoleNFTCreate',
    'ESDTRoleNFTBurn',
    'ESDTRoleNFTAddQuantity',
    'ESDTTransferRole',
]as const;

export let ALL_PROPS = [
    ...sftTokenProperties,
    ...sftTokenSpecialRoles,
];

export type ALL_PROPERTIES = typeof ALL_PROPS[number]

// Build in address for tokens operations
export const builtInSC =
    'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u';

// Predefined one time payment for token issuance (EGLD amount)
export const issueTokenPayment = '0.05';

export const commonOpertationsGasLimit = 60_000_000;
export const commonBuiltInOpertationsGasLimit = 6_000_000;
export const specialOpertationsGasLimit = 3_000_00;

// XP.NETWORK Exclusive
export enum BridgeAddress {
    devnet = "erd1qqqqqqqqqqqqqpgqy2nx5z4cpr90de4sga2v2yx62fph3lg8g6vskt0k2f",
    mainnet = "erd1qqqqqqqqqqqqqpgq3y98dyjdp72lwzvd35yt4f9ua2a3n70v0drsfycvu8"
}