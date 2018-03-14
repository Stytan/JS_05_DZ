//Чему равно свойство после delete?

view('Чему равно свойство после delete?', 'h3');

view(`var animal = {
  jumps: null
};
var rabbit = {
  jumps: true
};
rabbit.__proto__ = animal;
alert( rabbit.jumps ); // ? (1)
delete rabbit.jumps;
alert( rabbit.jumps ); // ? (2)
delete animal.jumps;
alert( rabbit.jumps ); // ? (3)`, 'pre');

view(`1 - true т.к. первым будет найдено свойство в rabbit
2 - null т.к. будет найдено свойство из прототипа
3 - undefined т.к. свойство будет удалено из прототипа`, 'pre');

//Прототип и this

view('Прототип и this', 'h3');

view('Сработает ли вызов rabbit.eat() ?', 'code');

view(`var animal = {
  eat: function() {
    this.full = true;
  }
};
var rabbit = {
  __proto__: animal
};
rabbit.eat();`, 'pre');

view(`Вызов eat() сработает т.к. будет найден в прототипе
Свойство будет добавлено в rabbit во время вызова eat()`, 'pre');


//Алгоритм для поиска

view('Алгоритм для поиска', 'h3');

view(`Присвойте объектам ссылки __proto__ так, чтобы любой поиск чего-либо шёл по алгоритму pockets -> bed -> table -> head.
То есть pockets.pen == 3, bed.glasses == 1, но table.money == undefined.
После этого ответьте на вопрос, как быстрее искать glasses: обращением к pockets.glasses или head.glasses? Попробуйте протестировать.`, 'pre');

var head = {
  glasses: 1
};

var table = {
  pen: 3,
  __proto__: head
};

var bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table
};

var pockets = {
  money: 2000,
  __proto__: bed
};

view('Бысрее найдёт через head.glasses');
alert( pockets.pen ); // 3
alert( bed.glasses ); // 1
alert( table.money ); // undefined

//Свойство F.prototype и создание объектов через new

view('Свойство F.prototype и создание объектов через new', 'h2');

view('Каковы будут результаты выполнения? Почему?', 'h3');

view(`function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

var rabbit = new Rabbit();

alert( rabbit.eats );`, 'pre');

view('Выведет true т.к. это свойство будет найдено в прототипе');

view(`function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

var rabbit = new Rabbit();

Rabbit.prototype = {};

alert( rabbit.eats );`, 'pre');

view('Выведет true т.к. изменена ссылка в Rabbit.prototype, а rabbit.__proto__ не изменился');

view(`function Rabbit(name) {}
Rabbit.prototype = {
  eats: true
};

var rabbit = new Rabbit();

Rabbit.prototype.eats = false;

alert( rabbit.eats );`, 'pre');

view('Выведет false, т.к. по ссылке Rabbit.prototype.eats будет изменён сам объект прототипа');

view(`function Rabbit(name) {}
Rabbit.prototype = {
  eats: true
};

var rabbit = new Rabbit();

delete rabbit.eats; // (*)

alert( rabbit.eats );`, 'pre');

view('Выведет true т.к. в rabbit нет свойства eats и delete ничего не удалит');

view(`function Rabbit(name) {}
Rabbit.prototype = {
  eats: true
};

var rabbit = new Rabbit();

delete Rabbit.prototype.eats; // (*)

alert( rabbit.eats );`, 'pre');

view('Выведет undefined, т.к. eats будет удалён из самого прототипа');

//Аргументы по умолчанию

view('Аргументы по умолчанию', 'h3');

view('При помощи наследования и Object.create предложите третий способ, ' +
  'который позволяет избежать копирования объекта и не требует новых переменных', 'h4');

function Menu(options) {
  options = Object.create(options);
  //Ставим значение по умолчанию только если оно изначально не задано
  if(!options.width) options.width = 300;

  view("<br>Menu.width: " + options.width, 'code');
  view("<br>Menu.height: " + options.height, 'code');
}

var options = {
  //width: 100,
  height: 200
};

var menu = new Menu(options);

options.width = 100;

var menu2 = new Menu(options);

view("<br>original width: " + options.width, 'code');
view("<br>original height: " + options.height, 'code');

//Есть ли разница между вызовами?
view('Есть ли разница между вызовами?', 'h3');

view(`function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert( this.name );
};

var rabbit = new Rabbit("Rabbit");

rabbit.sayHi();  (1)
Rabbit.prototype.sayHi();  (2)
Object.getPrototypeOf(rabbit).sayHi();  (3)
rabbit.__proto__.sayHi();   (4)`, 'pre');

view(`1 - Выдаст имя т.к. this установлен на rabbit (кроссбраузерно)
2 - undefined т.к. this установлен на прототип в котором нет name (кроссбраузерно)
3 - undefined т.к. this установлен на прототип в котором нет name (не работает в IE8-)
4 - undefined т.к. this установлен на прототип в котором нет name (не работает в IE10-)`, 'pre');


//Создать объект тем же конструктором
view('Создать объект тем же конструктором', 'h3');

view(`Сможем ли мы сделать так?

var obj2 = new obj.constructor();`, 'pre');

view('Сможем если уверены что разработчик obj позаботился о правильно установленном constructor');


//Добавить функциям defer
view('Добавить функциям defer', 'h3');

Function.prototype.defer = function (ms) {
  var self = this;
  return function() {
    setTimeout(self.apply(self, arguments), ms);
  }
};

Object.defineProperty(Function.prototype, 'defer', { enumerable: false });

//Проверка
function f() {
  alert( "привет" );
}

f.defer(1000)(); // выведет "привет" через 1 секунду

function f2(a, b) {
  alert( a + b );
}

f2.defer(1000)(1, 2); // выведет 3 через 1 секунду.

//Свои классы на прототипах

view('Свои классы на прототипах', 'h2');

view('Перепишите CoffeeMachine в виде класса', 'h3');

function CoffeeMachine(power) {
  this._waterAmount = 0;
  this._power = power;
}

CoffeeMachine.prototype.WATER_HEAT_CAPACITY = 4200;

CoffeeMachine.prototype._getTimeToBoil = function () {
  return this._waterAmount * this.WATER_HEAT_CAPACITY * 80 / this._power;
};

CoffeeMachine.prototype.run = function() {
  setTimeout(function () {
    alert('Прототипный кофе готов!');
  }, this._getTimeToBoil());
};

CoffeeMachine.prototype.setWaterAmount = function(amount) {
  this._waterAmount = amount;
};


var coffeeMachine = new CoffeeMachine(10000);
coffeeMachine.setWaterAmount(50);
coffeeMachine.run();

//Хомяки с __proto__

view('Хомяки с __proto__', 'h3');

view(`function Hamster() {
  this.food = [];
}

Hamster.prototype.found = function(something) {
  this.food.push(something);
};

// Создаём двух хомяков и кормим первого
var speedy = new Hamster();
var lazy = new Hamster();

speedy.found("яблоко");
speedy.found("орех");

alert( speedy.food.length ); // 2
alert( lazy.food.length ); // 2 (!??)

Нужно было перенести food из прототипа внутрь объекта Hamster,
чтоб у каждого нового хомяка создавался свой массив`, 'pre');

//Наследование классов в JavaScript
view('Наследование классов в JavaScript', 'h2');

view('Найдите ошибку в наследовании', 'h3');

view(`function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function() {
  alert( "ходит " + this.name );
};

function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype = Animal.prototype;

Rabbit.prototype.walk = function() {
  alert( "прыгает! и ходит: " + this.name );
};`, 'pre');

view('Ошибка заключается в том, что Rabbit.prototype присваивается ссылка на <br>' +
  'Animal.prototype, что в дальнейшем приводит к замене метода walk в Animal.<br>' +
  'В Rabbit.prototype следует присваивать новый объект созданный на основе Animal.prototype');

//В чём ошибка в наследовании
view('В чём ошибка в наследовании', 'h3');
view(`function Animal(name) {
  this.name = name;

  this.walk = function() {
    alert( "ходит " + this.name );
  };

}

function Rabbit(name) {
  Animal.apply(this, arguments);
}
Rabbit.prototype = Object.create(Animal.prototype);

Rabbit.prototype.walk = function() {
  alert( "прыгает " + this.name );
};

var rabbit = new Rabbit("Кроль");
rabbit.walk();`, 'pre');

view('Функция walk создаётся в объекте Animal, а не в его прототипе, в результате <br>' +
  'при вызове в конструкторе Rabbit контсруктора Animal этот метод создаётся в самом <br>' +
  'объекте rabbit и перекрывает созданный в прототипе метод.');

//Класс "часы"
view('Класс "часы"', 'h3');

view('Задача: переписать часы на прототипах. ' +
  'Приватные свойства и методы сделать защищёнными','h4');

function Clock(options) {
  this._template = options.template.toString();
}

Clock.prototype._render = function () {
  let date = new Date();

  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;

  let min = date.getMinutes();
  if (min < 10) min = '0' + min;

  let sec = date.getSeconds();
  if (sec < 10) sec = '0' + sec;

  let output = this._template.replace('h', hours).replace('m', min).replace('s', sec);

  console.log(output);
};

Clock.prototype.stop = function() {
  clearInterval(this._timer);
};

Clock.prototype.start = function() {
  this._render();
  let self = this;
  this._timer = setInterval(() => self._render(), 1000);
};


// var clock = new Clock({
//   template: 'h:m:s'
// });
// clock.start();

//Класс "расширенные часы"
view('Класс "расширенные часы"', 'h3');
view(`Создайте класс, расширяющий её, добавляющий поддержку параметра precision,
который будет задавать частоту тика в setInterval. Значение по умолчанию: 1000`, 'h4');

function ExtendedClock (options) {
  Clock.apply(this, arguments);
  this._precision = +options.precision || 1000;
}

ExtendedClock.prototype = Object.create(Clock.prototype);

ExtendedClock.prototype.constructor =ExtendedClock;

ExtendedClock.prototype.start = function() {
  this._render();
  let self = this;
  this._timer = setInterval(() => self._render(), this._precision);
};

var eClock = new ExtendedClock({
  template: 'h:m:s',
  precision: 2000
});
eClock.start();


//Меню с таймером для анимации

function Menu(state) {
  this._state = state || Menu.STATE_CLOSED;
};

Menu.STATE_OPEN = 1;
Menu.STATE_CLOSED = 0;

Menu.prototype.open = function() {
  this._state = Menu.STATE_OPEN;
};

Menu.prototype.close = function() {
  this._state = Menu.STATE_CLOSED;
};

Menu.prototype._stateAsString = function() {
  switch (this._state) {
    case Menu.STATE_OPEN:
      return 'открыто';

    case Menu.STATE_CLOSED:
      return 'закрыто';
  }
};

Menu.prototype.showState = function() {
  alert(this._stateAsString());
};


function AnimatingMenu(state) { // замените на ваш код для AnimatingMenu
  Menu.apply(this, arguments);
}

AnimatingMenu.prototype = Object.create(Menu.prototype);
AnimatingMenu.prototype.constructor = AnimatingMenu;

AnimatingMenu.STATE_ANIMATING = 2;

AnimatingMenu.prototype.open = function() {
  this._state = AnimatingMenu.STATE_ANIMATING;
  let self = this;
  this._timer = setTimeout(() => Menu.prototype.open.apply(self, arguments), 1000);
};

AnimatingMenu.prototype.close = function() {
  clearTimeout(this._timer);
  Menu.prototype.close.apply(this, arguments);
};

AnimatingMenu.prototype.showState = function() {
  if(this._state === AnimatingMenu.STATE_ANIMATING)
    alert('анимация');
  else Menu.prototype.showState.apply(this, arguments);
};
// использование..

var menu = new AnimatingMenu();

menu.showState(); // закрыто

menu.open();
menu.showState(); // анимация

setTimeout(function() {
  menu.showState(); // открыто

  menu.close();
  menu.showState(); // закрыто (закрытие без анимации)
}, 1000);


//Что содержит constructor?

view('Что содержит свойство rabbit.constructor? <br>' +
  'Распознает ли проверка в alert объект как Rabbit?', 'h3');

view(`function Animal() {}

function Rabbit() {}
Rabbit.prototype = Object.create(Animal.prototype);

var rabbit = new Rabbit();

alert( rabbit.constructor == Rabbit ); // что выведет?`, 'pre');

view('rabbit.constructor содержит ссылку на Animal скопированную из Animal.prototype');