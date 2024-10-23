class Rectangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
    }
    getArea() {
        return this.length * this.width;
    }
    getPerimeter() {
        return 2 * (this.length + this.width);
    }
    draw(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (canvas.getContext) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas trước khi vẽ

            ctx.fillRect(10, 10, this.width, this.length); // Vẽ hình chữ nhật tại tọa độ (10, 10)
        }
    }
}