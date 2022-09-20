import { generateUniqueHashFromString } from "./generate-unique-hash";
import { Urls } from '@prisma/client'
import { prisma } from '../db/prisma'
/**
 * Creates a shortened URL that is unique and inserts it into the database
 */
export const createShortUrl = async (url: string): Promise<Urls> => {
    
    //run generate unique url until there is no matching ones
    while (true) {
        let urlHash = generateUniqueHashFromString(url)
        try {
            const val = await prisma.urls.create({data: {url: url, hash: urlHash}});
            return val;
        } catch (error) {
            // currently, do nothing - try until we get a valid url hash
            
            //TODO - maybe this shuld be thrown back as an error and limit server load
        }
    }
}

