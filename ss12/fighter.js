const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const playerWidth = 50;
const playerHeight = 50;
const gravity = 0.5;
const speed = 5;

let player1 = {
    x: 100,
    y: canvas.height - playerHeight,
    width: playerWidth,
    height: playerHeight,
    color: 'red',
    dy: 0,
    health: 100,
    isAttacking: false
};

let player2 = {
    x: canvas.width - 150,
    y: canvas.height - playerHeight,
    width: playerWidth,
    height: playerHeight,
    color: 'blue',
    dy: 0,
    health: 100,
    isAttacking: false
};

// Vẽ nhân vật và máu
function drawPlayer(player) {
    context.fillStyle = player.color;
    context.fillRect(player.x, player.y, player.width, player.height);
    context.fillStyle = '#fff';
    context.fillText(`HP: ${player.health}`, player.x, player.y - 10);
}

// Cập nhật vị trí nhân vật
function updatePlayer(player) {
    player.y += player.dy;
    if (player.y + player.height < canvas.height) {
        player.dy += gravity;
    } else {
        player.dy = 0;
        player.y = canvas.height - player.height;
    }
}

// Kiểm tra va chạm
function detectCollision(player, opponent) {
    return player.x < opponent.x + opponent.width &&
        player.x + player.width > opponent.x &&
        player.y < opponent.y + opponent.height &&
        player.y + player.height > opponent.y;
}

// Xử lý các sự kiện phím
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'a': // Player 1 di chuyển trái
            player1.x -= speed;
            break;
        case 'd': // Player 1 di chuyển phải
            player1.x += speed;
            break;
        case 'w': // Player 1 nhảy
            if (player1.dy === 0) player1.dy = -10;
            break;
        case ' ': // Player 1 tấn công
            player1.isAttacking = true;
            break;

        case 'j': // Player 2 di chuyển trái
            player2.x -= speed;
            break;
        case 'l': // Player 2 di chuyển phải
            player2.x += speed;
            break;
        case 'i': // Player 2 nhảy
            if (player2.dy === 0) player2.dy = -10;
            break;
        case 'o': // Player 2 tấn công
            player2.isAttacking = true;
            break;
    }
});

// Vòng lặp game
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ và cập nhật người chơi
    drawPlayer(player1);
    drawPlayer(player2);
    updatePlayer(player1);
    updatePlayer(player2);

    // Kiểm tra tấn công
    if (player1.isAttacking && detectCollision(player1, player2)) {
        player2.health -= 5;
        player1.isAttacking = false;
    }

    if (player2.isAttacking && detectCollision(player2, player1)) {
        player1.health -= 5;
        player2.isAttacking = false;
    }

    // Kiểm tra kết thúc game
    if (player1.health <= 0) {
        alert('Player 2 wins!');
        resetGame();
    }
    if (player2.health <= 0) {
        alert('Player 1 wins!');
        resetGame();
    }

    requestAnimationFrame(gameLoop);
}

function resetGame() {
    player1.health = 100;
    player2.health = 100;
    player1.x = 100;
    player2.x = canvas.width - 150;
}

// Bắt đầu game
gameLoop();
