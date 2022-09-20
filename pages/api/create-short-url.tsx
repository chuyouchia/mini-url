import { NextApiRequest, NextApiResponse } from "next";
import { createShortUrl } from "../../utils/create-short-url";
import { findMatchingUrl } from "../../utils/find-matching-url";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        //if it isn't a post request, return not allowed
        res.status(405).json({ error: 'METHOD NOT ALLOWED' })
    }
    const data = req.body;
    const { url } = data;

    // check if the original url exists as an entry in the DB
    const existingUrl = await findMatchingUrl(url);

    if (!existingUrl){
        const createdHash = await createShortUrl(url);
        //return that shortened url if created        
        return res.status(200).json({ url: createdHash.hash })
    } else {
        // return the originally shortened url 
        return res.status(200).json({ url: existingUrl.hash })
    }

}
