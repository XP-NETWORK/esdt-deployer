import { Account, Transaction } from '@elrondnetwork/erdjs';
import { UserSigner } from '@elrondnetwork/erdjs-walletcore';
import { ApiNetworkProvider } from '@elrondnetwork/erdjs-network-providers';
export declare const getFileContents: (relativeFilePath: string, options: {
    isJSON?: boolean;
    noExitOnError?: boolean;
}) => any;
export declare const getProvider: () => ApiNetworkProvider;
export declare const prepareUserSigner: (walletPemKey: string) => UserSigner;
export declare const prepareUserAccount: (walletPemKey: string) => Promise<Account>;
export declare const setup: () => Promise<{
    signer: UserSigner;
    userAccount: Account;
    provider: ApiNetworkProvider;
}>;
export declare const transactionResult: (tx_hash: string) => Promise<any>;
export declare const commonTxOperations: (tx: Transaction, account: Account, signer: UserSigner, provider: ApiNetworkProvider) => Promise<void>;
export declare const dnsScAddressForHerotag: (herotag: string) => import("@elrondnetwork/erdjs").IAddress;
/**
 * Validates that the token name is 3-20 alphanumeric characters
 * @param name the validated token name
 * @returns true or throws an error
 */
export declare const isValidTokenName: (name: string) => boolean;
/**
 * Validates that the token ticker is 3-10 alphanumeric characters
 * @param ticker the validated token
 * @returns true or throws an error
 */
export declare const isValidTokenTicker: (ticker: string) => boolean;
/**
 * Velidates whether the decimal number makes sence
 * @param decimals the validated decimals value
 * @returns true or throws an error
 */
export declare const isValidDecimals: (decimals: number) => boolean;
