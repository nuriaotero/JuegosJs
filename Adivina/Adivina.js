var NumeroAleatorio = Math.floor(Math.random() * 100) + 1;
var Numerosupuestouesto = document.getElementById("NumeroIntroducido");
var btnComparar = document.getElementById("btnComparar");
var btnReset = document.getElementById("btnReset");
var feedbackTxt = document.getElementById("feedback");
var intentos = document.getElementById("Intentos");
intentos.textContent = 10;
btnComparar.addEventListener("click", Comparar);

function Comparar() {
    let supuestouesto = parseInt(Numerosupuestouesto.value);
    if (intentos.textContent <= 0) {
        feedbackTxt.textContent = "¡Juego terminado! Reinicia para jugar de nuevo.";

        return;

    } else if (isNaN(supuesto) || supuesto < 1 || supuesto > 100) {
        feedbackTxt.textContent = "Introduce un número entre 1 y 100";

        return;
    } else if (supuesto > NumeroAleatorio) {
        feedbackTxt.textContent = "El número es más pequeño.";
        intentos.textContent = parseInt(intentos.textContent) - 1;


    } else if (supuesto < NumeroAleatorio) {
        feedbackTxt.textContent = "El número es más grande.";
        intentos.textContent = parseInt(intentos.textContent) - 1;

    } else {
        feedbackTxt.textContent = "¡ENHORABUENA, HAS ACERTADO!";
        intentos.textContent = 10;
        NumeroAleatorio = Math.floor(Math.random() * 100) + 1;
        Numerosupuestouesto.value = "";
        return;
    }

    Numerosupuestouesto.value = "";
}

btnReset.addEventListener("click", () => {
    NumeroAleatorio = Math.floor(Math.random() * 100) + 1;
    Numerosupuestouesto.value = "";
    feedbackTxt.textContent = "";
    intentos.textContent = 10;
});
