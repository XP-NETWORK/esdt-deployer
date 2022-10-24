import { exit } from 'process';

import {
    AddressValue,
    Transaction,
    BytesValue,
    Address,
    ContractCallPayloadBuilder,
    ContractFunction,
    TypedValue,
} from '@elrondnetwork/erdjs';

import {
    chain,
    shortChainId,
    builtInSC,
    commonOpertationsGasLimit,
    ALL_PROPERTIES,
    BridgeAddress
} from './consts';

import {
    setup,
    commonTxOperations
} from './utils';

import {transferOwnershipEsdt} from './ownership';

export const setSpecialRolesEsdt = async (
    ticker:string,
    address:BridgeAddress,
    specialRoles:ALL_PROPERTIES[]
) => {

    const { signer, userAccount, provider } = await setup();

    const args: TypedValue[] = [
        BytesValue.fromUTF8(ticker),
        new AddressValue(new Address(address.trim())),
      ];

      for (const role of specialRoles){
          args.push(BytesValue.fromUTF8(role));
      };

      const data = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('setSpecialRole'))
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

    const ticker = "ticker";
    const contract = BridgeAddress.devnet

    await setSpecialRolesEsdt(
        /* Token Ticker */ ticker,
        /* Role Address */ contract,
        /* Roles */ [
            'ESDTRoleNFTCreate',
            'ESDTRoleNFTBurn'
        ]
    );

    await transferOwnershipEsdt(
        /* Token Ticker */ ticker,
        /* Role Address */ contract
    );

    exit(0);
})().catch(e => {
    console.error(e);
    exit(1)
})