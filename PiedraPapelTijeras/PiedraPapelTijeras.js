// Array de opciones
const opciones = ["piedra", "papel", "tijeras"];

let puntuacionJugador = 0;
let puntuacionPC = 0;


const imagenJugador = document.getElementById("imagenJugador");
const imagenPC = document.getElementById("imagenPC");
const resultadoTxt = document.getElementById("resultado");
const puntuacionTxt = document.getElementById("puntuacion");
const resetBtn = document.getElementById("reset");
const pcThinking = document.querySelector(".pc-thinking");


function eleccionPC() {
    const eleccion = Math.floor(Math.random() * 3);
    return opciones[eleccion];
}

function mostrarImagenes(eleccionJugador, eleccionPC) {
   
    imagenJugador.src = `${eleccionJugador}.jpg`;
    imagenJugador.alt = eleccionJugador;
    imagenJugador.classList.add("imagen-visible");
    
  
    imagenPC.src = `${eleccionPC}.jpg`;
    imagenPC.alt = eleccionPC;
    imagenPC.classList.add("imagen-visible");
}


function jugar(eleccionJugador) {
    
    document.querySelectorAll('.btn-juego').forEach(btn => {
        btn.disabled = true;
    });
    
    
    pcThinking.textContent = "El ordenador está pensando...";
    
    const eleccionPCValor = eleccionPC(); 
    let velocidad = 100; 
    let intervalo;
    let contador = 0;
    
   
    imagenJugador.src = `${eleccionJugador}.jpg`;
    imagenJugador.alt = eleccionJugador;
    imagenJugador.classList.add("imagen-visible");
    
    intervalo = setInterval(() => {
        const aleatoria = Math.floor(Math.random() * 3);
        imagenPC.src = `${opciones[aleatoria]}.jpg`;
        imagenPC.alt = opciones[aleatoria];
        imagenPC.classList.add("imagen-visible");
        
       
        velocidad = Math.max(20, velocidad - 5); 
        
        contador++;
        if (contador > 25) { 
            clearInterval(intervalo);
            
           
            setTimeout(() => {
                imagenPC.src = `${eleccionPCValor}.jpg`;
                imagenPC.alt = eleccionPCValor;
                pcThinking.textContent = "";
                
                let resultado = "";
                let claseResultado = "";
                
                if (eleccionJugador === eleccionPCValor) {
                    resultado = "¡Es un empate!";
                    claseResultado = "empate";
                } else if (
                    (eleccionJugador === "piedra" && eleccionPCValor === "tijeras") ||
                    (eleccionJugador === "papel" && eleccionPCValor === "piedra") ||
                    (eleccionJugador === "tijeras" && eleccionPCValor === "papel")
                ) {
                    resultado = "¡Has ganado!";
                    claseResultado = "ganador";
                    puntuacionJugador++;
                } else {
                    resultado = "¡Has perdido!";
                    claseResultado = "perdedor";
                    puntuacionPC++;
                }
                
             
                resultadoTxt.textContent = resultado;
                resultadoTxt.className = "resultado-texto " + claseResultado;
                
              
                puntuacionTxt.textContent = `Puntuación - Tú: ${puntuacionJugador} | Ordenador: ${puntuacionPC}`;
                
                document.querySelectorAll('.btn-juego').forEach(btn => {
                    btn.disabled = false;
                });
            }, 300);
        }
    }, velocidad);
}


document.getElementById("piedra").addEventListener("click", () => jugar("piedra"));
document.getElementById("papel").addEventListener("click", () => jugar("papel"));
document.getElementById("tijeras").addEventListener("click", () => jugar("tijeras"));


resetBtn.addEventListener("click", () => {
    puntuacionJugador = 0;
    puntuacionPC = 0;
    puntuacionTxt.textContent = `Puntuación - Tú: ${puntuacionJugador} | Ordenador: ${puntuacionPC}`;
    resultadoTxt.textContent = "¡Haz tu elección!";
    resultadoTxt.className = "resultado-texto";
    imagenJugador.classList.remove("imagen-visible");
    imagenPC.classList.remove("imagen-visible");
    pcThinking.textContent = "";
    
    
    document.querySelectorAll('.btn-juego').forEach(btn => {
        btn.disabled = false;
    });
});