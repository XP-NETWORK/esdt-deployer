import { exit } from 'process';
import {
    Transaction,
    BigUIntValue,
    BytesValue,
    ContractCallPayloadBuilder,
    ContractFunction,
    TypedValue,
} from '@elrondnetwork/erdjs';

import Bignumber from 'bignumber.js';

import {
    chain,
    shortChainId,
    specialOpertationsGasLimit,
} from './consts';
import { commonTxOperations, setup } from './utils';

export const mintNFT = async (
    ticker: string,
    supply: number,
    name: string,
    royalties: number,
    hash: string,
    attributes: string,
    uris: string[]
) => {

    const { signer, userAccount, provider } = await setup();

    const args: TypedValue[] = [
        BytesValue.fromUTF8(ticker),
        new BigUIntValue(new Bignumber(supply))
    ];

    args.push(BytesValue.fromUTF8(name));
    args.push(new BigUIntValue(new Bignumber(royalties)));
    args.push(BytesValue.fromUTF8(hash));
    args.push(BytesValue.fromUTF8(attributes));

    for (const item of uris) {
        args.push(BytesValue.fromUTF8(item));
    }

    const data = new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('ESDTNFTCreate'))
        .setArgs(args)
        .build();

    const tx = new Transaction({
        data,
        gasLimit: specialOpertationsGasLimit * 20,
        receiver: userAccount.address,
        sender: signer.getAddress(),
        value: 0,
        chainID: shortChainId[chain],
    });

    await commonTxOperations(tx, userAccount, signer, provider);

}

(async () => {

const {
    MINT_TICKER,
    MINT_SUPPLY,
    MINT_NAME,
    MINT_ROYALTIES,
    MINT_ATTRIBUTES,
    MINT_URI
} = process.env;

    // TODO - validate the above inputs

    await mintNFT(
        /* Ticker */ MINT_TICKER!,
        /* Supply */ Number(MINT_SUPPLY!),
        /* name */ MINT_NAME!,
        /* royalties */ Number(MINT_ROYALTIES) * 100,
        /* hash */ '',
        /* Attributes */ MINT_ATTRIBUTES!,
        /* uris */MINT_URI!.split(',')
    );

    exit(0);
})().catch(e => {
    console.error(e);
    exit(1)
})