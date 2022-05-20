/* Array donde van a agregarse los items incorporados al carrito */
let carrito = [];


/* Listado de variables que se van a utilizar*/
let arrayCamisetas;
const divCamisetas = document.getElementById("camisetasPorJS");

let arrayBotines;
const divBotines = document.getElementById("botinesPorJS");

let arrayRopaDeportiva;
const divRopaDeportiva = document.getElementById("ropaDeportivaPorJS")

class Producto {
    constructor(id, nombreDelProducto, cantidad, precioUnitario, imagen, precioSumado) {
        this.id = id;
        this.nombreDelProducto = nombreDelProducto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.imagen = imagen;
        this.precioSumado = precioSumado;
    }
}

/* Listado de Productos: Camisetas */
const camisetaPSG = new Producto("42789", "Camiseta de PSG", 1, 10000, "../images/camisetasfutbol/camisetas_w416-min.jpg", 10000);
const camisetaBoca = new Producto("35432", "Camiseta de Boca", 1, 19999, "../images/CamisetasFutbol/CamisetaBoca-min.jpg", 19999);
const camisetaRiver = new Producto("12312", "Camiseta de River", 1, 18500, "../images/CamisetasFutbol/camisetaRiver-min.jpg", 18500);
const camisetaAcMilan = new Producto("22331", "Camiseta de Ac Milan", 1, 20500, "../images/CamisetasFutbol/acMilan-min.jpg", 20500);
const camisetaBarcelona = new Producto("34621", "Camiseta de Barcelona", 1, 21000, "../images/CamisetasFutbol/CamisetaBarcelona-min.jpg", 21000);
const camisetaChelsea = new Producto("77539", "Camiseta de Chelsea", 1, 17999, "../images/CamisetasFutbol/CamisetaChelsea-min.jpg", 17999);

/* Array de Camisetas */
const listadoDeCamisetas = [];
listadoDeCamisetas.push(camisetaPSG, camisetaBoca, camisetaRiver, camisetaAcMilan, camisetaBarcelona, camisetaChelsea);

/* Listado de Productos: Botines */
const adidasPredator = new Producto("B33998", "Botines Adidas Predator", 1, 24999, "../images/Botines/D_NQ_NP_878913-MLA47274918565_082021-O-min.jpg", 24999)
const adidasMutator = new Producto("B34560", "Botines Adidas Mutator", 1, 27500, "../images/Botines/PREDATOR_MUTATOR_20-min.jpg", 27500)
const pumaFutureZ4 = new Producto("B86332", "Botines Puma Future Z4", 1, 21999, "../images/Botines/PumaFutureZ4.1-min.jpg", 21999)
const nikePhantomGT2 = new Producto("B71223", "Botines Nike Phantom GT2", 1, 29999, "../images/Botines/nike-botas-futbol-phantom-gt2-academy-df-fg-mg-min.jpg", 29999)
const nikePhantomVision = new Producto("B79923", "Botines Nike Phantom Vision", 1, 31999, "../images/Botines/NikePhantomVision2Pro-min.jpg", 31999)

/* Array de Botines */

const listadoDeBotines = [];
listadoDeBotines.push(adidasPredator, adidasMutator, pumaFutureZ4, nikePhantomGT2, nikePhantomVision);

/* Listado de Productos: Ropa Deportiva */

const conjuntoPuma = new Producto("R88321", "Conjunto Deportivo Puma Negro y Gris", 1, 19999, "../images/conjuntosdeportivos/Sweater-negro-min.jpg", 19999)
const conjuntoTopper = new Producto("R55329", "Conjunto Deportivo Topper Negro", 1, 22999, "../images/ConjuntosDeportivos/5a969fb350110-447679-500x500-min.jpg", 22999)
const conjuntoAdidas = new Producto("R00985", "Conjunto Deportivo Adidas Negro", 1, 24999, "../images/ConjuntosDeportivos/Conjunto_Deportivo_3_Tiras_Negro_DV2448_01_laydown-min.jpg", 24999)

/* Array de Ropa Deportiva */
const listadoDeRopaDeportiva = [];
listadoDeRopaDeportiva.push(conjuntoPuma, conjuntoTopper, conjuntoAdidas);

/* Funciones Importantes: 
Esta funcion se encarga de recibir el evento click del boton de cada uno de los productos.
Tenemos un acumulador que al llegar a 1 (es decir, al hacer click una sola vez) va a pushear el producto al carro
Y luego de hacerle click, el boton se le cambiara el texto y el estilo del mismo. 
Esta funcion va a ser utilizada en todos los productos.*/

function eventoClickProductos(acumulador, botonDelProducto, elementoQuePushea) {
    botonDelProducto.onclick = () => {
        acumulador++
        if (acumulador == 1) {
            if (carrito.includes(elementoQuePushea)) {
                botonDelProducto.innerHTML = 'El producto esta agregado!'
                botonDelProducto.classList.add = 'botonAgregadoAlcarrito'
            } else {
                carrito.push(elementoQuePushea)
                console.log(carrito);
                botonDelProducto.innerHTML = 'El producto ha sido agregado al carrito'
                botonDelProducto.classList = 'botonAgregadoAlcarrito'
                storageDeProductos(carrito);
                Toastify({
                    text: "Producto agregado al carrito!",
                    duration: 3000,
                    style: {
                        background: "linear-gradient(90deg,#000000 0%, #f50ca0 40%, #43dde2 80%)"
                    }
                }).showToast();
            }
        }
    }
}

/* Esta funcion lo que hace es guardar en el local storage todos los productos que se vayan ingresando al carro*/
function storageDeProductos(listadoDeProductos) {
    localStorage.setItem('guardarCarrito', JSON.stringify(listadoDeProductos));
}




/* Inicio del Programa Principal */

pedirDatosAlServidor()

/* Funcion asincronica que pide listado de productos almacenados en un json.*/
async function pedirDatosAlServidor() {
    const productoFetch = await fetch("http://127.0.0.1:5500/assets/data/productosListado.json")
    const dato = await productoFetch.json()
    arrayCamisetas = dato[0];
    arrayBotines = dato[1];
    arrayRopaDeportiva = dato[2]
    crearProductos(arrayCamisetas, divCamisetas)
    eventosCamisetas()
    crearProductos(arrayBotines, divBotines)
    eventosBotines()
    crearProductos(arrayRopaDeportiva, divRopaDeportiva)
    eventosRopaDeportiva()
}

/* Funcion que acumula todos los eventos de las distintas camisetas */
function eventosCamisetas() {
    /* Evento 1 = Camiseta de PSG */
    let psg = 0;
    const botonPSG = document.getElementById("agregarPSG");
    eventoClickProductos(psg, botonPSG, camisetaPSG);

    /* Evento 2 = Camiseta de Boca */
    let boca = 0;
    const botonBoca = document.getElementById("agregarBoca");
    eventoClickProductos(boca, botonBoca, camisetaBoca)

    /* Evento 3 = Camiseta de River */
    let river = 0;
    const botonRiver = document.getElementById("agregarRiver");
    eventoClickProductos(river, botonRiver, camisetaRiver)

    /* Evento 4 = Camiseta Ac Milan */
    let milan = 0;
    const botonMilan = document.getElementById("agregarMilan")
    eventoClickProductos(milan, botonMilan, camisetaAcMilan)

    /* Evento 5 = Camiseta Barcelona */
    let barcelona = 0;
    const botonBarcelona = document.getElementById("agregarBarcelona");
    eventoClickProductos(barcelona, botonBarcelona, camisetaBarcelona);

    /* Evento 6 = Camiseta Chelsea */
    let chelsea = 0;
    const botonChelsea = document.getElementById("agregarChelsea");
    eventoClickProductos(chelsea, botonChelsea, camisetaChelsea);

    /* ordenar Mayor */
    const ordenarCamisetasMayor = document.getElementById("ordenarCamisetasCreciente");
    ordenarCamisetasMayor.onclick = () => {
        ordenarProductosMayorAMenor(arrayCamisetas, divCamisetas, eventosCamisetas)
    }

    /* Ordenar Menor */
    const ordenarCamisetasMenor = document.getElementById("ordenarCamisetasDecreciente");
    ordenarCamisetasMenor.onclick = () => {
        ordenarProductosMenorAMayor(arrayCamisetas, divCamisetas, eventosCamisetas)
    }
}

/* Funcion que acumula todos los eventos de los botines*/

function eventosBotines() {
    /* Evento 7 = Botines Adidas Predator */
    let predator = 0;
    const botonPredator = document.getElementById("agregarPredator");
    eventoClickProductos(predator, botonPredator, adidasPredator);

    /* Evento 8 = Botines Adidas Mutator */
    let mutator = 0;
    const botonMutator = document.getElementById("agregarMutator");
    eventoClickProductos(mutator, botonMutator, adidasMutator);

    /* Evento 9 = Botines Future z4 */
    let futureZ4 = 0;
    const botonFuture = document.getElementById("agregarFutureZ4");
    eventoClickProductos(futureZ4, botonFuture, pumaFutureZ4);

    /* Evento 10 = Botines PhantomGT2 */
    let phantomGT2 = 0;
    const botonPhantomGT2 = document.getElementById("agregarPhantomGT2");
    eventoClickProductos(phantomGT2, botonPhantomGT2, nikePhantomGT2);

    /* Evento 11 = Botines PhantomVision */
    let phantomVision = 0;
    const botonPhanthomVision = document.getElementById("agregarPhantomVision");
    eventoClickProductos(phantomVision, botonPhanthomVision, nikePhantomVision);

    /* Evento Boton Ordenar Mayor */
    const ordenarBotinesMayor = document.getElementById("ordenarBotinesCreciente");
    ordenarBotinesMayor.onclick = () => {
        ordenarProductosMayorAMenor(arrayBotines, divBotines, eventosBotines)
    }

    /* Evento Boton Ordenar Menor */
    const ordenarBotinesMenor = document.getElementById("ordenarBotinesDecreciente");
    ordenarBotinesMenor.onclick = () => {
        ordenarProductosMenorAMayor(arrayBotines, divBotines, eventosBotines)
    }
}

/* Funcion que acumula todos los eventos de la ropa deportiva*/

function eventosRopaDeportiva() {
    /* Evento 12 = Conjunto Deportivo Puma */
    let conjuntoPumaNegro = 0;
    const botonConjuntoPuma = document.getElementById("agregarConjuntoPuma");
    eventoClickProductos(conjuntoPumaNegro, botonConjuntoPuma, conjuntoPuma);

    /* Evento 13 = Conjunto Deportivo Topper */
    let conjuntoTopperNegro = 0;
    const botonConjuntoTopper = document.getElementById("agregarConjuntoTopper");
    eventoClickProductos(conjuntoTopperNegro, botonConjuntoTopper, conjuntoTopper);

    /* Evento 14 = Conjunto Deportivo Adidas */
    let conjuntoAdidasNegro = 0;
    const botonConjuntoAdidas = document.getElementById("agregarConjuntoAdidas");
    eventoClickProductos(conjuntoAdidasNegro, botonConjuntoAdidas, conjuntoAdidas);

    /* Evento Boton Ordenar Mayor */
    const ordenarRopaDeportivaMayor = document.getElementById("ordenarRopaDeportivaCreciente");
    ordenarRopaDeportivaMayor.onclick = () => {
        ordenarProductosMayorAMenor(arrayRopaDeportiva, divRopaDeportiva, eventosRopaDeportiva)
    }
    /* Evento Boton Ordenar Menor */
    const ordenarRopaDeportivaMenor = document.getElementById("ordenarRopaDeportivaDecreciente")
    ordenarRopaDeportivaMenor.onclick = () => {
        ordenarProductosMayorAMenor(arrayRopaDeportiva, divRopaDeportiva, eventosRopaDeportiva)
    }
}

/* Funcion que ordena los productos segun el precio de Mayor a Menor y Menor a Mayor respectivamente*/

function ordenarProductosMayorAMenor(arrayDelProducto, divContenedorDelProducto, eventoProducto) {
    arrayDelProducto.sort((a, b) => b.precio - a.precio)
    console.log(arrayDelProducto)
    limpiar(divContenedorDelProducto)
    crearProductos(arrayDelProducto, divContenedorDelProducto)
    eventoProducto()
}

function ordenarProductosMenorAMayor(arrayDelProducto, divContenedorDelProducto, eventoProducto) {
    arrayDelProducto.sort((a, b) => a.precio - b.precio)
    console.log(arrayDelProducto)
    limpiar(divContenedorDelProducto)
    crearProductos(arrayDelProducto, divContenedorDelProducto)
    eventoProducto()
}

/* Funcion que vacia el contenedor de los productos para que posteriormente se vuelvan a crear*/

function limpiar(contenedorProductos) {
    contenedorProductos.innerHTML = "";
}

/* Funcion que crea los productos. Toma el array que se obtiene del fetch y con un forEach crea los productos*/
function crearProductos(arrayProducto, contenedorProductos) {
    arrayProducto.forEach(element => {
        contenedorProductos.innerHTML +=
            `
        <div class="col">
            <div class="${element.classContenedorDiv}">
                <img src="${element.imagenDelProducto}" class="card-img-top" alt="${element.alt}">
                <div class="card-body alMedio">
                    <h4 class="card-title">${element.tituloCard}</h4>
                    <p class="card-text">${element.textoCard}</p>
                    <p class="fondoPrecio">Precio: $${element.precio}</p>
                    <button class="${element.botonClass}" id="${element.botonID}">Agregar al Carrito</button>
                </div>
            </div>
        </div>
        `
    })
}

/* Funcion que filtra los productos */
/* Hacemos un llamado a un select mediante un get elementsbyid, luego hacemos un evento de "onchange", y al ir 
eligiendo distintas opciones, el listado de productos que se muestarn en HTML van variando. 
La funcion hace cosas distintas segun el value del onchange. Pero lo central consiste en que limpia, y luego crea
el listado de productos que se muestra en HTML*/

const filtroDeProductos = document.getElementById("mostrarProductos");
filtroDeProductos.onchange = (e) => {
    if (e.target.value == "soloCamisetas") {
        limpiar(divCamisetas)
        limpiar(divBotines)
        limpiar(divRopaDeportiva)
        crearProductos(arrayCamisetas, divCamisetas)
        eventosCamisetas()
    } else if (e.target.value == "soloBotines") {
        limpiar(divCamisetas)
        limpiar(divBotines)
        limpiar(divRopaDeportiva)
        crearProductos(arrayBotines, divBotines)
        eventosBotines()
    } else if (e.target.value == "soloRopaDeportiva") {
        limpiar(divCamisetas)
        limpiar(divBotines)
        limpiar(divRopaDeportiva)
        crearProductos(arrayRopaDeportiva, divRopaDeportiva)
        eventosRopaDeportiva()
    } else if (e.target.value == "mostrarTodo") {
        limpiar(divCamisetas)
        limpiar(divBotines)
        limpiar(divRopaDeportiva)
        crearProductos(arrayCamisetas, divCamisetas)
        eventosCamisetas()
        crearProductos(arrayBotines, divBotines)
        eventosBotines()
        crearProductos(arrayRopaDeportiva, divRopaDeportiva)
        eventosRopaDeportiva()
    }
}