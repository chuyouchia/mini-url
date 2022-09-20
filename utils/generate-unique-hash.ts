import { createHash } from "crypto";

export const generateUniqueHashFromString = (val: string): string => {
    return createHash('sha256').update(val).digest('hex').substring(0,8);
}
