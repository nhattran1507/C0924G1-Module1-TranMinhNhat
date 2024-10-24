const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const playerWidth = 50;
const playerHeight = 50;
const gravity = 0.5;
const speed = 5;

let player = {
    x: 100,
    y: canvas.height - playerHeight,
    width: playerWidth,
    height: playerHeight,
    color: 'green',
    dy: 0,
    health: 100,
    isAttacking: false
};

let enemy = {
    x: canvas.width - 150,
    y: canvas.height - playerHeight,
    width: playerWidth,
    height: playerHeight,
    color: 'red',
    dy: 0,
    health: 100,
    isAttacking: false
};

// Vẽ nhân vật và máu
function drawCharacter(character) {
    context.fillStyle = character.color;
    context.fillRect(character.x, character.y, character.width, character.height);
    context.fillStyle = '#fff';
    context.fillText(`HP: ${character.health}`, character.x, character.y - 10);
}

// Cập nhật vị trí nhân vật
function updateCharacter(character) {
    character.y += character.dy;
    if (character.y + character.height < canvas.height) {
        character.dy += gravity;
    } else {
        character.dy = 0;
        character.y = canvas.height - character.height;
    }
}

// Kiểm tra va chạm
function detectCollision(attacker, defender) {
    return attacker.x < defender.x + defender.width &&
        attacker.x + attacker.width > defender.x &&
        attacker.y < defender.y + defender.height &&
        attacker.y + attacker.height > defender.y;
}

// Xử lý các sự kiện phím
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'a': // Player di chuyển trái
            player.x -= speed;
            break;
        case 'd': // Player di chuyển phải
            player.x += speed;
            break;
        case 'w': // Player nhảy
            if (player.dy === 0) player.dy = -10;
            break;
        case ' ': // Player tấn công
            player.isAttacking = true;
            break;
    }
});

// AI đơn giản cho kẻ địch
function enemyAI() {
    // Kẻ địch di chuyển ngẫu nhiên
    const randomAction = Math.floor(Math.random() * 50);
    if (randomAction < 2) {
        enemy.x -= speed;
    } else if (randomAction < 4) {
        enemy.x += speed;
    } else if (randomAction < 5 && enemy.dy === 0) {
        enemy.dy = -10;
    } else if (randomAction < 6) {
        enemy.isAttacking = true;
    }
}

// Vòng lặp game
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ và cập nhật nhân vật
    drawCharacter(player);
    drawCharacter(enemy);
    updateCharacter(player);
    updateCharacter(enemy);
    enemyAI();

    // Kiểm tra tấn công
    if (player.isAttacking && detectCollision(player, enemy)) {
        enemy.health -= 5;
        player.isAttacking = false;
    }

    if (enemy.isAttacking && detectCollision(enemy, player)) {
        player.health -= 5;
        enemy.isAttacking = false;
    }

    // Kiểm tra kết thúc game
    if (player.health <= 0) {
        alert('Bạn đã thua!');
        resetGame();
    }
    if (enemy.health <= 0) {
        alert('Bạn đã thắng!');
        resetGame();
    }

    requestAnimationFrame(gameLoop);
}

function resetGame() {
    player.health = 100;
    enemy.health = 100;
    player.x = 100;
    enemy.x = canvas.width - 150;
}

// Bắt đầu game
gameLoop();
