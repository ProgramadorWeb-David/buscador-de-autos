

// Variables

const resultado = document.querySelector('#resultado');

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const max = new Date().getFullYear();  // da el año actual
const min = max - 10;  


// Generar un objeto con la busqueda
const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision : '',
    color : ''
}


// Eventos

// cuando carga el html va a cargar la funcion de mostrar autos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);  // muestras los autos al cargar


    // llena el selector de los años
    llenarSelect();
});


// event listener para los select de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;

    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value;

    filtrarAuto();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;

    filtrarAuto();
});





// Funciones

function mostrarAutos(autos) {

    limpiarHTML();  // elimina el html previo

    autos.forEach( auto => {
        // destructurando
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - transmision: ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        // mientras vamos recorriendo el array de objetos de
        // la DB, vamos agregándolos al html
        resultado.appendChild(autoHTML);
    });
}

// limpiar html
function limpiarHTML() {
    while( resultado.firstChild ) {
        resultado.removeChild( resultado.firstChild );
    }
}


// genera los años del select
function llenarSelect() {
    
    for(let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;

        year.appendChild(opcion); // agrega las opciones al select
    }
}


// funcion que filtra en base a la busqueda
function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );


    // mostrar un mensaje cuando no se encuentren resultados
    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}


function noResultado() {

    limpiarHTML();

    const aux = document.createElement('div');

    aux.classList.add('alerta', 'error');

    aux.textContent = 'No se encontraron resultados!';

    resultado.appendChild( aux );
}

function filtrarMarca(auto) {
    const { marca } = datosBusqueda;

    // si datos busqueda se lleno en la parte de marcas y
    // tiene algun valor entonces será true y ejecutará el código
    if( marca ) {
        return auto.marca === marca;
    } 

    // si no selecciono nada entonces retorna el automovil completo
    return auto;
}


function filtrarYear(auto) {
    const { year } = datosBusqueda;

    if( year ) {
        return auto.year === parseInt(year);
    } 

    return auto;
}


function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;

    if( minimo ) {
        return auto.precio >= parseInt(minimo);
    } 

    return auto;
}


function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda;

    if( maximo ) {
        return auto.precio <= parseInt(maximo);
    } 

    return auto;
}


function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;

    if( puertas ) {
        return auto.puertas === parseInt(puertas);
    } 

    return auto;
}


function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;

    if( transmision ) {
        return auto.transmision === transmision;
    } 

    return auto;
}


function filtrarColor(auto) {
    const { color } = datosBusqueda;

    if( color ) {
        return auto.color === color;
    } 

    return auto;
}