import { exit } from 'process';

import { Address } from '@elrondnetwork/erdjs';
import BigNumber from 'bignumber.js';

const bech32ToHex = (inputValue: string) => {
    if (inputValue.length !== 62) {
        console.log("You've provided wrong bech32, try again.");
        exit(9);
    }
    const account = Address.fromBech32(inputValue);
    console.log('\nBech32 to Hex result:');
    console.log(`${account.hex()}\n`);
};

const hexToBech32 = (inputValue: string) => {
    if (inputValue.length !== 64) {
        console.log("You've provided wrong hex address, try again.");
        exit(9);
    }
    const account = Address.fromHex(inputValue);
    console.log('\nHex address to Bech32 result:');
    console.log(`${account.bech32()}\n`);
};

export const decimalToHex = (inputValue: string) => {
    const bigNumberVal = new BigNumber(inputValue, 10);
    let bigNumberString = bigNumberVal.toString(16);
    if (bigNumberString.length % 2 !== 0) {
        bigNumberString = `0${bigNumberString}`;
    }
    return bigNumberString;
    // console.log('\nDecimal to hex result:');
    // console.log(`${bigNumberString}\n`);
};

const hexToDecimal = (inputValue: string) => {
    const bigNumber = new BigNumber(inputValue, 16);
    console.log('\nHex to decimal result:');
    console.log(`${bigNumber.toString(10)}\n`);
};

const decimalToBase64 = (inputValue: string) => {
    const buff = Buffer.from(inputValue, 'ascii');
    console.log('\nDecimal to base64 result:');
    console.log(`${buff.toString('base64')}\n`);
};

const base64ToDecimal = (inputValue: string) => {
    const buff = Buffer.from(inputValue, 'base64');
    console.log('\nBase64 to decimal result:');
    console.log(`${buff.toString('ascii')}\n`);
};

const stringToHex = (inputValue: string) => {
    const hexString = Buffer.from(inputValue, 'ascii').toString('hex');
    console.log('\nString to hex result:');
    console.log(`${hexString}\n`);
};

const hexToString = (inputValue: string) => {
    const stringValue = Buffer.from(inputValue, 'hex').toString('utf8');
    console.log('\nHex to string result:');
    console.log(`${stringValue}\n`);
};

const stringToBase64 = (inputValue: string) => {
    const base64Value = Buffer.from(inputValue, 'ascii').toString('base64');
    console.log('\nString to base64 string result:');
    console.log(`${base64Value}\n`);
};

const base64ToString = (inputValue: string) => {
    const stringValue = Buffer.from(inputValue, 'base64').toString('ascii');
    console.log('\nString to base64 string result:');
    console.log(`${stringValue}\n`);
};

const hexToBase64 = (inputValue: string) => {
    const hexValue = Buffer.from(inputValue, 'hex');
    console.log('\nHex to base64 string result:');
    console.log(`${hexValue.toString('base64')}\n`);
};

const base64ToHex = (inputValue: string) => {
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

