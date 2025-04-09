const musicaFondo = document.getElementById('musica-fondo');
let musicaIniciada = false;
const contenedores = [
    document.querySelector('.contenedor-inicial'),
    document.querySelector('.contenedor-segunda-pantalla'),
    document.querySelector('.contenedor-tercera-pantalla'),
    document.querySelector('.contenedor-cuarta-pantalla'),
    document.querySelector('.contenedor-quinta-pantalla'),
    document.querySelector('.contenedor-sexta-pantalla')
];
let pantallaActual = 0;

function mostrarPantalla(indice) {
    contenedores.forEach((contenedor, i) => {
        contenedor.style.display = i === indice ? 'block' : 'none';
    });
    document.body.style.justifyContent = indice === 1 ? 'flex-start' : 'center';
    const footer = document.querySelector('footer');
    footer.style.display = indice > 0 ? 'block' : 'none';
    window.scrollTo(0, 0); // Subir al inicio de la página
}

document.addEventListener('DOMContentLoaded', function() {
    const botonCarta = document.getElementById('boton-carta');
    const botonConfirmar = document.getElementById('boton-confirmar');
    const botonDescargar = document.getElementById('boton-descargar');
    const botonesSiguiente = document.querySelectorAll('[id^="boton-siguiente"]');
    const botonesAnterior = document.querySelectorAll('[id^="boton-anterior"]');
    const botonFinalizar = document.getElementById('boton-finalizar');

    if (botonCarta) {
        botonCarta.addEventListener('click', function() {
            if (!musicaIniciada) {
                musicaFondo.play();
                musicaIniciada = true;
            }
            pantallaActual = 1;
            mostrarPantalla(pantallaActual);
        });
    }

    botonesSiguiente.forEach(boton => {
        boton.addEventListener('click', function() {
            if (pantallaActual < contenedores.length - 1) {
                pantallaActual++;
                mostrarPantalla(pantallaActual);
            }
        });
    });

    botonesAnterior.forEach(boton => {
        boton.addEventListener('click', function() {
            if (pantallaActual > 0) {
                pantallaActual--;
                mostrarPantalla(pantallaActual);
            }
        });
    });

    if (botonConfirmar) {
        botonConfirmar.addEventListener('click', function() {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSea10bnn0u3hNdsD67zfKWqA_UHyFEUgF9ba0GfGeLwXlLKpA/viewform?usp=header', '_blank');
        });
    }

    if (botonDescargar) {
        botonDescargar.addEventListener('click', function() {
            const pdfUrl = 'https://drive.google.com/file/d/1_WMlMeuDFJ6EknDwTUp_ZbKX5ZQanjSo/view?usp=sharing';
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'Tarjeta de invitación 15.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    if (botonFinalizar) {
        botonFinalizar.addEventListener('click', function() {
            alert('¡Gracias!');
            mostrarPantalla(0);
            pantallaActual = 0;
            const footer = document.querySelector('footer');
            footer.style.display = 'none';
        });
    }

    mostrarPantalla(pantallaActual);
    document.body.style.overflowY = 'auto';
});