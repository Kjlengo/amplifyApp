export const descargaService = {
    create
};

async function create(descarga){

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(descarga)
    };

    // cambiar url por la de apigateway
    return await fetch("https://iby7ue3i58.execute-api.eu-west-1.amazonaws.com/create-extraction", requestOptions).then(response => response.json());
    
}