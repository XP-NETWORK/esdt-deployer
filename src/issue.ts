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
    ALL_PROPS,
    ALL_PROPERTIES
} from './consts';

import {
    isValidTokenName,
    isValidTokenTicker,
    isValidDecimals,
    setup,
    commonTxOperations
} from './utils';

export const issueESDT = async (
    name: string,
    ticker: string,
    initialSupply: number,
    numberOfDecimals: number,
    tokenProperties:ALL_PROPERTIES[]
) => {

    if( isValidTokenName(name)
    && isValidTokenTicker(ticker)
    && isValidDecimals(numberOfDecimals)
    ){
        const { signer, userAccount, provider } = await setup();
        const payment = TokenPayment.egldFromAmount(issueTokenPayment);
    
        const args: TypedValue[] = [
            BytesValue.fromUTF8(name),
            BytesValue.fromUTF8(ticker),
            new BigUIntValue(new Bignumber(initialSupply)),
            new U32Value(numberOfDecimals),
        ];
    
        for (const property of ALL_PROPS){
            let propertyEnabled = false;
    
            if(tokenProperties.includes(property)){
                propertyEnabled = true;
            }
    
            args.push(BytesValue.fromUTF8(property));
            args.push(BytesValue.fromUTF8(propertyEnabled.toString()));
        }
    
        const data = new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('issue'))
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
        /* Collection name */ "name",
        /* Token Ticker    */ "ticker",
        /* Initial Supply  */ 0,
        /* Decimals number */ 0,
        /* Token Properties*/ [
            'canTransferNFTCreateRole',
            'ESDTRoleNFTCreate',
            'ESDTTransferRole',
            'ESDTRoleNFTBurn'
        ]
    );

    exit(0);
})().catch(e => {
    console.error(e);
    exit(1)
})