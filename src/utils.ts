import { exit, cwd } from 'process';
import Bignumber from 'bignumber.js';
import { accessSync, constants, readFileSync } from 'fs';
import { 
    Account, 
    SmartContract, 
    Address, 
    Transaction, 
    TransactionWatcher 
} from '@elrondnetwork/erdjs';
import ora from 'ora';//Spinner
import keccak from 'keccak';
import { parseUserKey, UserSigner } from '@elrondnetwork/erdjs-walletcore';
import { ApiNetworkProvider } from '@elrondnetwork/erdjs-network-providers';
import { publicApi, chain, elrondExplorer} from './consts';

const baseDir = cwd();

export const getFileContents = (
  relativeFilePath: string,
  options: { isJSON?: boolean; noExitOnError?: boolean }
) => {
  const isJSON = options.isJSON === undefined ? true : options.isJSON;
  const noExitOnError =
    options.noExitOnError === undefined ? false : options.noExitOnError;

  const filePath = `${baseDir}/${relativeFilePath}`;

  try {
    accessSync(filePath, constants.R_OK | constants.W_OK);
  } catch (err) {
    if (!noExitOnError) {
      console.error(`There is no ${relativeFilePath}!`);
      exit(9);
    } else {
      return undefined;
    }
  }

  const rawFile = readFileSync(filePath);
  const fileString = rawFile.toString('utf8');

  if (isJSON) {
    return JSON.parse(fileString);
  }
  return fileString;
};

export const getProvider = () => {
  return new ApiNetworkProvider(publicApi[chain], {
    timeout: 10000,
  });
};

export const prepareUserSigner = (walletPemKey: string) => {
  return UserSigner.fromPem(walletPemKey);
};

// Prepare main user account from the wallet PEM file
export const prepareUserAccount = async (walletPemKey: string) => {
  const userKey = parseUserKey(walletPemKey);
  const address = userKey.generatePublicKey().toAddress();
  return new Account(address);
};

export const setup = async () => {
  const walletPemKey = getFileContents('walletKey.pem', { isJSON: false });
  // Provider type based on initial configuration
  const provider = getProvider();

  const userAccount = await prepareUserAccount(walletPemKey);
  const userAccountOnNetwork = await provider.getAccount(userAccount.address);
  userAccount.update(userAccountOnNetwork);

  const signer = prepareUserSigner(walletPemKey);

  return {
    signer,
    userAccount,
    provider,
  };
};

export const commonTxOperations = async (
    tx: Transaction,
    account: Account,
    signer: UserSigner,
    provider: ApiNetworkProvider
  ) => {
    tx.setNonce(account.nonce);
    account.incrementNonce();
    signer.sign(tx);
  
    const spinner = ora('Processing the transaction...');
    spinner.start();
  
    await provider.sendTransaction(tx);
  
    const watcher = new TransactionWatcher(provider);
    const transactionOnNetwork = await watcher.awaitCompleted(tx);
  
    const txHash = transactionOnNetwork.hash;
    const txStatus = transactionOnNetwork.status;
  
    spinner.stop();
  
    console.log(`\nTransaction status: ${txStatus}`);
    console.log(
      `Transaction link: ${elrondExplorer[chain]}/transactions/${txHash}\n`
    );
  };

  export const dnsScAddressForHerotag = (herotag: string) => {
    const hashedHerotag = keccak('keccak256').update(herotag).digest();
  
    const initialAddress = Buffer.from(Array(32).fill(1));
    const initialAddressSlice = initialAddress.slice(0, 30);
    const scId = hashedHerotag.slice(31);
  
    const deployer_pubkey = Buffer.concat([
      initialAddressSlice,
      Buffer.from([0, scId.readUIntBE(0, 1)]),
    ]);
  
    const scAddress = SmartContract.computeAddress(
      new Address(deployer_pubkey),
      0
    );
  
    return scAddress;
  };

  /**
   * Validates that the token name is 3-20 alphanumeric characters
   * @param name the validated token name
   * @returns true or throws an error
   */
  export const isValidTokenName = (name:string) => {

    if (!name) throw new Error("'name' is a required field");

    if (name.length > 20 || name.length < 3){
        throw new Error("The name length must be between 3 & 20 characters");
    }

    if(!new RegExp(/^[a-zA-Z0-9]+$/).test(name)){
        throw new Error("Alphanumeric characters only!");
        
    }

    return true;
  }

  /**
   * Validates that the token ticker is 3-10 alphanumeric characters
   * @param ticker the validated token
   * @returns true or throws an error
   */
  export const isValidTokenTicker = (ticker:string) => {

    if(!ticker) throw new Error("The token tiker parameter is required!");

    if (ticker.length > 10 || ticker.length < 3){
        throw new Error("The 'tiker' length must be between 3 & 10 characters!");
    }

    if(!new RegExp(/^[A-Z0-9]+$/).test(ticker)){
        throw new Error("Use alohanumeric Upper case only!");
    }
    
    return true;
  }

  /**
   * Velidates whether the decimal number makes sence
   * @param decimals the validated decimals value
   * @returns true or throws an error
   */
  export const isValidDecimals = (decimals:number) => {

    if(!decimals || new Bignumber(decimals).isNaN()) throw new Error("The 'decimals' parameter is Required!");
    if(decimals > 18 || decimals < 0){
        throw new Error("'decimals' must lie between 0 and 18 digits");
    }
      return true;
  }