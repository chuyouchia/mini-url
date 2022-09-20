import { NextApiRequest, NextApiResponse } from "next";
import { generateUniqueHashFromString } from "../../utils/generate-unique-hash";

export const getUrlObjectFromUserInput = async (url: string) => {
    return await prisma.urls.findUnique({
      where: {
        url: url,
      }
    });
  }
  
  export const createUrlObject = async (url: string) => {
    // keep retrying prisma create until hash is unique
    while (true) {
      try {
        let hash = generateUniqueHashFromString(url);
        return await prisma.urls.create({
          data: {
            url: url,
            hash: hash,
          }
        });
      } catch (error) {
        // do nothing
      }
    }
  }
  
  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // guard clause against non post requests
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    // Get data from request
    const data = req.body;
    const { url } = data;
  
    // check if url already exists in db
    const existingUrlObject = await getUrlObjectFromUserInput(url);
  
    let returnedUrlObject = existingUrlObject;
  
    // if url doesn't exist in db, create unique hash and insert into db
    if (!existingUrlObject) {
      returnedUrlObject = await createUrlObject(url);
    }
  
    return res.status(200).json({
      shortUrlHash: returnedUrlObject?.hash,
    });
  }
