import { issueESDTTypes } from './consts';
export declare const issueESDT: (type: issueESDTTypes, name: string, ticker: string, tokenProperties: string[], initialSupply?: number | undefined, numberOfDecimals?: number | undefined) => Promise<void>;
