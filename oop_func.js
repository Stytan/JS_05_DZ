/**
 * Created by sergey.lezhenko on 13.03.2018.
 */

//Добавить метод и свойство кофеварке
view('Добавить метод и свойство кофеварке', 'h3');
view(`Добавьте в кофеварку публичный метод stop(), который будет останавливать кипячение (через clearTimeout).
Добавьте кофеварке геттер для приватного свойства power.
Добавьте кофеварке публичный метод addWater(amount), который будет добавлять воду.
Создайте сеттер setOnReady, чтобы код снаружи мог назначить свой onReady.
Для этого добавьте кофеварке публичный метод isRunning().
Запускать только при включённой кофеварке.
Останавливать кофеварку при выключении.`, 'pre');

function Machine(power) {
  this._power = power;
  this._enabled = false;

  let self = this;

  this.enable = function() {
    self._enabled = true;
  };

  this.disable = function() {
    self._enabled = false;
  };

  this.isEnabled = function() {
    return self._enabled;
  }
}


function CoffeeMachine(power, capacity) {
  Machine.apply(this, arguments);

  let waterAmount = 0;
  let timerId = null;

  const WATER_HEAT_CAPACITY = 4200;

  let self = this;

  function getBoilTime() {
    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  function onReady() {
    alert( 'Кофе готово!' );
  }

  this.isRunning = function() {
    return !!timerId;
  };

  this.setOnReady = function (newOnReady) {
    onReady = newOnReady;
  };

  let parentEnable = this.enable;
  this.enable = function() {
    parentEnable(); // теперь можно вызывать как угодно, this не важен
    //this.run();
  };

  let parentDisable = this.disable;
  this.disable = function() {
    parentDisable();
    self.stop();
  };

  this.run = function() {
    if(!self.isEnabled()) {
      throw new Error("Кофеварка выключена.");
    }
    timerId = setTimeout(
      function() {
        timerId = null;
        onReady();
      }, getBoilTime());
  };

  this.stop = function() {
    if(timerId) {
      clearTimeout(timerId);
    }
  };

  this.setWaterAmount = function(amount) {
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить воды больше, чем " + capacity);
    }

    waterAmount = amount;
  };

  this.getWaterAmount = function() {
    return waterAmount;
  };

  this.getPower = function () {
    return power;
  };

  this.addWater = function (amount) {
    self.setWaterAmount( self.getWaterAmount() + amount );
  };
}

//Проверка stop()
var coffeeMachine1 = new CoffeeMachine(50000, 400);
coffeeMachine1.waterAmount = 200;
coffeeMachine1.enable();
coffeeMachine1.run();
coffeeMachine1.stop(); // кофе приготовлен не будет

//Проверка addWater()
var coffeeMachine2 = new CoffeeMachine(100000, 400);
coffeeMachine2.addWater(200);
coffeeMachine2.addWater(100);
try {
  coffeeMachine2.addWater(300); // Нельзя залить больше, чем 400
} catch (e) {
  view('Error: ' + e.message);
}
coffeeMachine2.enable();
coffeeMachine2.run();

//Проверка setOnReady()
var coffeeMachine3 = new CoffeeMachine(20000, 500);
coffeeMachine3.setWaterAmount(150);

coffeeMachine3.setOnReady(function() {
  var amount = coffeeMachine3.getWaterAmount();
  alert( 'Готов кофе: ' + amount + 'мл' ); // Кофе готов: 150 мл
});
coffeeMachine3.enable();
coffeeMachine3.run();

//Проверка isRunning()
var coffeeMachine4 = new CoffeeMachine(20000, 500);
coffeeMachine4.setWaterAmount(100);

alert( 'До: ' + coffeeMachine4.isRunning() ); // До: false
coffeeMachine4.enable();
coffeeMachine4.run();
alert( 'В процессе: ' + coffeeMachine4.isRunning() ); // В процессе: true

coffeeMachine4.setOnReady(function() {
  alert( "После: " + coffeeMachine4.isRunning() ); // После: false
});

//Проверка запуска только при включённой кофеварке
var coffeeMachine5 = new CoffeeMachine(10000);
try {
  coffeeMachine5.run(); // ошибка, кофеварка выключена!
} catch (e) {
  view('Error: ' + e.message);
}

var coffeeMachine6 = new CoffeeMachine(10000);
coffeeMachine6.enable();
coffeeMachine6.run(); // ...Кофе готов!

//Проверка остановки кофеварки при выключении
var coffeeMachine7 = new CoffeeMachine(10000);
coffeeMachine7.enable();
coffeeMachine7.run();
coffeeMachine7.disable(); // остановит работу, ничего не выведет


//Написать объект с геттерами и сеттерами
view('Написать объект с геттерами и сеттерами', 'h3');
view(`Напишите конструктор User для создания объектов:
С приватными свойствами имя firstName и фамилия surname.
С сеттерами для этих свойств.
С геттером getFullName(), который возвращает полное имя.`, 'pre');

function User() {
  let _firstName;
  let _surname;

  this.setFirstName = function (firstName) {
    _firstName = firstName;
  };

  this.getFirstName = function () {
    return _firstName;
  };

  this.setSurname = function (surname) {
    _surname = surname;
  };

  this.getSurname = function () {
    return _surname;
  };

  this.getFullName = function () {
    return _firstName + ' ' + _surname;
  }
}

var user = new User();
user.setFirstName("Петя");
user.setSurname("Иванов");

alert( user.getFullName() ); // Петя Иванов


//Унаследуйте холодильник
view('Унаследуйте холодильник', 'h3');
view(`Создайте класс для холодильника Fridge(power), наследующий от Machine,
с приватным свойством food и методами addFood(...), getFood():
Приватное свойство food хранит массив еды.
Публичный метод addFood(item) добавляет в массив food новую еду,
 доступен вызов с несколькими аргументами addFood(item1, item2...) для добавления нескольких элементов сразу.
Если холодильник выключен, то добавить еду нельзя, будет ошибка.
Максимальное количество еды ограничено power/100, где power – мощность холодильника,
 указывается в конструкторе. При попытке добавить больше – будет ошибка
Публичный метод getFood() возвращает еду в виде массива, добавление или удаление элементов
 из которого не должно влиять на свойство food холодильника.
Публичный метод filterFood(func), который возвращает всю еду, для которой func(item) == true
Публичный метод removeFood(item), который удаляет еду item из холодильника.
Переопределите метод disable холодильника, чтобы при наличии в нём еды он выдавал ошибку.`, 'pre');

//Холодильник
function Fridge(power) {
  Machine.apply(this, arguments);

  let food = [];
  let self = this;
  let capacity = Math.floor(self._power/100);

  this.addFood = function () {
    if(!self._enabled) throw new Error('Нельзя добавить! Холодильник выключен.');

    for( let i=0; i < arguments.length; i++) {
      if(food.length >= capacity)
        throw new Error('Некуда класть! Холодильник полон.');
      food.push(arguments[i]);
    }
  };

  this.getFood = function () {
    return food.slice();
  };

  this.filterFood = function(filterFunc) {
    return food.filter(filterFunc);
  };

  this.removeFood = function(item) {
    let i = food.indexOf(item);
    if(i !== -1) {
      food.splice(i,1);
    }
  };

  let parentDisable = this.disable;
  this.disable = function() {
    if(food.length) throw new Error('Нельзя выключить. Холодильник не пуст.');
    parentDisable();
  }

}


//Проверка холодильника
var fridge1 = new Fridge(200);
try {
  fridge1.addFood("котлета"); // ошибка, холодильник выключен
} catch (e) {
  view('Error: ' + e.message);
}


// создать холодильник мощностью 500 (не более 5 еды)
var fridge2 = new Fridge(500);
fridge2.enable();
try {
  fridge2.addFood("котлета");
  fridge2.addFood("сок", "зелень");
  fridge2.addFood("варенье", "пирог", "торт"); // ошибка, слишком много еды
} catch (e) {
  view('Error: ' + e.message);
}


//Код использования холодильника без ошибок
var fridge3 = new Fridge(500);
fridge3.enable();
fridge3.addFood("котлета");
fridge3.addFood("сок", "варенье");

var fridgeFood = fridge3.getFood();
view( 'fridgeFood = ' + fridgeFood ); // котлета, сок, варенье

view( 'fridgeFood.push("вилка", "ложка");' );
// добавление элементов не влияет на еду в холодильнике
fridgeFood.push("вилка", "ложка");

view( 'fridge3.getFood() = ' + fridge3.getFood() ); // внутри по-прежнему: котлета, сок, варенье


//Проверка методов фильтра и удаления еды
var fridge4 = new Fridge(500);
fridge4.enable();
fridge4.addFood({
  title: "котлета",
  calories: 100
});
fridge4.addFood({
  title: "сок",
  calories: 30
});
fridge4.addFood({
  title: "зелень",
  calories: 10
});
fridge4.addFood({
  title: "варенье",
  calories: 150
});

fridge4.removeFood("нет такой еды"); // без эффекта
view( 'В холодильнике ' + fridge4.getFood().length + ' предмета.' ); // 4

var dietItems = fridge4.filterFood(function(item) {
  return item.calories < 50;
});

dietItems.forEach(function(item) {
  view( 'Удаляем: ' + item.title ); // сок, зелень
  fridge4.removeFood(item);
});

view( 'В холодильнике ' + fridge4.getFood().length + ' предмета.'); // 2

//Проверка disable()
try {
  fridge4.disable(); // ошибка, в холодильнике есть еда
} catch(e) {
  view('Error: ' + e.message);
}