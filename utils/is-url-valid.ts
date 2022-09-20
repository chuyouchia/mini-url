
export const isUrlValid = (url: string):boolean => {

    try {
        const newUrl = new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}
