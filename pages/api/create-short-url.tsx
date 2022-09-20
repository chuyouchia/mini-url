import { NextApiRequest, NextApiResponse } from "next";
import { generateUniqueHashFromString } from "../../utils/generate-unique-hash";
import { Urls } from '@prisma/client'
import { prisma } from '../../db/prisma'
/**
 * Creates a shortened URL that is unique and inserts it into the database
 */
const createShortenedUrl = async (url: string): Promise<string> => {
    
    //run generate unique url until there is no matching ones
    while (true) {
        const urlHash = generateUniqueHashFromString(url)
        try {
            await prisma.urls.create({data: {url: url, hash: urlHash}});
            return urlHash;
        } catch (error) {
            // currently, do nothing - try until we get a valid url hash
            
            //TODO - maybe this should be thrown back as an error and limit server load
        }
    }
}

/**
 * checks if there is a URL in the db with the matching hash
 */
const findMatchingUrls = async (url: string): Promise<Urls | null> => {
    return await prisma.urls.findUnique({
        where: {
            url : url,
        }});
        
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        //if it isn't a post request, return not allowed
        res.status(405).json({ error: 'METHOD NOT ALLOWED' })
    }
    const { url } = req.body;

    // check if the original url exists as an entry in the DB
    const redirectUrl = await findMatchingUrls(url);
        
    if (!redirectUrl){
        const createdHash = await createShortenedUrl(url);
        //return that shortened url if created        
        res.status(200).json({ hash: createdHash })
    } else {
        // return the originally shortened url 
        res.status(200).json({ hash: redirectUrl?.hash })
    }

}
