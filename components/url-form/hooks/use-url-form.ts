
//manage the state of the url being passed

import { Urls } from "@prisma/client";
import { useState } from "react";
import { isUrlValid } from "../../../utils/is-url-valid";

interface Props {
    getShortenedUrl: (url: string) => Promise<Urls>;
}

export const useUrlForm = ({getShortenedUrl}: Props) => {
    // exposes the on submit button
    const [urlToBeShortened, setUrlToBeShortened] = useState<string>('');
    const [shortenedUrl, setShortenedUrl] = useState<string>();

    const [urlFormErrorMessage, setUrlFormErrorMessage] = useState<string>('');
    
    const onSubmitUrl = async () => {
        //validate if its a url
        if (isUrlValid(urlToBeShortened)){
            const json = await getShortenedUrl(urlToBeShortened);
            setShortenedUrl(json.hash);
            setUrlFormErrorMessage('');
        } else {
            //show error message
            setUrlFormErrorMessage('Not a valid url!')
            setShortenedUrl('')
        }
        
    }

    return {
        shortenedUrl,
        urlFormErrorMessage,
        urlToBeShortened,
        setUrlToBeShortened,
        onSubmitUrl
    }
}
