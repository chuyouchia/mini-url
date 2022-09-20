import React from 'react';
import { useUrlForm } from './hooks/use-url-form';


export function UrlForm(): JSX.Element {
    const {shortenedUrl, setUrlToBeShortened, onSubmitUrl, urlFormErrorMessage} = useUrlForm();

    return (<form>
        <label >Input Long URL here:</label><br />
        <input type="text" onChange={(event) => setUrlToBeShortened(event.target.value)} /><br />
       { shortenedUrl && (<>
       <label >Shortened URL:</label><br />
        <text>
            {shortenedUrl}
            </text><br /></>)}
        { urlFormErrorMessage && (<>
            <label >Error: </label>
            <text>
                {urlFormErrorMessage}
            </text><br />
            </>)}
        <button type="button" onClick={onSubmitUrl}>Shorten it</button>
    </form>
    )
}
