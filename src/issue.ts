import { exit } from 'process';
import Bignumber from 'bignumber.js';
import {
    TokenPayment,
    Transaction,
    BytesValue,
    U32Value,
    BigUIntValue,
    Address,
    ContractCallPayloadBuilder,
    ContractFunction,
    TypedValue,
} from '@elrondnetwork/erdjs';

import {
    chain,
    shortChainId,
    issueTokenPayment,
    builtInSC,
    commonOpertationsGasLimit,
    issueESDTTypes,
    sftTokenProperties
} from './consts';

import {
    isValidTokenName,
    isValidTokenTicker,
    isValidDecimals,
    setup,
    commonTxOperations
} from './utils';

export const issueESDT = async (
    type: issueESDTTypes,
    name: string,
    ticker: string,
    tokenProperties:string[],
    initialSupply?: number,
    numberOfDecimals?: number,
) => {

    if(!numberOfDecimals) numberOfDecimals=0
    if(!initialSupply) initialSupply=0


    if( isValidTokenName(name)
    && isValidTokenTicker(ticker)
    && isValidDecimals(numberOfDecimals)
    ){
        const { signer, userAccount, provider } = await setup();
        const payment = TokenPayment.egldFromAmount(issueTokenPayment);
    
        const args: TypedValue[] = [
            BytesValue.fromUTF8(name),
            BytesValue.fromUTF8(ticker),
        ];

        if(type == 'issue'){
            args.push(new BigUIntValue(new Bignumber(initialSupply)))
            args.push(new U32Value(numberOfDecimals))
        }
    
        for (const property of tokenProperties){
    
            args.push(BytesValue.fromUTF8(property));
            args.push(BytesValue.fromUTF8(true.toString()));
        }
    
        const data = new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction(type))
        .setArgs(args)
        .build();
    
        const tx = new Transaction({
            data,
            gasLimit: commonOpertationsGasLimit,
            receiver: new Address(builtInSC.trim()),
            sender: signer.getAddress(),
            value: payment,
            chainID: shortChainId[chain]
        });
            
        await commonTxOperations(tx, userAccount, signer, provider);
    }
}


(async () => {



    await issueESDT(
        /* FT | NFT | SFT */ issueESDTTypes.SFT,
        /* Collection name */ "TestChestSFT",
        /* Token Ticker    */ "TLANDCHEST",
        /* Token Properties*/ sftTokenProperties
    );

    exit(0);
})().catch(e => {
    console.error(e);
    exit(1)
})