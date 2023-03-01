import fetch from 'node-fetch';

export const handler = async (event) => {
    // TODO implement
    const body = event.body;

    if (!body.image) {
        const response = {
            statusCode: 500,
            body: JSON.stringify('Incomplete request data'),
        };
        return response;
    }
    
    const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
            Authorization: `Token INSERT TOKEN HERE`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            version: '8ebda4c70b3ea2a2bf86e44595afb562a2cdf85525c620f1671a78113c9f325b',
            input: {
                'image': body.image,
                'prompt': ``,
                'model_type': "canny",
                'num_samples': "1",
                'image_resolution': "512",
                'ddim_steps': 20,
                'scale': 9,
                'seed': null,
                'eta': 0,
                'a_prompt': "best quality, extremely detailed",
                'n_prompt': "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
                'detect_resolution': 512,
                'low_threshold': 100,
                'high_threshold': 200,
                'bg_threshold': 0,
                'value_threshold': 0.1,
                'distance_threshold': 0.1,
            },
        }),
    });
    
    if (response.status !== 201) {
        const res = {
            statusCode: 200,
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