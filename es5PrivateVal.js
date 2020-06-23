// 闭包实现私有变量
function Shape() {
    // 私有变量集
    const this$ = {};

    class Shape {
        constructor(width, height) {
            this$.width = width;
            this$.height = height;
        }

        get area() {
            return this$.width * this$.height;
        }
    }

    return new Shape(...arguments);
}

const square = new Shape(10, 10);
console.log(square.area);  // 100