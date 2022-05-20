/* Recuperamos los datos del carrito ingresados por el usuario*/
const productosIngresadosAlCarro = localStorage.getItem('guardarCarrito');
/* Luego parseamos el string a objeto */
let productosIngresadosAlCarroParseados = (JSON.parse(productosIngresadosAlCarro));
console.log(productosIngresadosAlCarroParseados)

let tabla = document.getElementById("contenidoCarrito");
let sumatoriaDePrecios;
const arrayCheckout = []
let almacenarProductosParaMostrar = []

function crearFila(producto) {
    /* la idea consiste en que se cree una fila por cada objeto del carrito. */
    let row = document.createElement("tr")
    row.innerHTML = `<tr>
    </tr>`
    tabla.append(row);

    /* Agregamos los th y luego se los apendea */
    col1 = document.createElement("th")
    col1.innerHTML = `<th>${producto.id}</th>`
    row.appendChild(col1)

    col2 = document.createElement("th")
    col2.innerHTML = `<th><img src="${producto.imagen}" width="100px" height="100px"></th>`
    row.appendChild(col2)

    col3 = document.createElement("th")
    col3.innerHTML = `<th>${producto.nombreDelProducto}</th>`
    row.appendChild(col3)

    col4 = document.createElement("th")
    col4.innerHTML = `<th>${producto.precioUnitario}</th>`
    row.appendChild(col4)

    col5 = document.createElement("th")
    col5.innerHTML = `<th>${producto.cantidad}</th>
    <button id="suma${producto.id}" class="estilosBotonCantidadMas">+</button>
    <button id="resta${producto.id}" class="estilosBotonCantidadMenos">-</button>`
    row.appendChild(col5)

    col6 = document.createElement("th");
    col6.innerHTML = `<th>${producto.precioSumado}</th>`
    row.appendChild(col6)

    col7 = document.createElement("th")
    col7.innerHTML = `<th></th>`
    row.appendChild(col7)

    /* Seccion Boton Eliminar */
    /* Primero creamos el elemento boton, luego le agregamos el texto y un ID para trabajar posteriormente con el*/
    let botonDelete = document.createElement("button")
    botonDelete.innerHTML = `<button></button>`
    botonDelete.innerText = `Eliminar Producto`
    botonDelete.id = `${producto.id}`
    botonDelete.className = `btn-primary`
    /* Creamos un evento de click*/
    botonDelete.onclick = (e) => {
        eliminarProducto(e)
        renovarElLocalStorage()
        actualizar()
        crearCarrito()
        calcularTotal()
        cantidadItemsIncluidosEnElCarrito()
    }
    col7.appendChild(botonDelete)

    /****************************************************/
    /* Boton Suma */
    const modificarCantidadSuma = document.getElementById(`suma${producto.id}`);
    modificarCantidadSuma.onclick = () => {
        producto.cantidad++
        producto.precioSumado = producto.precioUnitario * producto.cantidad
        renovarElLocalStorage()
        actualizar()
        crearCarrito()
        calcularTotal()
    }

    /* Boton Resta*/
    const modificarCantidadResta = document.getElementById(`resta${producto.id}`)
    modificarCantidadResta.onclick = () => {
        producto.cantidad--
        if (producto.cantidad <= 0) {
            producto.cantidad = 0
        }
        producto.precioSumado = producto.precioUnitario * producto.cantidad
        renovarElLocalStorage()
        actualizar()
        crearCarrito()
        calcularTotal()
    }
}

crearCarrito()
calcularTotal()
cantidadItemsIncluidosEnElCarrito()
console.log(productosIngresadosAlCarroParseados)

/*spread()*/

/* Funcion que crea el carrito, usando los datos que el usuario brindo en index.html */

function crearCarrito() {
    productosIngresadosAlCarroParseados.forEach(element => {
        crearFila(element);
    })
}

/* Funcion que calcula el precio. Se hace un reduce de todos los precios unitarios. */

function calcularTotal() {
    sumatoriaDePrecios = productosIngresadosAlCarroParseados.reduce((acc, precios) => acc + precios.precioSumado, 0)
    let imprimirPrecioV2 = document.getElementById("precioFinal");
    imprimirPrecioV2.innerText = `$${sumatoriaDePrecios}`
}

/* Funcion para ordenar el carro */

function ordenarMayor() {
    productosIngresadosAlCarroParseados.sort((a, b) => b.precioSumado - a.precioSumado)
}

function ordenarMenor() {
    productosIngresadosAlCarroParseados.sort((a, b) => a.precioSumado - b.precioSumado)
}

const orden = document.getElementById("ordenar");
orden.onchange = (e) => {
    if (e.target.value == "ordenarMayor") {
        ordenarMayor()
        renovarElLocalStorage()
        actualizar()
        crearCarrito()
        calcularTotal()
    }
    if (e.target.value == "ordenarMenor") {
        ordenarMenor()
        renovarElLocalStorage()
        actualizar()
        crearCarrito()
        calcularTotal()
    }
}


/* Esta funcion solamente actualiza la tabla */

function actualizar() {
    tabla.innerHTML = "";
}

/* Funcion que determina el length del carro */
function cantidadItemsIncluidosEnElCarrito() {
    cantidadItemsCarrito = document.getElementById("carritoLength");
    cantidadItemsCarrito.innerText = `${productosIngresadosAlCarroParseados.length}`
}

function renovarElLocalStorage() {
    localStorage.setItem('guardarCarrito', JSON.stringify(productosIngresadosAlCarroParseados))
}

function eliminarProducto(e) {
    /* La variable UBICACION me va a guardar el ID del boton que fue clickeado*/
    ubicacion = e.target.id
    console.log(ubicacion)
    /* Con el id guardado en la variable, hacemos un find, para encontrar el producto al cual se quiere eliminar*/
    const productoEncontrado = productosIngresadosAlCarroParseados.find((product) => product.id == ubicacion);
    console.log(productoEncontrado);
    /* Una vez encontrado el producto, determinamos su posicion en el array, y luego se elimina con el splice*/
    let posicionEnElArray = productosIngresadosAlCarroParseados.indexOf(productoEncontrado, 0);
    productosIngresadosAlCarroParseados.splice(posicionEnElArray, 1)
    console.log(productosIngresadosAlCarroParseados)
    /* Por ultimo creamos un nuevo item en el storage*/
}



/******************************************************/

/* EVENTOS */

/* Boton Vaciar... simplemente limpia el carrito. Borra todo. Luego actualiza y modifica el precio total.  */
botonVaciar = document.getElementById("botonVaciar")
botonVaciar.onclick = () => {
    Swal.fire({
        title: '¿Estas seguro que queres vaciar el carrito?',
        text: "Si vacias, deberas volver a llenar el carrito",
        icon: 'warning',
        color: '#dbdbdb',
        showCancelButton: true,
        confirmButtonColor: '#171718',
        cancelButtonColor: '#f10707',
        iconColor: '#f3db00',
        confirmButtonText: 'Si, quiero vaciar el carrito',
        cancelButtonText: 'Cancelar',
        background: 'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'El carro se ha vaciado',
                text: 'Vuelve a inicio para llenar el carro otra vez',
                icon: 'success',
                color: '#dbdbdb',
                background: 'linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)',
                confirmButtonColor: '#171718'
            })
            productosIngresadosAlCarroParseados.splice(0, 99),
                actualizar(),
                calcularTotal(),
                cantidadItemsIncluidosEnElCarrito()
            localStorage.clear()
        }
    })
}

/* Boton Comprar */

const checkoutDatos = document.getElementById("datosCheckout")
const botonFinalizarCompra = document.getElementById("botonComprar");
botonFinalizarCompra.onclick = (e) => {
    e.preventDefault();
    Swal.fire({
        title: '¿Deseas confirmar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero Confirmar',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'La compra ha sido confirmada',
                'Muchas Gracias!',
                'success'
            )
        }
    })
}
