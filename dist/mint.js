"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintNFT = void 0;
const process_1 = require("process");
const erdjs_1 = require("@elrondnetwork/erdjs");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const consts_1 = require("./consts");
const utils_1 = require("./utils");
const mintNFT = async (ticker, supply, name, royalties, hash, attributes, uris) => {
    const { signer, userAccount, provider } = await (0, utils_1.setup)();
    const args = [
        erdjs_1.BytesValue.fromUTF8(ticker),
        new erdjs_1.BigUIntValue(new bignumber_js_1.default(supply))
    ];
    args.push(erdjs_1.BytesValue.fromUTF8(name));
    args.push(new erdjs_1.BigUIntValue(new bignumber_js_1.default(royalties)));
    args.push(erdjs_1.BytesValue.fromUTF8(hash));
    args.push(erdjs_1.BytesValue.fromUTF8(attributes));
    for (const item of uris) {
        args.push(erdjs_1.BytesValue.fromUTF8(item));
    }
    const data = new erdjs_1.ContractCallPayloadBuilder()
        .setFunction(new erdjs_1.ContractFunction('ESDTNFTCreate'))
        .setArgs(args)
        .build();
    const tx = new erdjs_1.Transaction({
        data,
        gasLimit: consts_1.specialOpertationsGasLimit * 20,
        receiver: userAccount.address,
        sender: signer.getAddress(),
        value: 0,
        chainID: consts_1.shortChainId[consts_1.chain],
    });
    await (0, utils_1.commonTxOperations)(tx, userAccount, signer, provider);
};
exports.mintNFT = mintNFT;
(async () => {
    await (0, exports.mintNFT)(
    //                  SFT                    NFT
    /* Ticker */ "TLANDCHEST-295de4", //"TLANDCHEST-112199",
    /* Supply */ 1731, 
    /* name */ 'Pontic Chest', 
    /* royalties */ 5 * 100, 
    /* hash */ '', 
    /* Attributes */ 'https://nft.ageofzalmoxis.com/ipfs/QmT1J6L5QztvLNHiBzfMnLf6MGpqvnDqVCmvx9eGLfkoru/SFT_Pontic.mp4', 
    /* uris */ ['https://nft.ageofzalmoxis.com/ipfs/QmT1J6L5QztvLNHiBzfMnLf6MGpqvnDqVCmvx9eGLfkoru/SFT_Pontic.mp4']);
    (0, process_1.exit)(0);
})().catch(e => {
    console.error(e);
    (0, process_1.exit)(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9taW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHFDQUErQjtBQUMvQixnREFPOEI7QUFFOUIsZ0VBQXFDO0FBRXJDLHFDQUlrQjtBQUNsQixtQ0FBb0Q7QUFFN0MsTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUN4QixNQUFhLEVBQ2IsTUFBYSxFQUNiLElBQVcsRUFDWCxTQUFnQixFQUNoQixJQUFXLEVBQ1gsVUFBaUIsRUFDakIsSUFBYyxFQUNoQixFQUFFO0lBRUEsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxJQUFBLGFBQUssR0FBRSxDQUFDO0lBRXhELE1BQU0sSUFBSSxHQUFpQjtRQUN2QixrQkFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDM0IsSUFBSSxvQkFBWSxDQUFDLElBQUksc0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN4QyxDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxvQkFBWSxDQUFDLElBQUksc0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUUxQyxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBQztRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDdEM7SUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLGtDQUEwQixFQUFFO1NBQzFDLFdBQVcsQ0FBQyxJQUFJLHdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ2xELE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDYixLQUFLLEVBQUUsQ0FBQztJQUVYLE1BQU0sRUFBRSxHQUFHLElBQUksbUJBQVcsQ0FBQztRQUN6QixJQUFJO1FBQ0osUUFBUSxFQUFFLG1DQUEwQixHQUFDLEVBQUU7UUFDdkMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxPQUFPO1FBQzdCLE1BQU0sRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFO1FBQzNCLEtBQUssRUFBRSxDQUFDO1FBQ1IsT0FBTyxFQUFFLHFCQUFZLENBQUMsY0FBSyxDQUFDO0tBQzdCLENBQUMsQ0FBQztJQUVILE1BQU0sSUFBQSwwQkFBa0IsRUFBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUVsRSxDQUFDLENBQUE7QUExQ1ksUUFBQSxPQUFPLFdBMENuQjtBQUVELENBQUMsS0FBSyxJQUFJLEVBQUU7SUFJUixNQUFNLElBQUEsZUFBTztJQUNULDhDQUE4QztJQUM5QyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsc0JBQXNCO0lBQ3hELFlBQVksQ0FBQyxJQUFJO0lBQ2pCLFVBQVUsQ0FBQyxjQUFjO0lBQ3pCLGVBQWUsQ0FBQyxDQUFDLEdBQUMsR0FBRztJQUNyQixVQUFVLENBQUMsRUFBRTtJQUNiLGdCQUFnQixDQUFDLGtHQUFrRztJQUNuSCxVQUFVLENBQUMsQ0FBQyxrR0FBa0csQ0FBQyxDQUNsSCxDQUFDO0lBRUYsSUFBQSxjQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDWixDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakIsSUFBQSxjQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUE7QUFDWCxDQUFDLENBQUMsQ0FBQSJ9