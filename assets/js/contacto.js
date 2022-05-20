const datosContacto = [];

let nombreGuardado
let apellidoGuardado 
let emailGuardado 
let suscribe 
let tipoDeTramiteIngresado 
let mensaje

const nombreIngresado = document.getElementById("nombre")
nombreIngresado.onchange = ()=> {
    nombreGuardado = nombreIngresado.value;
    console.log(nombreGuardado)
    validacion(nombreGuardado)
};

const apellidoIngresado = document.getElementById("apellido");
apellidoIngresado.onchange = ()=> {
    apellidoGuardado = apellidoIngresado.value
}

const emailIngresado = document.getElementById("emailContacto");
emailIngresado.onchange = ()=> {
    emailGuardado = emailIngresado.value;
}


const suscribirseAlNewsetter = document.getElementById("suscripcion");
suscribirseAlNewsetter.onchange = ()=>{
    suscribe = suscribirseAlNewsetter.checked
    console.log(suscribe)
}

const tipoDeTramite = document.getElementById("tramite");
tipoDeTramite.onchange = ()=>{
    tipoDeTramiteIngresado = tipoDeTramite.value;
    console.log(tipoDeTramiteIngresado)
}

const consulta = document.getElementById("textoConsulta");
consulta.onchange = ()=> {
    mensaje = consulta.value;
}


class DatosPersonales {
    constructor (nombre, apellido, email, suscripcion, tramite, textoConsulta) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.suscripcion = suscripcion;
        this.tramite = tramite;
        this.textoConsulta = textoConsulta;
    }
}

const submitDatos = document.getElementById("enviarDatos");
submitDatos.onclick = (e)=> {
    e.preventDefault()
    const submitContacto = new DatosPersonales(nombreGuardado, apellidoGuardado, emailGuardado, suscribe, tipoDeTramiteIngresado, mensaje);
    console.log(submitContacto)
}



