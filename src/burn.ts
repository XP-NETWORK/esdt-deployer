// import { exit } from 'process';
// import {
//     Transaction,
//     BigUIntValue,
//     BytesValue,
//     ContractCallPayloadBuilder,
//     ContractFunction,
//     TypedValue,
// } from '@elrondnetwork/erdjs';

// import Bignumber from 'bignumber.js';

// import {
//     chain,
//     shortChainId,
//     specialOpertationsGasLimit,
// } from './consts';
// import { commonTxOperations, setup } from './utils';
// import { decimalToHex } from './converters';

// export const burnNFT = async (
//     ticker: string,
//     nonce: string,
//     supply: number,
// ) => {

//     const { signer, userAccount, provider } = await setup();

//     const args: TypedValue[] = [
//         BytesValue.fromUTF8(ticker),
//         BytesValue.fromUTF8(decimalToHex(nonce)),
//         new BigUIntValue(new Bignumber(supply))
//     ];

//     const data = new ContractCallPayloadBuilder()
//         .setFunction(new ContractFunction('ESDTNFTBurn'))
//         .setArgs(args)
//         .build();

//     const tx = new Transaction({
//         data,
//         gasLimit: 10000000,
//         receiver: userAccount.address,
//         sender: signer.getAddress(),
//         value: 0,
//         chainID: shortChainId[chain],
//     });

//     await commonTxOperations(tx, userAccount, signer, provider);

// }

// (async () => {

//     const {
//         BURN_TICKER,
//         BURN_NONCE,
//         BURN_AMOUNT,
//     } = process.env;

//     // TODO - validate the above inputs

//     await burnNFT(
//         /* Ticker */ BURN_TICKER!,
//         /* nonce */ BURN_NONCE!,
//         /* Supply */ Number(BURN_AMOUNT!),

//     );

//     exit(0);
// })().catch(e => {
//     console.error(e);
//     exit(1)
// })
