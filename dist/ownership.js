"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferOwnershipEsdt = void 0;
const erdjs_1 = require("@elrondnetwork/erdjs");
const consts_1 = require("./consts");
const utils_1 = require("./utils");
const transferOwnershipEsdt = async (ticker, address) => {
    const { signer, userAccount, provider } = await (0, utils_1.setup)();
    const args = [
        erdjs_1.BytesValue.fromUTF8(ticker),
        new erdjs_1.AddressValue(new erdjs_1.Address(address.trim())),
    ];
    const data = new erdjs_1.ContractCallPayloadBuilder()
        .setFunction(new erdjs_1.ContractFunction('transferOwnership'))
        .setArgs(args)
        .build();
    const tx = new erdjs_1.Transaction({
        data,
        gasLimit: consts_1.commonOpertationsGasLimit,
        receiver: new erdjs_1.Address(consts_1.builtInSC.trim()),
        sender: signer.getAddress(),
        value: 0,
        chainID: consts_1.shortChainId[consts_1.chain],
    });
    await (0, utils_1.commonTxOperations)(tx, userAccount, signer, provider);
};
exports.transferOwnershipEsdt = transferOwnershipEsdt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3duZXJzaGlwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL293bmVyc2hpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxnREFROEI7QUFFOUIscUNBTWtCO0FBQ2xCLG1DQUFvRDtBQUU3QyxNQUFNLHFCQUFxQixHQUFHLEtBQUssRUFDdEMsTUFBYSxFQUNiLE9BQWMsRUFDaEIsRUFBRTtJQUVBLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sSUFBQSxhQUFLLEdBQUUsQ0FBQztJQUV4RCxNQUFNLElBQUksR0FBaUI7UUFDdkIsa0JBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUksb0JBQVksQ0FBQyxJQUFJLGVBQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUM5QyxDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxrQ0FBMEIsRUFBRTtTQUMxQyxXQUFXLENBQUMsSUFBSSx3QkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1NBQ3RELE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDYixLQUFLLEVBQUUsQ0FBQztJQUVYLE1BQU0sRUFBRSxHQUFHLElBQUksbUJBQVcsQ0FBQztRQUN6QixJQUFJO1FBQ0osUUFBUSxFQUFFLGtDQUF5QjtRQUNuQyxRQUFRLEVBQUUsSUFBSSxlQUFPLENBQUMsa0JBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QyxNQUFNLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRTtRQUMzQixLQUFLLEVBQUUsQ0FBQztRQUNSLE9BQU8sRUFBRSxxQkFBWSxDQUFDLGNBQUssQ0FBQztLQUM3QixDQUFDLENBQUM7SUFFSCxNQUFNLElBQUEsMEJBQWtCLEVBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFbEUsQ0FBQyxDQUFBO0FBNUJZLFFBQUEscUJBQXFCLHlCQTRCakMifQ==