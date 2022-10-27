"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgeAddress = exports.issueESDTTypes = exports.specialOpertationsGasLimit = exports.commonBuiltInOpertationsGasLimit = exports.commonOpertationsGasLimit = exports.issueTokenPayment = exports.builtInSC = exports.sftTokenSpecialRoles = exports.nftTokenSpecialRoles = exports.esdtTokenSpecialRoles = exports.sftTokenProperties = exports.esdtTokenProperties = exports.elrondExplorer = exports.shortChainId = exports.publicApi = exports.chain = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const process_1 = require("process");
// Default id 'devnet'
exports.chain = process_1.env.NETWORK ? process_1.env.NETWORK : 'devnet';
// Default will be devnet, based on chain value, 
// if the local is chosen you can change the proxy host
exports.publicApi = {
    local: 'http://localhost:7950',
    testnet: 'https://testnet-api.elrond.com',
    devnet: 'https://devnet-api.elrond.com',
    mainnet: 'https://api.elrond.com',
};
exports.shortChainId = {
    testnet: 'T',
    devnet: 'D',
    mainnet: '1',
};
exports.elrondExplorer = {
    devnet: 'https://devnet-explorer.elrond.com',
    testnet: 'https://testnet-explorer.elrond.com',
    mainnet: 'https://explorer.elrond.com',
};
exports.esdtTokenProperties = [
    'canFreeze',
    'canWipe',
    'canPause',
    'canMint',
    'canBurn',
    'canChangeOwner',
    'canUpgrade',
    'canAddSpecialRoles', // the token manager can assign a specific role(s)
];
exports.sftTokenProperties = [
    'canFreeze',
    'canWipe',
    'canPause',
    'canTransferNFTCreateRole',
    'canChangeOwner',
    'canUpgrade',
    'canAddSpecialRoles',
];
// SPECIAL ROLES:
var esdtTokenSpecialRoles;
(function (esdtTokenSpecialRoles) {
    esdtTokenSpecialRoles["ESDTRoleLocalBurn"] = "ESDTRoleLocalBurn";
    esdtTokenSpecialRoles["ESDTRoleLocalMint"] = "ESDTRoleLocalMint";
})(esdtTokenSpecialRoles = exports.esdtTokenSpecialRoles || (exports.esdtTokenSpecialRoles = {}));
var nftTokenSpecialRoles;
(function (nftTokenSpecialRoles) {
    nftTokenSpecialRoles["ESDTRoleNFTCreate"] = "ESDTRoleNFTCreate";
    nftTokenSpecialRoles["ESDTRoleNFTBurn"] = "ESDTRoleNFTBurn";
    nftTokenSpecialRoles["ESDTTransferRole"] = "ESDTTransferRole";
    nftTokenSpecialRoles["ESDTRoleNFTAddURI"] = "ESDTRoleNFTAddURI";
    nftTokenSpecialRoles["ESDTRoleNFTUpdateAttributes"] = "ESDTRoleNFTUpdateAttributes";
})(nftTokenSpecialRoles = exports.nftTokenSpecialRoles || (exports.nftTokenSpecialRoles = {}));
var sftTokenSpecialRoles;
(function (sftTokenSpecialRoles) {
    sftTokenSpecialRoles["ESDTRoleNFTCreate"] = "ESDTRoleNFTCreate";
    sftTokenSpecialRoles["ESDTRoleNFTBurn"] = "ESDTRoleNFTBurn";
    sftTokenSpecialRoles["ESDTRoleNFTAddQuantity"] = "ESDTRoleNFTAddQuantity";
    sftTokenSpecialRoles["ESDTTransferRole"] = "ESDTTransferRole";
})(sftTokenSpecialRoles = exports.sftTokenSpecialRoles || (exports.sftTokenSpecialRoles = {}));
// Build in address for tokens operations
exports.builtInSC = 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u';
// Predefined one time payment for token issuance (EGLD amount)
exports.issueTokenPayment = '0.05';
exports.commonOpertationsGasLimit = 60000000;
exports.commonBuiltInOpertationsGasLimit = 6000000;
exports.specialOpertationsGasLimit = 300000;
var issueESDTTypes;
(function (issueESDTTypes) {
    issueESDTTypes["fungible"] = "issue";
    issueESDTTypes["NFT"] = "issueNonFungible";
    issueESDTTypes["SFT"] = "issueSemiFungible";
})(issueESDTTypes = exports.issueESDTTypes || (exports.issueESDTTypes = {}));
// XP.NETWORK Exclusive
var BridgeAddress;
(function (BridgeAddress) {
    BridgeAddress["devnet"] = "erd1qqqqqqqqqqqqqpgqy2nx5z4cpr90de4sga2v2yx62fph3lg8g6vskt0k2f";
    BridgeAddress["mainnet"] = "erd1qqqqqqqqqqqqqpgq3y98dyjdp72lwzvd35yt4f9ua2a3n70v0drsfycvu8";
})(BridgeAddress = exports.BridgeAddress || (exports.BridgeAddress = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBZ0M7QUFBQyxJQUFBLGVBQU0sR0FBRSxDQUFDO0FBQzFDLHFDQUE4QjtBQVE5QixzQkFBc0I7QUFDVCxRQUFBLEtBQUssR0FBRyxhQUFHLENBQUMsT0FBUSxDQUFDLENBQUMsQ0FBQyxhQUFHLENBQUMsT0FBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7QUFFNUQsaURBQWlEO0FBQ2pELHVEQUF1RDtBQUMxQyxRQUFBLFNBQVMsR0FBa0I7SUFDcEMsS0FBSyxFQUFFLHVCQUF1QjtJQUM5QixPQUFPLEVBQUUsZ0NBQWdDO0lBQ3pDLE1BQU0sRUFBRSwrQkFBK0I7SUFDdkMsT0FBTyxFQUFFLHdCQUF3QjtDQUNwQyxDQUFDO0FBRVcsUUFBQSxZQUFZLEdBQWtCO0lBQ3ZDLE9BQU8sRUFBRSxHQUFHO0lBQ1osTUFBTSxFQUFFLEdBQUc7SUFDWCxPQUFPLEVBQUUsR0FBRztDQUNmLENBQUM7QUFFVyxRQUFBLGNBQWMsR0FBa0I7SUFDekMsTUFBTSxFQUFFLG9DQUFvQztJQUM1QyxPQUFPLEVBQUUscUNBQXFDO0lBQzlDLE9BQU8sRUFBRSw2QkFBNkI7Q0FDekMsQ0FBQztBQUlXLFFBQUEsbUJBQW1CLEdBQUc7SUFDL0IsV0FBVztJQUNYLFNBQVM7SUFDVCxVQUFVO0lBQ1YsU0FBUztJQUNULFNBQVM7SUFDVCxnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLG9CQUFvQixFQUFFLGtEQUFrRDtDQUMzRSxDQUFDO0FBRVcsUUFBQSxrQkFBa0IsR0FBRztJQUM5QixXQUFXO0lBQ1gsU0FBUztJQUNULFVBQVU7SUFDViwwQkFBMEI7SUFDMUIsZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixvQkFBb0I7Q0FDdkIsQ0FBQztBQUVGLGlCQUFpQjtBQUVqQixJQUFZLHFCQUdYO0FBSEQsV0FBWSxxQkFBcUI7SUFDN0IsZ0VBQXVDLENBQUE7SUFDdkMsZ0VBQXVDLENBQUE7QUFDM0MsQ0FBQyxFQUhXLHFCQUFxQixHQUFyQiw2QkFBcUIsS0FBckIsNkJBQXFCLFFBR2hDO0FBRUQsSUFBWSxvQkFNWDtBQU5ELFdBQVksb0JBQW9CO0lBQzVCLCtEQUF1QyxDQUFBO0lBQ3ZDLDJEQUFtQyxDQUFBO0lBQ25DLDZEQUFxQyxDQUFBO0lBQ3JDLCtEQUF1QyxDQUFBO0lBQ3ZDLG1GQUEyRCxDQUFBO0FBQy9ELENBQUMsRUFOVyxvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQU0vQjtBQUVELElBQVksb0JBS1g7QUFMRCxXQUFZLG9CQUFvQjtJQUM1QiwrREFBdUMsQ0FBQTtJQUN2QywyREFBbUMsQ0FBQTtJQUNuQyx5RUFBaUQsQ0FBQTtJQUNqRCw2REFBcUMsQ0FBQTtBQUN6QyxDQUFDLEVBTFcsb0JBQW9CLEdBQXBCLDRCQUFvQixLQUFwQiw0QkFBb0IsUUFLL0I7QUFXRCx5Q0FBeUM7QUFDNUIsUUFBQSxTQUFTLEdBQ2xCLGdFQUFnRSxDQUFDO0FBRXJFLCtEQUErRDtBQUNsRCxRQUFBLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztBQUUzQixRQUFBLHlCQUF5QixHQUFHLFFBQVUsQ0FBQztBQUN2QyxRQUFBLGdDQUFnQyxHQUFHLE9BQVMsQ0FBQztBQUM3QyxRQUFBLDBCQUEwQixHQUFHLE1BQVEsQ0FBQztBQUVuRCxJQUFZLGNBSVg7QUFKRCxXQUFZLGNBQWM7SUFDdEIsb0NBQWtCLENBQUE7SUFDbEIsMENBQXdCLENBQUE7SUFDeEIsMkNBQXlCLENBQUE7QUFDN0IsQ0FBQyxFQUpXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBSXpCO0FBRUQsdUJBQXVCO0FBQ3ZCLElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUNyQiwwRkFBeUUsQ0FBQTtJQUN6RSwyRkFBMEUsQ0FBQTtBQUM5RSxDQUFDLEVBSFcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFHeEIifQ==