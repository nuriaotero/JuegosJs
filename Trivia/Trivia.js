// script.js - Quiz de Programación

// Array de objetos con las preguntas
const preguntas = [
    {
        pregunta: "¿Qué significa HTML?",
        opciones: [
            "Hyper Text Markup Language",
            "High Tech Modern Language", 
            "Home Tool Markup Language"
        ],
        correcta: 0
    },
    {
        pregunta: "¿Cuál de estos NO es un tipo de dato en JavaScript?",
        opciones: [
            "string",
            "boolean", 
            "character"
        ],
        correcta: 2
    },
    {
        pregunta: "¿Qué método se usa para agregar un elemento al final de un array en JavaScript?",
        opciones: [
            "push()",
            "pop()", 
            "append()"
        ],
        correcta: 0
    }
];

// Variables de estado
let preguntaActual = 0;
let aciertos = 0;
let respuestasIncorrectas = [];

// Elementos DOM
const pantallaInicio = document.getElementById('pantalla-inicio');
const pantallaQuiz = document.getElementById('pantalla-quiz');
const pantallaResultados = document.getElementById('pantalla-resultados');
const preguntaTexto = document.getElementById('pregunta-texto');
const opcionesContainer = document.getElementById('opciones-container');
const feedback = document.getElementById('feedback');
const progreso = document.getElementById('progreso');
const aciertosElement = document.getElementById('aciertos');
const respuestasIncorrectasContainer = document.getElementById('respuestas-incorrectas');
const statusText = document.getElementById('status-text');

// Botones
const btnComenzar = document.getElementById('btnComenzar');
const btnReiniciar = document.getElementById('btnReiniciar');

// Event Listeners
btnComenzar.addEventListener('click', comenzarQuiz);
btnReiniciar.addEventListener('click', reiniciarQuiz);

// Función para comenzar el quiz
function comenzarQuiz() {
    pantallaInicio.classList.remove('activa');
    pantallaQuiz.classList.add('activa');
    preguntaActual = 0;
    aciertos = 0;
    respuestasIncorrectas = [];
    mostrarPregunta();
    actualizarStatus(`Pregunta ${preguntaActual + 1} de ${preguntas.length}`);
}

// Función para mostrar la pregunta actual
function mostrarPregunta() {
    const pregunta = preguntas[preguntaActual];
    
    // Actualizar texto de la pregunta
    preguntaTexto.textContent = pregunta.pregunta;
    
    // Limpiar opciones anteriores
    opcionesContainer.innerHTML = '';
    feedback.textContent = '';
    feedback.className = 'feedback';
    
    // Generar botones de opciones dinámicamente usando forEach
    pregunta.opciones.forEach((opcion, index) => {
        const boton = document.createElement('button');
        boton.className = 'opcion-btn';
        boton.textContent = opcion;
        boton.addEventListener('click', () => verificarRespuesta(index));
        opcionesContainer.appendChild(boton);
    });
    
    // Actualizar barra de progreso
    const progresoPorcentaje = ((preguntaActual) / preguntas.length) * 100;
    progreso.style.width = `${progresoPorcentaje}%`;
}

// Función para verificar la respuesta
function verificarRespuesta(opcionSeleccionada) {
    const pregunta = preguntas[preguntaActual];
    const botones = document.querySelectorAll('.opcion-btn');
    
    // Deshabilitar todos los botones
    botones.forEach(boton => {
        boton.disabled = true;
    });
    
    // Marcar respuesta correcta e incorrecta
    if (opcionSeleccionada === pregunta.correcta) {
        botones[opcionSeleccionada].classList.add('correcta');
        feedback.textContent = '¡Correcto!';
        feedback.classList.add('correcto');
        aciertos++;
        actualizarStatus('');
    } else {
        botones[opcionSeleccionada].classList.add('incorrecta');
        botones[pregunta.correcta].classList.add('correcta');
        feedback.textContent = `Incorrecto. La respuesta correcta es: "${pregunta.opciones[pregunta.correcta]}"`;
        feedback.classList.add('incorrecto');
        
        // Guardar respuesta incorrecta para mostrar al final
        respuestasIncorrectas.push({
            pregunta: pregunta.pregunta,
            respuestaCorrecta: pregunta.opciones[pregunta.correcta]
        });
        
        actualizarStatus('');
    }
    
    // Pasar a la siguiente pregunta después de un delay
    setTimeout(() => {
        preguntaActual++;
        
        if (preguntaActual < preguntas.length) {
            mostrarPregunta();
            actualizarStatus(`Pregunta ${preguntaActual + 1} de ${preguntas.length}`);
        } else {
            mostrarResultados();
        }
    }, 2000);
}

// Función para mostrar los resultados finales
function mostrarResultados() {
    pantallaQuiz.classList.remove('activa');
    pantallaResultados.classList.add('activa');
    
    // Mostrar puntuación
    aciertosElement.textContent = aciertos;
    
    // Mostrar respuestas incorrectas
    respuestasIncorrectasContainer.innerHTML = '';
    
    if (respuestasIncorrectas.length === 0) {
        respuestasIncorrectasContainer.innerHTML = '<p>¡Perfecto! No tuviste respuestas incorrectas.</p>';
    } else {
        respuestasIncorrectas.forEach(respuesta => {
            const item = document.createElement('div');
            item.className = 'respuesta-item';
            item.innerHTML = `
                <div class="respuesta-pregunta">${respuesta.pregunta}</div>
                <div class="respuesta-correcta">Respuesta correcta: ${respuesta.respuestaCorrecta}</div>
            `;
            respuestasIncorrectasContainer.appendChild(item);
        });
    }
    
    actualizarStatus(``);
}


function reiniciarQuiz() {
    pantallaResultados.classList.remove('activa');
    pantallaInicio.classList.add('activa');
    actualizarStatus('');
}


function actualizarStatus(texto) {
    statusText.textContent = texto;
}


actualizarStatus('');