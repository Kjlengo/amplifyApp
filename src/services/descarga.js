export const descargaService = {
    create
};

async function create(argumento){

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(argumento)
    };

    // cambiar url por la de apigateway
    return await fetch("http://localhost:8090/api/productos", requestOptions).then(response => response.json())
    
}