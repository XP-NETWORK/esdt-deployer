"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueESDT = void 0;
const process_1 = require("process");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const erdjs_1 = require("@elrondnetwork/erdjs");
const consts_1 = require("./consts");
const utils_1 = require("./utils");
const issueESDT = async (type, name, ticker, tokenProperties, initialSupply, numberOfDecimals) => {
    if (!numberOfDecimals)
        numberOfDecimals = 0;
    if (!initialSupply)
        initialSupply = 0;
    if ((0, utils_1.isValidTokenName)(name)
        && (0, utils_1.isValidTokenTicker)(ticker)
        && (0, utils_1.isValidDecimals)(numberOfDecimals)) {
        const { signer, userAccount, provider } = await (0, utils_1.setup)();
        const payment = erdjs_1.TokenPayment.egldFromAmount(consts_1.issueTokenPayment);
        const args = [
            erdjs_1.BytesValue.fromUTF8(name),
            erdjs_1.BytesValue.fromUTF8(ticker),
        ];
        if (type == 'issue') {
            args.push(new erdjs_1.BigUIntValue(new bignumber_js_1.default(initialSupply)));
            args.push(new erdjs_1.U32Value(numberOfDecimals));
        }
        for (const property of tokenProperties) {
            // args.push(BytesValue.fromUTF8(property));
            // args.push(BytesValue.fromUTF8(true.toString()));
        }
        const data = new erdjs_1.ContractCallPayloadBuilder()
            .setFunction(new erdjs_1.ContractFunction(type))
            .setArgs(args)
            .build();
        const tx = new erdjs_1.Transaction({
            data,
            gasLimit: consts_1.commonOpertationsGasLimit,
            receiver: new erdjs_1.Address(consts_1.builtInSC.trim()),
            sender: signer.getAddress(),
            value: payment,
            chainID: consts_1.shortChainId[consts_1.chain]
        });
        await (0, utils_1.commonTxOperations)(tx, userAccount, signer, provider);
    }
};
exports.issueESDT = issueESDT;
(async () => {
    await (0, exports.issueESDT)(
    /* FT | NFT | SFT */ consts_1.issueESDTTypes.NFT, 
    /* Collection name */ "TestChest", 
    /* Token Ticker    */ "TLANDCHEST", 
    /* Token Properties*/ [
        ''
    ]);
    (0, process_1.exit)(0);
})().catch(e => {
    console.error(e);
    (0, process_1.exit)(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNzdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaXNzdWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEscUNBQStCO0FBQy9CLGdFQUFxQztBQUNyQyxnREFVOEI7QUFFOUIscUNBUWtCO0FBRWxCLG1DQU1pQjtBQUVWLE1BQU0sU0FBUyxHQUFHLEtBQUssRUFDMUIsSUFBb0IsRUFDcEIsSUFBWSxFQUNaLE1BQWMsRUFDZCxlQUF3QixFQUN4QixhQUFzQixFQUN0QixnQkFBeUIsRUFDM0IsRUFBRTtJQUVBLElBQUcsQ0FBQyxnQkFBZ0I7UUFBRSxnQkFBZ0IsR0FBQyxDQUFDLENBQUE7SUFDeEMsSUFBRyxDQUFDLGFBQWE7UUFBRSxhQUFhLEdBQUMsQ0FBQyxDQUFBO0lBR2xDLElBQUksSUFBQSx3QkFBZ0IsRUFBQyxJQUFJLENBQUM7V0FDdkIsSUFBQSwwQkFBa0IsRUFBQyxNQUFNLENBQUM7V0FDMUIsSUFBQSx1QkFBZSxFQUFDLGdCQUFnQixDQUFDLEVBQ25DO1FBQ0csTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxJQUFBLGFBQUssR0FBRSxDQUFDO1FBQ3hELE1BQU0sT0FBTyxHQUFHLG9CQUFZLENBQUMsY0FBYyxDQUFDLDBCQUFpQixDQUFDLENBQUM7UUFFL0QsTUFBTSxJQUFJLEdBQWlCO1lBQ3ZCLGtCQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUN6QixrQkFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7U0FDOUIsQ0FBQztRQUVGLElBQUcsSUFBSSxJQUFJLE9BQU8sRUFBQztZQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBWSxDQUFDLElBQUksc0JBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLGdCQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBO1NBQzVDO1FBRUQsS0FBSyxNQUFNLFFBQVEsSUFBSSxlQUFlLEVBQUM7WUFFbkMsNENBQTRDO1lBQzVDLG1EQUFtRDtTQUN0RDtRQUVELE1BQU0sSUFBSSxHQUFHLElBQUksa0NBQTBCLEVBQUU7YUFDNUMsV0FBVyxDQUFDLElBQUksd0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUNiLEtBQUssRUFBRSxDQUFDO1FBRVQsTUFBTSxFQUFFLEdBQUcsSUFBSSxtQkFBVyxDQUFDO1lBQ3ZCLElBQUk7WUFDSixRQUFRLEVBQUUsa0NBQXlCO1lBQ25DLFFBQVEsRUFBRSxJQUFJLGVBQU8sQ0FBQyxrQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFO1lBQzNCLEtBQUssRUFBRSxPQUFPO1lBQ2QsT0FBTyxFQUFFLHFCQUFZLENBQUMsY0FBSyxDQUFDO1NBQy9CLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBQSwwQkFBa0IsRUFBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztLQUMvRDtBQUNMLENBQUMsQ0FBQTtBQXBEWSxRQUFBLFNBQVMsYUFvRHJCO0FBR0QsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUVSLE1BQU0sSUFBQSxpQkFBUztJQUNYLG9CQUFvQixDQUFDLHVCQUFjLENBQUMsR0FBRztJQUN2QyxxQkFBcUIsQ0FBQyxXQUFXO0lBQ2pDLHFCQUFxQixDQUFDLFlBQVk7SUFDbEMscUJBQXFCLENBQUM7UUFDbEIsRUFBRTtLQUNMLENBQ0osQ0FBQztJQUVGLElBQUEsY0FBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1osQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7SUFDWCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLElBQUEsY0FBSSxFQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ1gsQ0FBQyxDQUFDLENBQUEifQ==