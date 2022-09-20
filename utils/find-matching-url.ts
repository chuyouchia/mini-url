import { Urls } from '@prisma/client'
import { prisma } from '../db/prisma'

/**
 * checks if there is a URL in the db with the matching hash
 */
export const findMatchingUrl = async (url: string) => {
    const val = await prisma.urls.findUnique({
        where: {
          url: url,
        }
    })
    return val
    
}
