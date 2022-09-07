
const API = "https://youtube-v31.p.rapidapi.com/search?channelId=UC5xfbRQ_7d70RVIv_LdjyyA&part=snippet%2Cid&order=date&maxResults=5";

const content = null || document.getElementById("content");

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '7e5a9fca8dmsh8531163f7b3dbf3p18fec7jsn0dc35b30244b',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

//Esto era una promesa que borramos
/*fetch('', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));*/

//Crearemos una funcion implementando away

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    //ahora transformaremos la info
    //nos entrega el objeto, el cual podemos iterar
    const data = await response.json();
    return data;
}

//Cremos una función que se invoca a si misma
//Para poder ejecturar la funcion fetchData
//Todas las consecuencias de la logica seran desencadenada

//So, creamos una funcion anonima, con estructura de 
//arrow function
(async () => {
    try {
        const videos = await fetchData(API);
        //creamos un template del HTML
        let view = `
        ${videos.items.map(video =>
            `<div class="group relative">
        <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                House of Dragons
                ${video.snippet.title}
            </h3>
        </div>
    </div>
    `).slice(0, 4).join('')}
    `;

        content.innerHTML = view;

    }
    catch (error) {
        console.log(error);
    }
})();
