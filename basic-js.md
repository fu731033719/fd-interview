### js、nodejs 基础 

- 闭包
> 闭包就是能够读取其他函数内部变量的函数


- 作用域
> 作用域是在运行时代码中的某些特定部分中变量，函数和对象的可访问性。换句话说，作用域决定了代码区块中变量和其他资源的可见性。
> ```javascript
> function outFun2() {
>    var inVariable = "内层变量2";
> }
> outFun2();//要先执行这个函数，否则根本不知道里面是啥
> console.log(inVariable); // Uncaught ReferenceError: inVariable is not defined
> ```
> 从上面的例子可以体会到作用域的概念，变量inVariable在全局作用域没有声明，所以在全局作用域下取值会报错。我们可以这样理解：作用域就是一个独立的地盘，让变量不会外泄、暴露出去。也就是说作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。
ES6 之前 JavaScript 没有块级作用域,只有全局作用域和函数作用域。ES6的到来，为我们提供了‘块级作用域’,可通过新增命令let和const来体现。
- 原型链
>原型链

- 变量提升
> 创建函数有两种形式，一种是函数声明，另外一种是函数字面量，只有函数声明才有变量提升
> ```javascript
>console.log(a)  // f a() { console.log(a) }
>console.log(b) //undefined
>function a() {
>  console.log(a) 
>}
>var b = function(){
>		console.log(b)
>}
> ```
>相当于
>```javascript
>var a = 'function'
>var b
>console.log(a)
>console.log(b)
>```
>```javascript
>console.log(a);    // f a() {console.log(10)}
>console.log(a());    //  undefined
>var a = 3;
>
>function a() {
>		console.log(10) //10
>}
>console.log(a)   //3
>a = 6;
>console.log(a());  //a is not a function;
>```
>函数提升要比变量提升的优先级要高一些，且不会被变量声明覆盖，但是会被变量赋值之后覆盖。


- new 操作符做了什么？
>new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。new 关键字会进行如下的操作：
创建一个空的简单JavaScript对象（即{}）；
链接该对象（即设置该对象的构造函数）到另一个对象 ；
将步骤1新创建的对象作为this的上下文 ；
如果该函数没有返回对象，则返回this。
```javascript
function create(Con, ...args){
  // 创建一个空的对象
  let  obj = Object.create(null);
  // 将空对象指向构造函数的原型链
  Object.setPrototypeOf(obj, Con.prototype);
  // obj绑定到构造函数上，便可以访问构造函数中的属性，即obj.Con(args)
  let result = Con.apply(obj, args);
  // 如果返回的result是一个对象则返回
  // new方法失效，否则返回obj
  return result instanceof Object ? result : obj;
}

// 测试
function company(name, address) {
    this.name = name;
    this.address = address;
  }

var company1 = create(company, 'yideng', 'beijing');
console.log('company1: ', company1);
```
