import { IAddress } from '@elrondnetwork/erdjs';
import { BridgeAddress } from './consts';
export declare const setSpecialRolesEsdt: (ticker: string, address: BridgeAddress | IAddress, specialRoles: string[]) => Promise<void>;
