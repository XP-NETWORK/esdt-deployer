"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSpecialRolesEsdt = void 0;
const process_1 = require("process");
const erdjs_1 = require("@elrondnetwork/erdjs");
const consts_1 = require("./consts");
const utils_1 = require("./utils");
const setSpecialRolesEsdt = async (ticker, address, specialRoles) => {
    const { signer, userAccount, provider } = await (0, utils_1.setup)();
    let addr;
    try {
        if (typeof (address) == typeof consts_1.BridgeAddress) {
            const a = address;
            addr = new erdjs_1.AddressValue(new erdjs_1.Address(a.trim()));
        }
        else {
            addr = new erdjs_1.AddressValue(address);
        }
    }
    catch (e) {
        addr = new erdjs_1.AddressValue(address);
    }
    const args = [
        erdjs_1.BytesValue.fromUTF8(ticker),
        addr,
    ];
    for (const role of specialRoles) {
        args.push(erdjs_1.BytesValue.fromUTF8(role));
    }
    ;
    const data = new erdjs_1.ContractCallPayloadBuilder()
        .setFunction(new erdjs_1.ContractFunction('setSpecialRole'))
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
exports.setSpecialRolesEsdt = setSpecialRolesEsdt;
(async () => {
    const { signer } = await (0, utils_1.setup)();
    // Comment out the unrequired roles
    const ftSpecialRoles = [
        consts_1.esdtTokenSpecialRoles.ESDTRoleLocalBurn,
        consts_1.esdtTokenSpecialRoles.ESDTRoleLocalMint
    ];
    const nftSpecialRoles = [
        consts_1.nftTokenSpecialRoles.ESDTRoleNFTCreate,
        consts_1.nftTokenSpecialRoles.ESDTRoleNFTBurn,
        consts_1.nftTokenSpecialRoles.ESDTTransferRole,
        consts_1.nftTokenSpecialRoles.ESDTRoleNFTUpdateAttributes
    ];
    const sftSpecialRoles = [
        consts_1.sftTokenSpecialRoles.ESDTRoleNFTAddQuantity,
        consts_1.sftTokenSpecialRoles.ESDTRoleNFTBurn,
        consts_1.sftTokenSpecialRoles.ESDTRoleNFTCreate,
        consts_1.sftTokenSpecialRoles.ESDTTransferRole
    ];
    // Select one of the above
    const ROLES = nftSpecialRoles;
    const ticker = "TLANDCHEST-112199";
    const contract = consts_1.BridgeAddress.devnet;
    await (0, exports.setSpecialRolesEsdt)(
    /* Token Ticker */ ticker, 
    /* Role Address */ signer.getAddress(), //contract, // brdge
    /* Roles */ ROLES);
    // await transferOwnershipEsdt(
    //     /* Token Ticker */ ticker,
    //     /* Role Address */ contract
    // );
    (0, process_1.exit)(0);
})().catch(e => {
    console.error(e);
    (0, process_1.exit)(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm9sZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQStCO0FBRS9CLGdEQVM4QjtBQUU5QixxQ0FXa0I7QUFFbEIsbUNBR2lCO0FBSVYsTUFBTSxtQkFBbUIsR0FBRyxLQUFLLEVBQ3BDLE1BQWMsRUFDZCxPQUErQixFQUMvQixZQUFzQixFQUN4QixFQUFFO0lBRUEsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxJQUFBLGFBQUssR0FBRSxDQUFDO0lBRXhELElBQUksSUFBaUIsQ0FBQztJQUV0QixJQUFHO1FBQ0MsSUFBRyxPQUFNLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxzQkFBYSxFQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxHQUFrQixPQUF3QixDQUFDO1lBQ2xELElBQUksR0FBRyxJQUFJLG9CQUFZLENBQUMsSUFBSSxlQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtTQUNqRDthQUFJO1lBQ0QsSUFBSSxHQUFHLElBQUksb0JBQVksQ0FBQyxPQUFtQixDQUFDLENBQUM7U0FDaEQ7S0FDSjtJQUFBLE9BQU0sQ0FBQyxFQUFDO1FBQ0wsSUFBSSxHQUFHLElBQUksb0JBQVksQ0FBQyxPQUFtQixDQUFDLENBQUM7S0FDaEQ7SUFFRCxNQUFNLElBQUksR0FBaUI7UUFDdkIsa0JBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUk7S0FDUCxDQUFDO0lBRUYsS0FBSyxNQUFNLElBQUksSUFBSSxZQUFZLEVBQUU7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3hDO0lBQUEsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksa0NBQTBCLEVBQUU7U0FDeEMsV0FBVyxDQUFDLElBQUksd0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUNuRCxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQ2IsS0FBSyxFQUFFLENBQUM7SUFFYixNQUFNLEVBQUUsR0FBRyxJQUFJLG1CQUFXLENBQUM7UUFDdkIsSUFBSTtRQUNKLFFBQVEsRUFBRSxrQ0FBeUI7UUFDbkMsUUFBUSxFQUFFLElBQUksZUFBTyxDQUFDLGtCQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUU7UUFDM0IsS0FBSyxFQUFFLENBQUM7UUFDUixPQUFPLEVBQUUscUJBQVksQ0FBQyxjQUFLLENBQUM7S0FDL0IsQ0FBQyxDQUFDO0lBRUgsTUFBTSxJQUFBLDBCQUFrQixFQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBRWhFLENBQUMsQ0FBQTtBQTlDWSxRQUFBLG1CQUFtQix1QkE4Qy9CO0FBRUQsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUVSLE1BQU0sRUFBRSxNQUFNLEVBQUMsR0FBRyxNQUFNLElBQUEsYUFBSyxHQUFFLENBQUM7SUFFaEMsbUNBQW1DO0lBQ25DLE1BQU0sY0FBYyxHQUFHO1FBQ25CLDhCQUFxQixDQUFDLGlCQUFpQjtRQUN2Qyw4QkFBcUIsQ0FBQyxpQkFBaUI7S0FDMUMsQ0FBQTtJQUVELE1BQU0sZUFBZSxHQUFHO1FBQ3BCLDZCQUFvQixDQUFDLGlCQUFpQjtRQUN0Qyw2QkFBb0IsQ0FBQyxlQUFlO1FBQ3BDLDZCQUFvQixDQUFDLGdCQUFnQjtRQUNyQyw2QkFBb0IsQ0FBQywyQkFBMkI7S0FDbkQsQ0FBQztJQUVGLE1BQU0sZUFBZSxHQUFHO1FBQ3BCLDZCQUFvQixDQUFDLHNCQUFzQjtRQUMzQyw2QkFBb0IsQ0FBQyxlQUFlO1FBQ3BDLDZCQUFvQixDQUFDLGlCQUFpQjtRQUN0Qyw2QkFBb0IsQ0FBQyxnQkFBZ0I7S0FDeEMsQ0FBQTtJQUVELDBCQUEwQjtJQUMxQixNQUFNLEtBQUssR0FBRyxlQUFlLENBQUM7SUFFOUIsTUFBTSxNQUFNLEdBQUcsbUJBQW1CLENBQUM7SUFDbkMsTUFBTSxRQUFRLEdBQUcsc0JBQWEsQ0FBQyxNQUFNLENBQUE7SUFFckMsTUFBTSxJQUFBLDJCQUFtQjtJQUNyQixrQkFBa0IsQ0FBQyxNQUFNO0lBQ3pCLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsRUFBRSxvQkFBb0I7SUFDNUQsV0FBVyxDQUFDLEtBQUssQ0FDcEIsQ0FBQztJQUVGLCtCQUErQjtJQUMvQixpQ0FBaUM7SUFDakMsa0NBQWtDO0lBQ2xDLEtBQUs7SUFFTCxJQUFBLGNBQUksRUFBQyxDQUFDLENBQUMsQ0FBQztBQUNaLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQixJQUFBLGNBQUksRUFBQyxDQUFDLENBQUMsQ0FBQTtBQUNYLENBQUMsQ0FBQyxDQUFBIn0=