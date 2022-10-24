import { exit } from 'process';
import {
    Transaction,
    BytesValue,
    AddressValue,
    Address,
    ContractCallPayloadBuilder,
    ContractFunction,
    TypedValue,
} from '@elrondnetwork/erdjs';

import {
    chain,
    shortChainId,
    commonOpertationsGasLimit,
    builtInSC,
    BridgeAddress,
} from './consts';
import { commonTxOperations, setup } from './utils';

export const transferOwnershipEsdt = async (
    ticker:string,
    address:string
) => {

    const { signer, userAccount, provider } = await setup();

    const args: TypedValue[] = [
        BytesValue.fromUTF8(ticker),
        new AddressValue(new Address(address.trim())),
      ];
  
      const data = new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction('transferOwnership'))
        .setArgs(args)
        .build();
  
      const tx = new Transaction({
        data,
        gasLimit: commonOpertationsGasLimit,
        receiver: new Address(builtInSC.trim()),
        sender: signer.getAddress(),
        value: 0,
        chainID: shortChainId[chain],
      });
  
      await commonTxOperations(tx, userAccount, signer, provider);

}

(async () => {

    await transferOwnershipEsdt(
        /* Token Ticker */ "ticker",
        /* Role Address */ BridgeAddress.devnet
    );

    exit(0);
})().catch(e => {
    console.error(e);
    exit(1)
})