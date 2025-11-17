const Canvas = document.getElementById('game');
const context = Canvas.getContext('2d');

// Tamaño del canvas
Canvas.width = 600;
Canvas.height = 300;

// ---- Variables para el sprite ----
let fireballSprite = new Image();
fireballSprite.src = 'Img/fireball.png';

// Dimensiones para 4 frames
let spriteWidth = 256;
let spriteHeight = 256;
let frameCount = 4;
let currentFrame = 0;
let frameDelay = 5;
let frameCounter = 0;
let spriteLoaded = false;


// ---- Pelota ----
let x = 100;
let y = 50;
let radio = 25;

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
let rebotesEnEstaVida = 0;

let mostrarNuevoLogro = false;
let primerMuerto = false;

// ---- Variables para joystick táctil ----
let joystick = {
    x: 0,
    y: 0,
    baseRadius: 40,
    stickRadius: 20,
    isActive: false,
    baseX: 0,
    baseY: 0,
    stickX: 0,
    stickY: 0,
    maxDistance: 30
};

let touchDirection = 0;

// ---- Dibujar Contador de Rebotes ----
function drawRebotes() {
    context.font = "20px Arial";
    context.fillStyle = "#00ffff";
    context.fillText(`Rebotes: ${rebotes}`, 10, 30);
    context.fillText(`Record: ${record}`, 10, 50);

    if (mostrarNuevoLogro) {
        context.fillStyle = "#ff00ff";
        context.fillText("¡Nuevo logro!", 10, 70);
    }
}

// ---- Dibujar Pelota con Sprite ----
function drawBall() {
    if (spriteLoaded) {
        // Calcular el frame actual en la spritesheet
        const sx = currentFrame * spriteWidth;
        
        // Guardar el estado actual del contexto
        context.save();
        
        // Mover el punto de origen al centro de la pelota
        context.translate(x, y);
        
        // Calcular el ángulo de rotación basado en la dirección del movimiento
        let rotationAngle = 0;
        
        if (velocidadX !== 0 || velocidadY !== 0) {
            // Calcular ángulo basado en la dirección del movimiento
            // + Math.PI para girar 180 grados (cola en dirección contraria)
            rotationAngle = Math.atan2(velocidadY, velocidadX) + Math.PI;
        }
        
        // Aplicar rotación
        context.rotate(rotationAngle);
        
        // Calcular dimensiones para mantener proporción del sprite
        const scale = (radio * 4) / Math.max(spriteWidth, spriteHeight);
        const drawWidth = spriteWidth * scale;
        const drawHeight = spriteHeight * scale;
        
        // Dibujar el sprite rotado y centrado
        context.drawImage(
            fireballSprite,
            sx, 0,                    // Coordenadas de origen en el sprite (recorte)
            spriteWidth, spriteHeight, // Tamaño del recorte
            -drawWidth / 2, -drawHeight / 2, // Posición centrada
            drawWidth, drawHeight      // Tamaño escalado
        );
        
        // Restaurar el estado del contexto
        context.restore();
        
    } else {
        // Fallback simple mientras carga el sprite
        context.beginPath();
        context.arc(x, y, radio, 0, Math.PI * 2);
        context.fillStyle = '#e7aa00ff';
        context.fill();
        context.closePath();
    }
}

// ---- Actualizar Animación del Sprite ----
function updateAnimation() {
    // Incrementar el contador
    frameCounter++;

    // Solo cambiar de frame cuando frameCounter alcanza frameDelay
    if (frameCounter >= frameDelay) {
        frameCounter = 0; // Reiniciar contador
        currentFrame = (currentFrame + 1) % frameCount; // Pasar al siguiente frame
    }
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

// ---- Dibujar Joystick Táctil ----
function drawJoystick() {
    if (!('ontouchstart' in window) || !joystick.isActive) return;

    // Base del joystick (semitransparente)
    context.beginPath();
    context.arc(joystick.baseX, joystick.baseY, joystick.baseRadius, 0, Math.PI * 2);
    context.fillStyle = "rgba(100, 100, 100, 0.5)";
    context.fill();
    context.strokeStyle = "rgba(255, 255, 255, 0.8)";
    context.lineWidth = 2;
    context.stroke();

    // Palanca del joystick
    context.beginPath();
    context.arc(joystick.stickX, joystick.stickY, joystick.stickRadius, 0, Math.PI * 2);
    context.fillStyle = "rgba(255, 255, 255, 0.9)";
    context.fill();
    context.strokeStyle = "rgba(0, 0, 0, 0.5)";
    context.lineWidth = 2;
    context.stroke();

    // Indicador de dirección
    if (touchDirection !== 0) {
        context.fillStyle = touchDirection === 1 ? "#00ff00" : "#ff4444";
        context.font = "14px Arial";
        context.fillText(
            touchDirection === 1 ? "→" : "←", 
            joystick.baseX, 
            joystick.baseY - joystick.baseRadius - 10
        );
    }
}

// ---- Controles Teclado ----
document.addEventListener("keydown", (e) => {
    if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") teclaDerecha = true;
    if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") teclaIzquierda = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") teclaDerecha = false;
    if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") teclaIzquierda = false;
});

// ---- Inicializar Joystick ----
function initJoystick() {
    if ('ontouchstart' in window) {
        joystick.baseX = joystick.baseRadius + 20;
        joystick.baseY = Canvas.height - joystick.baseRadius - 20;
        joystick.stickX = joystick.baseX;
        joystick.stickY = joystick.baseY;
    }
}

// ---- Controles Táctiles con Joystick ----
Canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = Canvas.getBoundingClientRect();
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    const distanceToJoystick = Math.sqrt(
        Math.pow(touchX - joystick.baseX, 2) + 
        Math.pow(touchY - joystick.baseY, 2)
    );

    if (distanceToJoystick <= joystick.baseRadius * 2) {
        joystick.isActive = true;
        updateJoystick(touchX, touchY);
    }
});

Canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (joystick.isActive && e.touches[0]) {
        const touch = e.touches[0];
        const rect = Canvas.getBoundingClientRect();
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;
        updateJoystick(touchX, touchY);
    }
});

Canvas.addEventListener("touchend", (e) => {
    e.preventDefault();
    if (joystick.isActive) {
        resetJoystick();
    }
});

// ---- Actualizar posición del joystick ----
function updateJoystick(touchX, touchY) {
    if (!joystick.isActive) return;

    const deltaX = touchX - joystick.baseX;
    const deltaY = touchY - joystick.baseY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance <= joystick.maxDistance) {
        joystick.stickX = touchX;
        joystick.stickY = touchY;
    } else {
        const angle = Math.atan2(deltaY, deltaX);
        joystick.stickX = joystick.baseX + Math.cos(angle) * joystick.maxDistance;
        joystick.stickY = joystick.baseY + Math.sin(angle) * joystick.maxDistance;
    }

    const horizontalMovement = joystick.stickX - joystick.baseX;
    if (Math.abs(horizontalMovement) > 10) {
        touchDirection = horizontalMovement > 0 ? 1 : -1;
    } else {
        touchDirection = 0;
    }
}

// ---- Resetear joystick ----
function resetJoystick() {
    joystick.isActive = false;
    joystick.stickX = joystick.baseX;
    joystick.stickY = joystick.baseY;
    touchDirection = 0;
}

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
        rebotesEnEstaVida++;
        
        if (primerMuerto && rebotesEnEstaVida === record + 1) {
            mostrarNuevoLogro = true;
            setTimeout(() => {
                mostrarNuevoLogro = false;
            }, 5000);
        }
    }
}

// ---- Perder vida ----
function perderVida() {
    vidas--;
    rebotes = 0;
    
    if (rebotesEnEstaVida > record) {
        record = rebotesEnEstaVida;
    }
    
    if (!primerMuerto) {
        primerMuerto = true;
    }
    
    rebotesEnEstaVida = 0;

    if (vidas <= 0) {
        gameOver = true;
        mostrarGameOver();
        record = 0;
        return;
    }

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
    context.fillText("Toca para reiniciar", Canvas.width / 2 - 110, Canvas.height / 2 + 40);
}

// ---- Reiniciar juego ----
function reiniciarJuego() {
    vidas = 3;
    gameOver = false;
    rebotes = 0;
    rebotesEnEstaVida = 0;
    mostrarNuevoLogro = false;
    resetJoystick();

    x = 50;
    y = 50;
    velocidadX = 3;
    velocidadY = 3;

    paddleX = (Canvas.width - paddleWidth) / 2;

    animar();
}

// ---- Click/Touch para reiniciar ----
Canvas.addEventListener("click", () => {
    if (gameOver) reiniciarJuego();
});

// ---- Animación ----
function animar() {
    if (gameOver) return;

    // Limpiar el canvas
    context.clearRect(0, 0, Canvas.width, Canvas.height);

    // Dibujar elementos
    drawPaddle();
    drawLives();
    drawRebotes();
    drawJoystick();
    
    // Dibujar la pelota (sprite)
    drawBall();

    // Actualizar animación del sprite
    updateAnimation();

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
    if ((teclaDerecha || touchDirection === 1) && paddleX + paddleWidth < Canvas.width) {
        paddleX += paddleSpeed;
    }
    if ((teclaIzquierda || touchDirection === -1) && paddleX > 0) {
        paddleX -= paddleSpeed;
    }

    requestAnimationFrame(animar);
}

// ---- Ajustar tamaño para móvil ----
function adjustForMobile() {
    if ('ontouchstart' in window) {
        const isPortrait = window.innerHeight > window.innerWidth;
        
        if (isPortrait) {
            Canvas.width = window.innerWidth * 0.95;
            Canvas.height = window.innerHeight * 0.7;
            paddleSpeed = 8;
        } else {
            Canvas.width = window.innerWidth * 0.95;
            Canvas.height = window.innerHeight * 0.85;
            paddleSpeed = 10;
        }
        
        paddleY = Canvas.height - paddleHeight - 10;
        initJoystick();
    }
}

// ---- Inicialización para móvil ----
function initMobile() {
    if ('ontouchstart' in window) {
        adjustForMobile();
        window.addEventListener('resize', adjustForMobile);
        window.addEventListener('orientationchange', adjustForMobile);
    }
}

// ---- Manejar carga del sprite ----
fireballSprite.onload = function() {
    console.log('Sprite de fireball cargado correctamente');
    spriteLoaded = true;
};

fireballSprite.onerror = function() {
    console.log('Error al cargar el sprite de fireball');
    spriteLoaded = false;
};

// Inicializar y comenzar el juego
initJoystick();
initMobile();
animar();

