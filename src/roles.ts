import { exit } from 'process';

import {
    AddressValue,
    Transaction,
    BytesValue,
    Address,
    ContractCallPayloadBuilder,
    ContractFunction,
    TypedValue,
    IAddress,
} from '@elrondnetwork/erdjs';

import {
    chain,
    shortChainId,
    builtInSC,
    commonOpertationsGasLimit,
    BridgeAddress,
    ftSpecialRoles,
    nftSpecialRoles,
    sftSpecialRoles
} from './consts';

import {
    setup,
    commonTxOperations
} from './utils';

export const setSpecialRolesEsdt = async (
    ticker: string,
    address: BridgeAddress | IAddress,
    specialRoles: string[]
) => {

    const { signer, userAccount, provider } = await setup();

    let addr: AddressValue;

    try {
        if (typeof (address) == typeof BridgeAddress) {
            const a: BridgeAddress = address as BridgeAddress;
            addr = new AddressValue(new Address(a.trim()))
        } else {
            addr = new AddressValue(address as IAddress);
        }
    } catch (e) {
        addr = new AddressValue(address as IAddress);
    }

    const args: TypedValue[] = [
        BytesValue.fromUTF8(ticker),
        addr,
    ];

    for (const role of specialRoles) {
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

    const { signer } = await setup();

    const {
        ROLES_TICKER,
        ROLES_TYPE,
        ROLES_ADDRESS
    } = process.env;


    let ROLES: string[];

    // Select one of the above
    switch (ROLES_TYPE) {

        case 'FT':
            ROLES = ftSpecialRoles;
            break;

        case 'NFT':
            ROLES = nftSpecialRoles;
            break;

        case 'SFT':
            ROLES = sftSpecialRoles;
            break;

        default:
            throw Error("ROLES_TYPE= is not set in the .env");
    }

    const contract = BridgeAddress.devnet

    let RECIPIENT: any;

    switch (ROLES_ADDRESS) {
        case BridgeAddress.devnet:
            RECIPIENT = BridgeAddress.devnet;
            break;
        case BridgeAddress.mainnet:
            RECIPIENT = BridgeAddress.mainnet;
            break;

        default:
            RECIPIENT = signer.getAddress()
            break;
    }

    await setSpecialRolesEsdt(
        /* Token Ticker */ ROLES_TICKER!,
        /* Role Address */ RECIPIENT,
        /* Roles */ ROLES
    );

    // await transferOwnershipEsdt(
    //     /* Token Ticker */ ticker,
    //     /* Role Address */ contract
    // );

    exit(0);
})().catch(e => {
    console.error(e);
    exit(1)
})