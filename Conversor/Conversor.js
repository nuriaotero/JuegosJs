var monedaOrigen = document.getElementById("monedaOrigen");
var monedaDestino = document.getElementById("monedaDestino");
var cantidadInput = document.getElementById("cantidad");
var btnConvertir = document.getElementById("btnConvertir");
var resultadoTxt = document.getElementById("resultado");
btnConvertir.addEventListener("click", Convertir);
function Convertir() {

    let cantidad = parseFloat(cantidadInput.value);
    if (monedaOrigen.value == monedaDestino.value) {
        resultadoTxt.innerHTML = "<b style='color: red;'>Has seleccionado la misma moneda en ambos casos. Selecciona dos monedas distintas.</b>";
        return;
    } else if (isNaN(cantidad) || cantidad <= 0) {
        resultadoTxt.innerHTML = "<b style='color: red;'>Por favor, ingresa una cantidad válida mayor que cero.</b>";
        return;
    } else if (monedaOrigen.value === "USD" && monedaDestino.value === "EUR") {
        let resultado = cantidad * 0.86;
        resultadoTxt.textContent = `${cantidad} dólares americanos son ${resultado.toFixed(2)} euros.`;
    } else if (monedaOrigen.value === "USD" && monedaDestino.value === "GBP") { 
        let resultado = cantidad * 0.76;
        resultadoTxt.textContent = `${cantidad} dólares americanos son ${resultado.toFixed(2)} libras esterlinas.`;
    }else if (monedaOrigen.value === "USD"  && monedaDestino.value === "JPY") {
        let resultado = cantidad * 154.62;
        resultadoTxt.textContent = `${cantidad} dólares americanos son ${resultado.toFixed(2)} yenes japoneses.`;
    }else if (monedaOrigen.value === "EUR" && monedaDestino.value === "USD") {
        let resultado = cantidad * 1.16;
        resultadoTxt.textContent = `${cantidad} euros son ${resultado.toFixed(2)} dólares americanos.`;
    } else if (monedaOrigen.value === "EUR" && monedaDestino.value === "GBP") {
        let resultado = cantidad * 0.88;
        resultadoTxt.textContent = `${cantidad} euros son ${resultado.toFixed(2)} libras esterlinas.`;   
    } else if (monedaOrigen.value === "EUR" && monedaDestino.value === "JPY") {
        let resultado = cantidad * 179.26;
        resultadoTxt.textContent = `${cantidad} euros son ${resultado.toFixed(2)} yenes japoneses.`; 
    } else if (monedaOrigen.value === "GBP" && monedaDestino.value === "USD") {
        let resultado = cantidad * 1.31;
        resultadoTxt.textContent = `${cantidad} libras esterlinas son ${resultado.toFixed(2)} dólares americanos.`;     
    } else if (monedaOrigen.value === "GBP" && monedaDestino.value === "EUR") {
        let resultado = cantidad * 1.13;
        resultadoTxt.textContent = `${cantidad} libras esterlinas son ${resultado.toFixed(2)} euros.`; 
    }else if (monedaOrigen.value === "GBP" && monedaDestino.value === "JPY") {
        let resultado = cantidad * 203.13;
        resultadoTxt.textContent = `${cantidad} libras esterlinas son ${resultado.toFixed(2)} yenes japoneses.`; 
    } else if (monedaOrigen.value === "JPY" && monedaDestino.value === "USD") {
        let resultado = cantidad * 0.0065;
        resultadoTxt.textContent = `${cantidad} yenes japoneses son ${resultado.toFixed(2)} dólares americanos.`;     
    }else if (monedaOrigen.value === "JPY" && monedaDestino.value === "EUR") {
        let resultado = cantidad * 0.0056;
        resultadoTxt.textContent = `${cantidad} yenes japoneses son ${resultado.toFixed(2)} euros.`; 
    } else if (monedaOrigen.value === "JPY" && monedaDestino.value === "GBP") {
        let resultado = cantidad * 0.0049;
        resultadoTxt.textContent = `${cantidad} yenes japoneses son ${resultado.toFixed(2)} libras esterlinas.`;
     }
    }