import { getZapatillas } from "./peticiones/getZapatillas.js";

const enviarDatos = ( nombre, descripcion, precio, foto, disponible) => {
    const rutaArchivoHTML = "../zapatillas.html";

    fetch(rutaArchivoHTML)
        .then((response) => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo HTML");
            }
            return response.text();
        })
        .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            doc.getElementById("imagePage").src = foto;
            doc.getElementById("imagePage").alt = `Nombre de imagen: ${nombre}`;
            doc.getElementById("namePage").textContent = `${nombre}`;
            doc.getElementById("descriptionPage").textContent = `Descripción: ${descripcion}`;
            doc.getElementById("pricePage").textContent = `Precio: ${precio}`;
            doc.getElementById("availablePage").textContent = `Disponible: ${disponible}`;

            const agregarCarritoBtn = doc.querySelector(".agregar-carrito");
            agregarCarritoBtn.dataset.nombre = nombre;
            agregarCarritoBtn.dataset.precio = precio;

            const nuevoHTML = new XMLSerializer().serializeToString(doc);
            document.body.innerHTML = nuevoHTML;
        })
        .catch((error) => console.error(`Error al cargar el archivo HTML: ${error}`));
}

const createCards = (zapatillas) => {
    let zapatillasRow = document.getElementById('zapatillasRow');

    zapatillas.zapatillas.map((zapatilla) => {
        // console.log(zapatilla);

        const {  nombre, descripcion, precio, foto, disponible } = zapatilla;

        const divCol = document.createElement("div");
        divCol.classList.add("col-xl-3", "col-lg-3", "col-md-3", "col-sm-12", "col-xs-12", "mt-2", "mb-2");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = foto;
        img.alt = `Nombre de imagen: ${nombre}`;

        const divBody = document.createElement("div");
        divBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = `${nombre}`;

        const price = document.createElement("p");
        price.classList.add("card-text");
        price.textContent = `Precio: $${precio}`;

        const availability = document.createElement("p");
        availability.classList.add("card-text");
        availability.textContent = `Disponible: ${disponible}`;

        const btnVer = document.createElement("button");
        btnVer.classList.add("btn", "btn-success");
        btnVer.textContent = "Ver detalles";

        btnVer.addEventListener("click", () => {
            enviarDatos(  nombre, descripcion, precio, foto, disponible);
        });

    
        divCol.appendChild(card);

        divBody.appendChild(title);
        divBody.appendChild(price);
        divBody.appendChild(availability);
        divBody.appendChild(btnVer);

        card.appendChild(img);
        card.appendChild(divBody);

        

        zapatillasRow.appendChild(divCol);
    });
}

const createCarousel = (zapatillas) => {
    const carouselInner = document.querySelector('#carouselContainer .carousel-inner');
    const zapatillasToShow = zapatillas.zapatillas.slice(0, 9); // Obtener los primeros 9 productos

    const zapatillasChunks = chunkArray(zapatillasToShow, 3); // Función auxiliar para dividir el array de zapatillas en grupos de 3

    zapatillasChunks.forEach((chunk, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
            carouselItem.classList.add('active');
        }

        const row = document.createElement('div');
        row.classList.add('row');

        chunk.forEach(zapatilla => {
            const { nombre, descripcion, precio, foto, disponible } = zapatilla;

            const col = document.createElement('div');
            col.classList.add('col-md-4');

            const card = document.createElement('div');
            card.classList.add('card', 'w-100');

            const img = document.createElement('img');
            img.classList.add('card-img-top');
            img.src = foto;
            img.alt = `Nombre de imagen: ${nombre}`;

            const divBody = document.createElement('div');
            divBody.classList.add('card-body');

            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = `${nombre}`;

            const price = document.createElement('p');
            price.classList.add('card-text');
            price.textContent = `Precio: ${precio}`;

            const availability = document.createElement('p');
            availability.classList.add('card-text');
            availability.textContent = `Disponible: ${disponible}`;

            const btnVer = document.createElement('button');
            btnVer.classList.add('btn', 'btn-success');
            btnVer.textContent = 'Ver detalles';
            btnVer.addEventListener('click', () => {
                enviarDatos(nombre, descripcion, precio, foto, disponible);
            });

            divBody.appendChild(title);
            divBody.appendChild(price);
            divBody.appendChild(availability);
            divBody.appendChild(btnVer);

            card.appendChild(img);
            card.appendChild(divBody);
            col.appendChild(card);
            row.appendChild(col);
        });

        carouselItem.appendChild(row);
        carouselInner.appendChild(carouselItem);
    });
};

// Función auxiliar para dividir el array en grupos de tamaño específico
function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}


getZapatillas()
    .then(zapatillas => {
        if (zapatillas) {
            console.log(zapatillas);
            createCards(zapatillas);
            createCarousel(zapatillas);
        } else {
            console.error("No se obtuvieron datos");
        }
    })
    .catch((error) => console.log(`Error al obtener las zapatillas: ${error}`));