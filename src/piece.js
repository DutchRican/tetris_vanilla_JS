class Piece {
    constructor(shape) {
        this.shape = shape;
        this.x = Math.floor((ROW_COUNT / 2) - this.shape[0].length / 2);
        this.y = -3; // offsetting this so that we enter from the top
        this.hasCollided = false;
        this.currentRotation = 0;
    }

    move(grid, valX = 0, valY = 0) {
        const newX = valX ? this.x + valX : this.x;
        const newY = valY ? this.y + valY : this.y;
        if (!this.checkCollision(grid, newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
    }

    rotate(val) {
        let angle = (this.currentRotation + (val * 90) + 360) % 360;
        if (this.x + this.shape[angle][0].length > ROW_COUNT) return;
        this.currentRotation = angle;
    }

    getCurrentRotationValues() {
        return this.shape[this.currentRotation];
    }

    checkCollision(grid, posX, posY) {
        const currPiece = this.getCurrentRotationValues();
        const rowLength = currPiece.length;
        for (let row = rowLength - 1; row >= 0; row--) {
            for (let col = 0; col < currPiece[row].length; col++) {
               const currVal = currPiece[row][col] != 0 && grid[(posY) + row]?.[posX + col];
                if (currVal > 0 || (currVal == undefined && posY > 0)) {
                    // if the Y was increased we need to make sure we get the next block
                    if (posY > this.y) this.hasCollided = true;
                    return true;
                }
            }
        };
        return false;
    }

    draw(ctx) {
        this.shape[this.currentRotation].forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell > 0) {
                    ctx.fillStyle = COLORS[cell - 1];
                    ctx.strokeRect((this.x + j) * BLOCK_SIZE, (this.y + i) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    ctx.fillRect((this.x + j) * BLOCK_SIZE, (this.y + i) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            });
        });
    }
}