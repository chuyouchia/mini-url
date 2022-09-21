
//manage the state of the url being passed

import { useState } from "react";
import { isUrlValid } from "../../../utils/is-url-valid";

export const useUrlForm = () => {
    // exposes the on submit button
    const [urlToBeShortened, setUrlToBeShortened] = useState<string>('');
    const [shortenedUrl, setShortenedUrl] = useState<string>();

    const [urlFormErrorMessage, setUrlFormErrorMessage] = useState<string>('');
    const onSubmitUrl = async () => {
        //validate if its a url
        if (isUrlValid(urlToBeShortened)){
            const value = await fetch('/api/create-short-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: urlToBeShortened }),
            });

            const json = await value.json();
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
