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