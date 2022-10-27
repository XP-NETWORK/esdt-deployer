"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const erdjs_1 = require("@elrondnetwork/erdjs");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const bech32ToHex = (inputValue) => {
    if (inputValue.length !== 62) {
        console.log("You've provided wrong bech32, try again.");
        (0, process_1.exit)(9);
    }
    const account = erdjs_1.Address.fromBech32(inputValue);
    console.log('\nBech32 to Hex result:');
    console.log(`${account.hex()}\n`);
};
const hexToBech32 = (inputValue) => {
    if (inputValue.length !== 64) {
        console.log("You've provided wrong hex address, try again.");
        (0, process_1.exit)(9);
    }
    const account = erdjs_1.Address.fromHex(inputValue);
    console.log('\nHex address to Bech32 result:');
    console.log(`${account.bech32()}\n`);
};
const decimalToHex = (inputValue) => {
    const bigNumberVal = new bignumber_js_1.default(inputValue, 10);
    let bigNumberString = bigNumberVal.toString(16);
    if (bigNumberString.length % 2 !== 0) {
        bigNumberString = `0${bigNumberString}`;
    }
    console.log('\nDecimal to hex result:');
    console.log(`${bigNumberString}\n`);
};
const hexToDecimal = (inputValue) => {
    const bigNumber = new bignumber_js_1.default(inputValue, 16);
    console.log('\nHex to decimal result:');
    console.log(`${bigNumber.toString(10)}\n`);
};
const decimalToBase64 = (inputValue) => {
    const buff = Buffer.from(inputValue, 'ascii');
    console.log('\nDecimal to base64 result:');
    console.log(`${buff.toString('base64')}\n`);
};
const base64ToDecimal = (inputValue) => {
    const buff = Buffer.from(inputValue, 'base64');
    console.log('\nBase64 to decimal result:');
    console.log(`${buff.toString('ascii')}\n`);
};
const stringToHex = (inputValue) => {
    const hexString = Buffer.from(inputValue, 'ascii').toString('hex');
    console.log('\nString to hex result:');
    console.log(`${hexString}\n`);
};
const hexToString = (inputValue) => {
    const stringValue = Buffer.from(inputValue, 'hex').toString('utf8');
    console.log('\nHex to string result:');
    console.log(`${stringValue}\n`);
};
const stringToBase64 = (inputValue) => {
    const base64Value = Buffer.from(inputValue, 'ascii').toString('base64');
    console.log('\nString to base64 string result:');
    console.log(`${base64Value}\n`);
};
const base64ToString = (inputValue) => {
    const stringValue = Buffer.from(inputValue, 'base64').toString('ascii');
    console.log('\nString to base64 string result:');
    console.log(`${stringValue}\n`);
};
const hexToBase64 = (inputValue) => {
    const hexValue = Buffer.from(inputValue, 'hex');
    console.log('\nHex to base64 string result:');
    console.log(`${hexValue.toString('base64')}\n`);
};
const base64ToHex = (inputValue) => {
    const base64Value = Buffer.from(inputValue, 'base64');
    console.log('\nBase64 to hex string result:');
    console.log(`${base64Value.toString('hex')}\n`);
};
// const amountToDenominated = (inputValue: string) => {
//     const balance = TokenPayment.egldFromAmount(inputValue);
//     console.log('\nEGLD amount to denominated amount result:');
//     console.log(`${balance.toString()}\n`);
// };
// const denominatedToAmount = (inputValue: string) => {
//     const balance = TokenPayment.egldFromBigInteger(inputValue);
//     console.log('\nEGLD denominated amount to amount result:');
//     console.log(`${balance.toPrettyString()}\n`);
// };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb252ZXJ0ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQStCO0FBRS9CLGdEQUErQztBQUMvQyxnRUFBcUM7QUFFckMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxVQUFrQixFQUFFLEVBQUU7SUFDdkMsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRTtRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDeEQsSUFBQSxjQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7S0FDWDtJQUNELE1BQU0sT0FBTyxHQUFHLGVBQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFO0lBQ3ZDLElBQUksVUFBVSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1FBQzdELElBQUEsY0FBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ1g7SUFDRCxNQUFNLE9BQU8sR0FBRyxlQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUMvQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN6QyxDQUFDLENBQUM7QUFFRixNQUFNLFlBQVksR0FBRyxDQUFDLFVBQWtCLEVBQUUsRUFBRTtJQUN4QyxNQUFNLFlB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