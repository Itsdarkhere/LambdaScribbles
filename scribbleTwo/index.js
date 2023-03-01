import fetch from 'node-fetch';

export const handler = async (event) => {
    // TODO implement
    const id = event.queryStringParameters.image;

    if (!id) {
        const res = {
            statusCode: 500,
            body: JSON.stringify('No id included...'),
        };
        return res;
    }
    
    const response = await fetch("https://api.replicate.com/v1/predictions/" + id, {
        headers: {
            Authorization: `Token INSERT TOKEN HERE`,
            "Content-type": "application/json",
        },
    });

    if (response.status !== 200) {
        const res = {
            statusCode: 500,
            body: JSON.stringify({ detail: 'Something went wrong...'}),
        };
        return res;
    }

    const prediction = await response.json();
    const res = {
        statusCode: 201,
        body: JSON.stringify(prediction),
    };
    return res;
};