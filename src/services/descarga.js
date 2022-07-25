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
    return await fetch("http://localhost:3000/dev/extraccion-grabaciones/apisample", requestOptions).then(response => response.json());
    
}