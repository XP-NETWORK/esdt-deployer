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
    ticker:string,
    supply:number,
    name:string,
    royalties:number,
    hash:string,
    attributes:string,
    uris: string[]
) => {

    const { signer, userAccount, provider } = await setup();

    const h = hash;

    const args: TypedValue[] = [
        BytesValue.fromUTF8(ticker),
        new BigUIntValue(new Bignumber(supply))
      ];

      args.push(BytesValue.fromUTF8(name));
      args.push(new BigUIntValue(new Bignumber(royalties)));
      args.push(BytesValue.fromUTF8(hash));
     args.push(BytesValue.fromUTF8(attributes));

      for (const item of uris){
        args.push(BytesValue.fromUTF8(item));
      }
  
      const data = new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('ESDTNFTCreate'))
        .setArgs(args)
        .build();
  
      const tx = new Transaction({
        data,
        gasLimit: specialOpertationsGasLimit*20,
        receiver: userAccount.address,
        sender: signer.getAddress(),
        value: 0,
        chainID: shortChainId[chain],
      });
  
      await commonTxOperations(tx, userAccount, signer, provider);

}

(async () => {

    await mintNFT(
        /* Ticker */ "TLANDCHEST-112199",
        /* Supply */ 1,
        /* name */ 'Polkamonster',
        /* royalties */ 500,
        /* hash */ '',
        /* Attributes */ 'https://assets.polkamon.com/images/Unimons_T06C02H10B04G00.jpg',
        /* uris */ ['https://bridge-wnftapi.herokuapp.com/w/635658439d0e07da66b4ba29']
    );

    exit(0);
})().catch(e => {
    console.error(e);
    exit(1)
})