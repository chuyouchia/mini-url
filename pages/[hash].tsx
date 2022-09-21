import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { prisma } from '../db/prisma'
interface Props {
    redirectUrl: string | null;
}


//redirect
export default function RedirectUrl(props: Props) {
    const { redirectUrl } = props;
    const router = useRouter();


    //window is not defined on pre-render, need to wait for the component to mount on the client
    useEffect(() => {
        if (redirectUrl) {
            window.location.href = redirectUrl;
        } else {
            router.push('/page-not-found');
        }
    }, [router,redirectUrl]);

    return null;
}

export const getServerSideProps = async (context:any) => {
    //get hash from the route passed
    const { hash } = context.params;
    if (hash) {
        return {
            props: { redirectUrl: null },
        }
    }
    
    // get the url from the server using the hash
    const redirectUrl = await prisma.urls.findUnique({
        where: {
            hash : hash as string,
        },
    })
    
    return {
        props: { redirectUrl: redirectUrl?.url },
    }
}
