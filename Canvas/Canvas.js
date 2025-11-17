const Canvas = document.getElementById('game');
const context = Canvas.getContext('2d');

// Tamaño del canvas
Canvas.width = 600;
Canvas.height = 300;

// ---- Pelota ----
let x = 100;
let y = 50;
let radio = 15;

let velocidadX = 3;
let velocidadY = 3;

// ---- Plataforma ----
let paddleWidth = 100;
let paddleHeight = 15;
let paddleX = (Canvas.width - paddleWidth) / 2;
let paddleY = Canvas.height - paddleHeight - 5;

let paddleSpeed = 6;
let teclaDerecha = false;
let teclaIzquierda = false;

// ---- Vidas ----
let vidas = 3;
let gameOver = false;

// ---- Contador de rebotes ----
let rebotes = 0;
let record = 0;

let mostrarNuevoLogro = false;
let primerMuerto = false;

// ---- Dibujar Contador de Rebotes ----
function drawRebotes() {
    context.font = "20px Arial";
    context.fillStyle = "#00ffff";
    context.fillText(`Rebotes: ${rebotes}`, 10, 30);

   if (mostrarNuevoLogro) {
        context.fillStyle = "#ff00ff";
        context.fillText("¡Nuevo logro!", 10, 60);
}}

// ---- Dibujar Pelota ----
function drawBall() {
    context.beginPath();
    context.arc(x, y, radio, 0, Math.PI * 2);
    context.fillStyle = '#e7aa00ff';
    context.fill();
    context.closePath();
}

// ---- Dibujar Plataforma ----
function drawPaddle() {
    context.fillStyle = "#51ff00ff";
    context.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
}

// ---- Dibujar Vidas ----
function drawLives() {
    let estrellas = "";
    for (let i = 0; i < vidas; i++) estrellas += "⭐ ";

    context.font = "20px Arial";
    context.fillStyle = "#ffcc00";
    context.fillText(`Vidas: ${estrellas}`, Canvas.width - 180, 30);
}

// ---- Movimiento Plataforma ----
document.addEventListener("keydown", (e) => {
    if (e.key === "d" || e.key === "D") teclaDerecha = true;
    if (e.key === "a" || e.key === "A") teclaIzquierda = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "d" || e.key === "D") teclaDerecha = false;
    if (e.key === "a" || e.key === "A") teclaIzquierda = false;
});

// ---- Colisión pelotita con plataforma ----
function checkPaddleCollision() {
    if (
        y + radio >= paddleY &&
        x >= paddleX &&
        x <= paddleX + paddleWidth &&
        velocidadY > 0
    ) {
        velocidadY *= -1;
        y = paddleY - radio;

         rebotes++;
        if (rebotes > record && record=== rebotes + 5) {
              
            record = rebotes;
            mostrarNuevoLogro = true;

            // Ocultar el mensaje después de 5 segundos
            setTimeout(() => {
                mostrarNuevoLogro = false;
            }, 5000);

            record = rebotes;}
    }
}

// ---- Perder vida ----
function perderVida() {
    vidas--;
    rebotes=0;

    if (vidas <= 0) {
        gameOver = true;
        mostrarGameOver();
        return;
    }
 primerMuerto = true; 
    // Reiniciar pelota
    x = 50;
    y = 50;
    velocidadX = 3;
    velocidadY = 3;
}

// ---- Mostrar mensaje Game Over ----
function mostrarGameOver() {
    context.clearRect(0, 0, Canvas.width, Canvas.height);
    context.fillStyle = "rgba(0,0,0,0.6)";
    context.fillRect(0, 0, Canvas.width, Canvas.height);

    context.fillStyle = "red";
    context.font = "50px Arial";
    context.fillText("GAME OVER", Canvas.width / 2 - 150, Canvas.height / 2);

    context.font = "20px Arial";
    context.fillStyle = "white";
    context.fillText("Haz click para reiniciar", Canvas.width / 2 - 110, Canvas.height / 2 + 40);
}

// ---- Reiniciar juego ----
function reiniciarJuego() {
    vidas = 3;
    gameOver = false;

    // Posición inicial pelota
    x = 50;
    y = 50;

    velocidadX = 3;
    velocidadY = 3;

    // Plataforma al centro
    paddleX = (Canvas.width - paddleWidth) / 2;

    animar();
}

// ---- Click para reiniciar ----
Canvas.addEventListener("click", () => {
    if (gameOver) reiniciarJuego();
});

// ---- Animación ----
function animar() {
    if (gameOver) return; // detener animación

    context.clearRect(0, 0, Canvas.width, Canvas.height);

    // Dibujar elementos
    drawBall();
    drawPaddle();
    drawLives();
     drawRebotes();

    // Movimiento pelota
    x += velocidadX;
    y += velocidadY;

    // Rebote laterales
    if (x + radio >= Canvas.width || x - radio <= 0) {
        velocidadX *= -1;
    }

    // Rebote arriba
    if (y - radio <= 0) {
        velocidadY *= -1;
    }

    // Si cae por abajo
    if (y - radio > Canvas.height) {
        perderVida();
    }

    // Colisión plataforma
    checkPaddleCollision();

    // Movimiento plataforma
    if (teclaDerecha && paddleX + paddleWidth < Canvas.width) {
        paddleX += paddleSpeed;
    }
    if (teclaIzquierda && paddleX > 0) {
        paddleX -= paddleSpeed;
    }

    requestAnimationFrame(animar);
}

animar();
