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

- 用 ES5 实现一个继承（有哪些方式）
>借用构造函数（constructor stealing）的技术（有时候也叫做伪造对象或经典继承）。这种技术的基本思想相当简单，即在子类型构造函数的内部调用超类型构造函数。别忘了，函数只不过是在特定环境中执行代码的对象，因此通过使用 apply()和 call()方法也可以在（将来）新创建的对象上执行构造函数，如下所示
___
- 冒充继承
```javascript
function Person(name,age){
       this.name = name ;
       this.age = age;
       this.showName = function(){
           console.log('我是'+name);
    }
}
/** 
*  @description 以自身运行环境运行函数，这时函数内的this均指向Child，
*  因此父类的属性全部移植到子类中
*/
function Child(){
       //这三句代码最关键
       this.temp = Person; //创建一个自身缓存函数并将父类构造赋值
       this.temp('李端','26');
       delete this.temp;//删除缓存函数
}
var child = new Child();
child.showName();//我是李端
```
>修改this指向
```javascript
// 直接修改
function Person(name,age){
       this.name = name ;
       this.age = age;
       this.showName = function(){
           console.log('我是'+name);
    }
}

/** 
 *  @description 以自身运行环境运行函数，这时函数内的this均指向Child，
 *  因此父类的属性全部移植到子类中
 */
function Child(){
       Person.bind(this)('李端','26'); //绑定this到Person运行环境执行函数
}
var child = new Child();
child.showName();//我是李端

// call修改
function Person(name,age){
    this.name = name ;
    this.age = age;
    this.showName = function(){
        console.log('我是'+name);
    }
}
function Child(){
    Person.call(this,'李端','26');
};
var child = new Child();
child.showName();

//apply 修改
function Person(name,age){
    this.name = name ;
    this.age = age;
    this.showName = function(){
        console.log('我是'+name);
    }
 }
 function Child(){
    Person.apply(this,['李端','26']);
 };
 var child = new Child();
```

- 原型继承
```javascript
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.sayHello = function(){
    alert('使用原型得到'+this.name);
}
var per = new Person('李端','26');
per.sayHello();
//创建新对象并实现继承
function Student(){};
Student.prototype = new Person('端瑞','23')
var stu = new Student();
stu.sayHello();
```

- 组合继承
>>组合继承（combination inheritance），有时候也叫做伪经典继承，指的是将原型链和借用构造函数的技术组合到一块，从而发挥二者之长的一种继承模式。其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性。下面来看一个例子

```javascript
function SuperType(name){
 this.name = name;
 this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
 alert(this.name);
}; 

function SubType(name, age){
 //继承属性
 SuperType.call(this, name);
 this.age = age;
} 
//继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function(){
 alert(this.age);
};
var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29
var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27 
```
- 寄生继承
>寄生式（parasitic）继承是与原型式继承紧密相关的一种思路，并且同样也是由克罗克福德推而广之的。寄生式继承的思路与寄生构造函数和工厂模式类似，即创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。以下代码示范了寄生式继承模式。
在这个例子中，createAnother()函数接收了一个参数，也就是将要作为新对象基础的对象。然后，把这个对象（original）传递给 object()函数，将返回的结果赋值给 clone。再为 clone 对象添加一个新方法 sayHi()，最后返回 clone 对象。可以像下面这样来使用 createAnother()函数

```javascript
function createAnother(original){
 var clone = Object(original); //通过调用函数创建一个新对象
 clone.sayHi = function(){ //以某种方式来增强这个对象
 alert("hi");
 };
 return clone; //返回这个对象
}
var person = {
 name: "Nicholas",
 friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi" 
``` 

- 寄生组合继承
>寄生组合式继承，即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。其背后的基本思路是：不必为了指定子类型的原型而调用超类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已。本质上，就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。寄生组合式继承的基本模式如下所示
```javascript
function inheritPrototype(subType, superType){
 var prototype = Object(superType.prototype); //创建对象
 prototype.constructor = subType; //增强对象
 subType.prototype = prototype; //指定对象
}

function SuperType(name){
 this.name = name;
 this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
 alert(this.name);
};

function SubType(name, age){
 SuperType.call(this, name);

 this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function(){
 alert(this.age);
}; 
```
---

- 堆、栈、队列是什么？都有什么区别？有什么应用？
> https://www.cnblogs.com/slly/p/10366290.html

- 深拷贝、浅拷贝问题（immutable是怎么实现的？）
>

- 什么是 iterator？for of 用过吗？
> https://juejin.im/entry/57a4a4dc0a2b58005846520a

- call、apply、bind 区别，bind 怎么实现的？
> 

```javascript

// 理解版
Function.prototype.bind2 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fbound = function () {

        var bindArgs = Array.prototype.slice.call(arguments);
        // 当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `fbound.prototype = this.prototype;`，已经修改了 fbound.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。
        // 当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。
        self.apply(this instanceof self ? this : context, args.concat(bindArgs));
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值
    fbound.prototype = this.prototype;
    return fbound;
}

// finally version
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var fNOP = function () {};

    var fbound = function () {
        self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
    }

    fNOP.prototype = this.prototype;
    fbound.prototype = new fNOP();

    return fbound;

}
```

- caller、callee 了解吗？什么时候会用到？建议用吗？
> caller获取当前函数是被谁调用的，callee同理，匿名函数中通过arguments.callee 调用其本身，不过用命名函数一样可以实现，因此不建议使用该属性

```javascript
function (value) {
  let a += value;
  arguments.callee(1)
}
```

- Promise  && Promise.all && Promise.race
> https://juejin.im/post/5d3f0a38f265da03bb4a81ff#heading-5
```javascript
const all (promiseList) {
    return new Promise (resolve, reject) {
        let returnList = [];
        let errFlag = false
        let errList = [];
        let count = 0;
        for (let i = 0; i < promiseList.length; i++) {
            promiseList[i].then(res => {
                returnList[i] = res
                count++
            }).catch(err => {
                errFlag =  true;
                errList[i] = err;
            })
        }
        if (count === promiseList.length) {
            errFlag ? reject(errList) : resolve(returnList)
        }
    }
}
all([Promise1,Promise2,Promise3]).then(res => {
    // res
}).catch(err => {
    // err
})

race (promiseAry) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promiseAry.length; i++) {
      promiseAry[i].then(resolve, reject)
    }
  })
}

all([Promise1,Promise2,Promise3]).then(res => {
    // single promise res
}).catch(err => {
    // err
})
```

- async && await 
> 

- Generator 函数
>\

- v8 线程模型、event loop（async、promise、nextTick、setTimeout、setImmediate）
> https://juejin.im/post/5ee88ecde51d457876201c94#heading-8
> 同步代码-->全部微任务-->单个宏任务-->全部微任务-->单个宏任务.....(循环往复)

- 进程和线程是什么？有什么区别？
> 类似”进程是资源分配的最小单位，线程是CPU调度的最小单位“这样的回答感觉太抽象，都不太容易让人理解。做个简单的比喻：进程=火车，线程=车厢线程在进程下行进（单纯的车厢无法运行）一个进程可以包含多个线程（一辆火车可以有多个车厢）不同进程间数据很难共享（一辆火车上的乘客很难换到另外一辆火车，比如站点换乘）同一进程下不同线程间数据很易共享（A车厢换到B车厢很容易）进程要比线程消耗更多的计算机资源（采用多列火车相比多个车厢更耗资源）进程间不会相互影响，一个线程挂掉将导致整个进程挂掉（一列火车不会影响到另外一列火车，但是如果一列火车上中间的一节车厢着火了，将影响到所有车厢）进程可以拓展到多机，进程最多适合多核（不同火车可以开在多个轨道上，同一火车的车厢不能在行进的不同的轨道上）进程使用的内存地址可以上锁，即一个线程使用某些共享内存时，其他线程必须等它结束，才能使用这一块内存。（比如火车上的洗手间）－"互斥锁"进程使用的内存地址可以限定使用量（比如火车上的餐厅，最多只允许多少人进入，如果满了需要在门口等，等有人出来了才能进去）－“信号量”

- 输入 URL，浏览器的执行过程又是怎么样的？
>