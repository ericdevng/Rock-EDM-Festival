//Una vez cargado todo el index, inicia la app

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

//la app llama las funciones del sitio

function iniciarApp(){
    crearGaleria();
    scrollNav();
    navegacionFija();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');


    window.addEventListener('scroll', function() {
        if( sobreFestival.getBoundingClientRect().bottom < 0  ) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a')
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();

            const seccion = document.querySelector(e.target.attributes.href.value);
            seccion.scrollIntoView({behavior : "smooth"});
        })
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <img src="build/img/thumb/${i}.webp" alt="imagen vocalista festival">
        `;

        imagen.onclick = function(){
            mostrarImagen(i);//callback
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){

    //PARA ABRIR LAS IMAGENES AL DAR CLICK

    const imagen = document.createElement('picture');   //CREAMOS UN <picture></picture>
    imagen.innerHTML = `
        <img src="build/img/grande/${id}.webp" alt="imagen vocalista festival">
    `; //agregar el img dentro del picture al HTML

    const overlay = document.createElement('DIV');//creamos un div...
    overlay.appendChild(imagen);                  //...que encerrará al picture de arriba
    overlay.classList.add('overlay');             //y le agregamos una clase para darle estilos

    //PARA QUE LA IMAGEN FIJE EL SCROLL

    const body = document.querySelector('body');  //seleccionamos el body
    body.appendChild(overlay);                    //y le damos un hijo que es el div con el picture de arriba  
    body.classList.add('fijar-body');


    //PARA CERRAR LAS IMAGENES UNA VEZ ABIERTAS

    const cerrar = document.createElement('P'); //CREAMOS PARRAFO PARA LA EQUIS DE CIERRE
    cerrar.textContent = "X";                   //DENTRO DEL PARRAFO LA EQUIS
    cerrar.classList.add("btn-cerrar");         //Y LE METEMOS UNA CLASE PARA LOS ESTILOS
    cerrar.onclick = function (){               //A ESA P LE DAMOS UN ONCLICK PARA QUE SE CIERRE
        const body = document.querySelector('body');   //SELECCIONAMOS EL MISMO BODY DE ARRIBA, NO IMPORTA QUE SE REPITA LA VARIABLE PQ ESTA EN OTRAS LLAVES
        body.classList.remove('fijar-body');    //A ESE BODY LE QUITAMOS AHORA EL FIJAR-BODY DE ARRIBA PARA QUE NO SE BLOQUEE LA PANTALLA
        overlay.remove();                       //Y ELIMINAMOS EL PICTURE PARA QUE SE CIERRE LA IMAGEN
    }
    overlay.appendChild(cerrar);                //LA P DEL CIERRE SE LA AGREGAMOS COMO HIJO AL DIV


}