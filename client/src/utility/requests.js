

export async function getRequest(url) {
    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`HTTP error, get request failed, ${response.status}`);
        } else {
            return response.json();
        }
    } catch(error) {
        console.error(`Error, ${error}`);
    }
}