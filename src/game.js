function makeGrid(width, height) {
    const playGroundGrid = [];
    for (let col = 0; col < height; col++) {
        const tempCol = []
        for (let row = 0; row < width; row++) {
            tempCol.push(0);
        }
        playGroundGrid.push(tempCol);
    }
    return playGroundGrid;
}

function getRandomPiece(ctx) {
    const blockPieces = Object.keys(TetrisBlocks);
    const piece = blockPieces[Math.floor(Math.random() * blockPieces.length)];
    return new Piece(TetrisBlocks[piece], ctx);
}

class Game {
    constructor(ctx, preview) {
        this.ctx = ctx;
        this.preview_ctx = preview;
        this.grid = makeGrid(10, 20);
        this.previewGrid = makeGrid(4, 4);
        this.currentPiece = null;
        this.nextPiece = getRandomPiece(this.ctx);
        this.isRunning = false;
        this.gameFrame = 0;
        this.gameSpeed = 40;
        this.gameOver = false;
        this.score = 0;
    }

    start() {
        this.currentPiece = this.nextPiece;
        this.nextPiece = getRandomPiece();
        this.isRunning = true;
        this.gameFrame = 0;
    }

    drawPreview() {
        this.preview_ctx.clearRect(0, 0, preview.width, preview.height);
        const offset = this.nextPiece.shape[0].length / 2;
        this.nextPiece.shape[0].forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell > 0) {
                    this.preview_ctx.fillStyle = COLORS[cell - 1];
                    this.preview_ctx.strokeRect((j + offset) * PREVIEW_BLOCK_SIZE, (i + 1) * PREVIEW_BLOCK_SIZE, PREVIEW_BLOCK_SIZE, PREVIEW_BLOCK_SIZE);
                    this.preview_ctx.fillRect((j + offset) * PREVIEW_BLOCK_SIZE, (i + 1) * PREVIEW_BLOCK_SIZE, PREVIEW_BLOCK_SIZE, PREVIEW_BLOCK_SIZE);
                }
            });
        });
    }

    update() {
        if (this.isRunning) {
            if (this.gameFrame % this.gameSpeed === 0 && !this.currentPiece.hasCollided) {
                this.currentPiece.move(this.grid, 0, 1);
            }
            this.gameFrame++;
        }
    }

    freezePiece() {
        try {
            const currPieceValues = this.currentPiece.getCurrentRotationValues();
            for (let row = 0; row < currPieceValues.length; row++) {
                for (let col = 0; col < currPieceValues[row].length; col++) {
                    if (currPieceValues[row][col] == 0) continue;
                    const x = this.currentPiece.x + col;
                    const y = (this.currentPiece.y) + row;
                    this.grid[y][x] = currPieceValues[row][col];
                }
            }
            this.currentPiece.hasCollided = true;
            this.currentPiece = this.nextPiece;
            this.nextPiece = getRandomPiece();
        } catch {
            this.gameOver = true;
        }
    }

    removeRowsDrawGrid() {
        let fullLineIndexes = [];
        this.grid.forEach((row, i) => {
            if (row.every(cell => cell > 0)) { fullLineIndexes.push(i); } else {
                row.forEach((cell, j) => {
                    if (cell > 0) {
                        this.ctx.fillStyle = COLORS[cell - 1];
                        this.ctx.strokeRect(j * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                        this.ctx.fillRect(j * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    }
                });
            }
        });
        let multiplier = 1;
        fullLineIndexes.forEach(index => {
            multiplier += multiplier + index / 3;
            this.grid.splice(index, 1);
            this.grid.unshift(new Array(10).fill(0));
        });
        this.score += Math.floor(fullLineIndexes.length * multiplier);
        scoreOut.innerText = this.score;
    }
    draw() {
        this.removeRowsDrawGrid();

        if (!this.currentPiece.hasCollided) {
            this.currentPiece?.draw(this.ctx);
        } else {
            this.freezePiece();
        }

    }
}
