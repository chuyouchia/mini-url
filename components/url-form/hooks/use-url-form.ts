
//manage the state of the url being passed

import { Urls } from "@prisma/client";
import { useEffect, useState } from "react";
import { CreateShortenedUrlProps } from "..";
import { isUrlValid } from "../../../utils/is-url-valid";

interface Props {
    getShortenedUrl: (props: CreateShortenedUrlProps) => Promise<Urls>;
}

export const useUrlForm = ({getShortenedUrl}: Props) => {

    const [baseUrl, setBaseUrl] = useState<string>('');

    useEffect(() => {
        // get the base url
        const { location } = window;
        setBaseUrl(location.origin);
    }, []);

    // exposes the on submit button
    const [urlToBeShortened, setUrlToBeShortened] = useState<string>('');
    const [shortenedUrl, setShortenedUrl] = useState<string>();

    const [urlFormErrorMessage, setUrlFormErrorMessage] = useState<string>('');

    const [isLoadingShortenedUrl, setIsLoadingShortenedUrl] = useState<boolean>();
    
    const [inputNumber, setInputNumber] = useState<number>();

    const onSubmitUrl = async () => {
        setIsLoadingShortenedUrl(true);
        //validate if its a url
        if (isUrlValid(urlToBeShortened)){
            const json = await getShortenedUrl({urlToBeShortened, numOfUses: inputNumber});
            setIsLoadingShortenedUrl(false);
            setShortenedUrl(`${baseUrl}/${json.hash}`);
            setUrlFormErrorMessage('');
        } else {
            setIsLoadingShortenedUrl(false);
            //show error message
            setUrlFormErrorMessage('Not a valid url!')
            setShortenedUrl('')
        }
        
    }

    return {
        shortenedUrl,
        isLoadingShortenedUrl,
        urlFormErrorMessage,
        urlToBeShortened,
        setInputNumber,
        setUrlToBeShortened,
        onSubmitUrl
    }
}
