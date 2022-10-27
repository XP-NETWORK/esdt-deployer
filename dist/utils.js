"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDecimals = exports.isValidTokenTicker = exports.isValidTokenName = exports.dnsScAddressForHerotag = exports.commonTxOperations = exports.transactionResult = exports.setup = exports.prepareUserAccount = exports.prepareUserSigner = exports.getProvider = exports.getFileContents = void 0;
const process_1 = require("process");
const fs_1 = require("fs");
const erdjs_1 = require("@elrondnetwork/erdjs");
const keccak_1 = __importDefault(require("keccak"));
const erdjs_walletcore_1 = require("@elrondnetwork/erdjs-walletcore");
const erdjs_network_providers_1 = require("@elrondnetwork/erdjs-network-providers");
const consts_1 = require("./consts");
const axios_1 = __importDefault(require("axios"));
const baseDir = (0, process_1.cwd)();
const getFileContents = (relativeFilePath, options) => {
    const isJSON = options.isJSON === undefined ? true : options.isJSON;
    const noExitOnError = options.noExitOnError === undefined ? false : options.noExitOnError;
    const filePath = `${baseDir}/${relativeFilePath}`;
    try {
        (0, fs_1.accessSync)(filePath, fs_1.constants.R_OK | fs_1.constants.W_OK);
    }
    catch (err) {
        if (!noExitOnError) {
            console.error(`There is no ${relativeFilePath}!`);
            (0, process_1.exit)(9);
        }
        else {
            return undefined;
        }
    }
    const rawFile = (0, fs_1.readFileSync)(filePath);
    const fileString = rawFile.toString('utf8');
    if (isJSON) {
        return JSON.parse(fileString);
    }
    return fileString;
};
exports.getFileContents = getFileContents;
const getProvider = () => {
    return new erdjs_network_providers_1.ApiNetworkProvider(consts_1.publicApi[consts_1.chain], {
        timeout: 10000,
    });
};
exports.getProvider = getProvider;
const prepareUserSigner = (walletPemKey) => {
    return erdjs_walletcore_1.UserSigner.fromPem(walletPemKey);
};
exports.prepareUserSigner = prepareUserSigner;
// Prepare main user account from the wallet PEM file
const prepareUserAccount = async (walletPemKey) => {
    const userKey = (0, erdjs_walletcore_1.parseUserKey)(walletPemKey);
    const address = userKey.generatePublicKey().toAddress();
    return new erdjs_1.Account(address);
};
exports.prepareUserAccount = prepareUserAccount;
const setup = async () => {
    const walletPemKey = (0, exports.getFileContents)('walletKey.pem', { isJSON: false });
    // Provider type based on initial configuration
    const provider = (0, exports.getProvider)();
    const userAccount = await (0, exports.prepareUserAccount)(walletPemKey);
    const userAccountOnNetwork = await provider.getAccount(userAccount.address);
    userAccount.update(userAccountOnNetwork);
    const signer = (0, exports.prepareUserSigner)(walletPemKey);
    return {
        signer,
        userAccount,
        provider,
    };
};
exports.setup = setup;
const transactionResult = async (tx_hash) => {
    const providerRest = axios_1.default.create({
        baseURL: consts_1.publicApi[consts_1.chain]
    });
    const uri = `/transaction/${tx_hash}?withResults=true`;
    let tries = 0;
    while (tries < 10) {
        tries += 1;
        let err;
        // TODO: type safety
        const res = await providerRest.get(uri).catch((e) => (err = e));
        if (err) {
            await new Promise((r) => setTimeout(r, 3000));
            continue;
        }
        const data = res.data;
        if (data["code"] != "successful") {
            throw Error("failed to execute txn");
        }
        const tx_info = data["data"]["transaction"];
        if (tx_info["status"] == "pending") {
            await new Promise((r) => setTimeout(r, 5000));
            continue;
        }
        if (tx_info["status"] != "success") {
            throw Error("failed to execute txn");
        }
        return tx_info;
    }
    throw Error(`failed to query transaction exceeded 10 retries ${tx_hash}`);
};
exports.transactionResult = transactionResult;
const commonTxOperations = async (tx, account, signer, provider) => {
    tx.setNonce(account.nonce);
    account.incrementNonce();
    signer.sign(tx);
    await provider.sendTransaction(tx);
    const watcher = new erdjs_1.TransactionWatcher(provider);
    const transactionOnNetwork = await watcher.awaitCompleted(tx);
    const txHash = transactionOnNetwork.hash;
    const txStatus = transactionOnNetwork.status;
    console.log(`\nTransaction status: ${txStatus}`);
    console.log(`Transaction link: ${consts_1.elrondExplorer[consts_1.chain]}/transactions/${txHash}\n`);
    const result = await (0, exports.transactionResult)(txHash);
};
exports.commonTxOperations = commonTxOperations;
const dnsScAddressForHerotag = (herotag) => {
    const hashedHerotag = (0, keccak_1.default)('keccak256').update(herotag).digest();
    const initialAddress = Buffer.from(Array(32).fill(1));
    const initialAddressSlice = initialAddress.slice(0, 30);
    const scId = hashedHerotag.slice(31);
    const deployer_pubkey = Buffer.concat([
        initialAddressSlice,
        Buffer.from([0, scId.readUIntBE(0, 1)]),
    ]);
    const scAddress = erdjs_1.SmartContract.computeAddress(new erdjs_1.Address(deployer_pubkey), 0);
    return scAddress;
};
exports.dnsScAddressForHerotag = dnsScAddressForHerotag;
/**
 * Validates that the token name is 3-20 alphanumeric characters
 * @param name the validated token name
 * @returns true or throws an error
 */
const isValidTokenName = (name) => {
    if (!name)
        throw new Error("'name' is a required field");
    if (name.length > 20 || name.length < 3) {
        throw new Error("The name length must be between 3 & 20 characters");
    }
    if (!new RegExp(/^[a-zA-Z0-9]+$/).test(name)) {
        throw new Error("Alphanumeric characters only!");
    }
    return true;
};
exports.isValidTokenName = isValidTokenName;
/**
 * Validates that the token ticker is 3-10 alphanumeric characters
 * @param ticker the validated token
 * @returns true or throws an error
 */
const isValidTokenTicker = (ticker) => {
    if (!ticker)
        throw new Error("The token tiker parameter is required!");
    if (ticker.length > 10 || ticker.length < 3) {
        throw new Error("The 'tiker' length must be between 3 & 10 characters!");
    }
    if (!new RegExp(/^[A-Z0-9]+$/).test(ticker)) {
        throw new Error("Use alohanumeric Upper case only!");
    }
    return true;
};
exports.isValidTokenTicker = isValidTokenTicker;
/**
 * Velidates whether the decimal number makes sence
 * @param decimals the validated decimals value
 * @returns true or throws an error
 */
const isValidDecimals = (decimals) => {
    if (decimals > 18 || decimals < 0) {
        throw new Error("'decimals' must lie between 0 and 18 digits");
    }
    return true;
};
exports.isValidDecimals = isValidDecimals;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscUNBQW9DO0FBRXBDLDJCQUF5RDtBQUN6RCxnREFPOEI7QUFDOUIsb0RBQTRCO0FBQzVCLHNFQUEyRTtBQUMzRSxvRkFBNEU7QUFDNUUscUNBQTJEO0FBQzNELGtEQUEwQjtBQUUxQixNQUFNLE9BQU8sR0FBRyxJQUFBLGFBQUcsR0FBRSxDQUFDO0FBRWYsTUFBTSxlQUFlLEdBQUcsQ0FDN0IsZ0JBQXdCLEVBQ3hCLE9BQXNELEVBQ3RELEVBQUU7SUFDRixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ3BFLE1BQU0sYUFBYSxHQUNqQixPQUFPLENBQUMsYUFBYSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO0lBRXRFLE1BQU0sUUFBUSxHQUFHLEdBQUcsT0FBTyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFFbEQsSUFBSTtRQUNGLElBQUEsZUFBVSxFQUFDLFFBQVEsRUFBRSxjQUFTLENBQUMsSUFBSSxHQUFHLGNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN2RDtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLGVBQWUsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1lBQ2xELElBQUEsY0FBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ1Q7YUFBTTtZQUNMLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO0tBQ0Y7SUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFBLGlCQUFZLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFDdkMsTUFBTSxVQUFVLEdBQUcs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