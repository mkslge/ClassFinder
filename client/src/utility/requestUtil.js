

export async function getRequest(url) {
    try {
        const response = await fetch(url)
        if(!response.ok) {
            throw new Error(`HTTP error, get request failed, ${response.status}`);
        } else {
            return response.json();
        }
    } catch(error) {
        console.error(`Error, ${error}`);
    }
}

export async function postRequest(url) {
    try {
        const response = await fetch(url,
            {method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }

        ).then(response => response.json());
        return response;
    } catch(error) {
        console.error(`Error in postRequest, ${error}`)
    }
}