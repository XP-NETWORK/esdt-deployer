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
    esdtTokenSpecialRoles,
    nftTokenSpecialRoles,
    sftTokenSpecialRoles,
    BridgeAddress,
    ESDTTypes,
    sftTokenProperties
} from './consts';

import {
    setup,
    commonTxOperations
} from './utils';

import { transferOwnershipEsdt } from './ownership';

export const setSpecialRolesEsdt = async (
    ticker: string,
    address: BridgeAddress|IAddress,
    specialRoles: string[]
) => {

    const { signer, userAccount, provider } = await setup();

    let addr:AddressValue;
    
    try{
        if(typeof(address) == typeof BridgeAddress){
            const a: BridgeAddress = address as BridgeAddress;
            addr = new AddressValue(new Address(a.trim()))
        }else{
            addr = new AddressValue(address as IAddress);
        }
    }catch(e){
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

    const { signer} = await setup();

    // Comment out the unrequired roles
    const ftSpecialRoles = [
        esdtTokenSpecialRoles.ESDTRoleLocalBurn,
        esdtTokenSpecialRoles.ESDTRoleLocalMint
    ]

    const nftSpecialRoles = [
        nftTokenSpecialRoles.ESDTRoleNFTCreate,
        nftTokenSpecialRoles.ESDTRoleNFTBurn,
        nftTokenSpecialRoles.ESDTTransferRole,
        nftTokenSpecialRoles.ESDTRoleNFTUpdateAttributes
    ];

    const sftSpecialRoles = [
        sftTokenSpecialRoles.ESDTRoleNFTAddQuantity,
        sftTokenSpecialRoles.ESDTRoleNFTBurn,
        sftTokenSpecialRoles.ESDTRoleNFTCreate,
        sftTokenSpecialRoles.ESDTTransferRole
    ]

    // Select one of the above
    const ROLES = sftSpecialRoles;

    const ticker = "TLANDCHEST-295de4" //"TLANDCHEST-112199";
    const contract = BridgeAddress.devnet

    await setSpecialRolesEsdt(
        /* Token Ticker */ ticker,
        /* Role Address */ signer.getAddress(), //contract, // brdge
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