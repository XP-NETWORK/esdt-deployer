import { commonTxOperations, setup } from "./utils";
import { exit } from 'process';
import {
    TokenPayment,
    Transaction,
    BytesValue,
    Address,
    ContractCallPayloadBuilder,
    ContractFunction,
    TypedValue,
    AddressValue,
} from '@elrondnetwork/erdjs';
import {
    chain,
    shortChainId,
    issueTokenPayment,
    builtInSC,
    commonOpertationsGasLimit,
    EgldServiceType
} from './consts';


export const unsetSpecialRoles = async (
    ticker: string,
    role: string
) => {

    const { signer, userAccount, provider } = await setup();
    const payment = TokenPayment.egldFromAmount(issueTokenPayment);

    const args: TypedValue[] = [
        BytesValue.fromUTF8(ticker),
        new AddressValue(signer.getAddress()),
        BytesValue.fromUTF8(role),
    ];

    const data = new ContractCallPayloadBuilder()
        .setFunction(new ContractFunction(EgldServiceType.unSetSpecialRole))
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

(async () => {

    const {
        UNSET_TICKER,
        UNSET_ROLE
    } = process.env;

    if (!UNSET_TICKER) throw Error("UNSET_TICKER missing");
    if (!UNSET_ROLE) throw Error("UNSET_ROLE missing");

    await unsetSpecialRoles(
        UNSET_TICKER!,
        UNSET_ROLE!
    )
    exit(0);
})().catch(e => {
    console.error(e);
    exit(1)
});
