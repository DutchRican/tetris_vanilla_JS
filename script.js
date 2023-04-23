/** @type {HTMLCanvasElement} */

window.addEventListener('keyup', keyPressed, false);

const gradientBG = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
gradientBG.addColorStop(0, 'white');
gradientBG.addColorStop(1, 'black');

function drawBG() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = gradientBG;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

let game = new Game(ctx, preview_ctx);

game.start();

function keyPressed(e) {
    // console.log(e.keyCode, e);
    switch (e.key) {
        case "ArrowLeft": {
            game.currentPiece.move(game.grid, -1, 0);
            break;
        }
        case "ArrowRight": {
            game.currentPiece.move(game.grid, 1, 0);
            break;
        }
        case "ArrowDown": {
            game.currentPiece.move(game.grid, 0, 1);
            break;
        }
        case "a": {
            game.currentPiece.rotate(-1);
            break;
        }
        case "d": {
            game.currentPiece.rotate(1);
            break;
        }
    }
}


function animate() {
    drawBG();
    game.draw();
    if (!game.gameOver) {
        game.drawPreview();
        game.update();
    } else {
        game.ctx.font = "30px sans-serif";
        game.ctx.fillStyle = 'red';
        game.ctx.fillText("Game Over", 3 * BLOCK_SIZE, 10 * BLOCK_SIZE);
    }
    requestAnimationFrame(animate);
};

animate();