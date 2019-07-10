// 1)
// Используя rest оператор и деструктуризацию, создать функцию, 
// которая принимает любое количество аргументов и возвращает объект, содержащий первый аргумент и массив из остатка:

// func(‘a’, ‘b’, ‘c’, ‘d’) → 
// {
//   first: ‘a’,
//   other: [‘b’, ‘c’, ‘d’]
// }


function getFirstElement() {
  const arr = [];

  for ( let i = 0; i < arguments.length; i++ ) {
    arr.push(arguments[i]);
  }
  
  const [ first, ...other ] = arr;
  
  return {
    first: first,
    other: other
  };
}

getFirstElement('a', 'b', 'c', 'd', 'e');


// 2)
// Организовать функцию getInfo, которая принимает объект вида
// { name: ...,  info: { employees: [...], partners: [ … ]  } }
// и выводит в консоль имя (если имени нет, показывать ‘Unknown’) и первые две компании из массива partners:

// const organisation = {  
//   name: 'Google',   
//   info: { employees: [‘Vlad’, ‘Olga’], partners: ['Microsoft', 'Facebook', 'Xing']   } 
// };
// getInfo(organisation); → 
// Name: Google 
// Partners: Microsoft Facebook

const organisation = {
  name: 'Google',
  info: { employees: ['Vlad', 'Olga'], partners: ['Microsoft', 'Facebook', 'Xing'] }
};

function getInfo(orgInfo) {
  const { name = 'Unknow', info: { partners: [firstPartner, secondPartner] } } = orgInfo;
  
  return {
    Name: name, 
    Partners: firstPartner + ' ' + secondPartner
  }
}

getInfo(organisation);


// 3)
// Переделать функцию с использованием функции-стрелки (в методе reduce тоже использовать arrow function):

// function sum() {
//   const params = Array.prototype.slice.call(arguments);

//   if (!params.length) return 0;

//   return params.reduce(function (prev, next) { return prev + next; });
// }

// sum(1, 2, 3, 4); // 10
// sum(); // 0


const sum = (...props) => {
  if (!props.length) return 0;
  
  return props.reduce( (prev, next) => prev + next );
}

sum();


// 4)
// Создать две функции и дать им осмысленные названия:
// - первая функция принимает массив и колбэк (одна для всех вызовов)
// - вторая функция (колбэк) обрабатывает каждый элемент массива (для каждого вызова свой callback)

// Первая функция возвращает строку “New value: ” и результат обработки:

// firstFunc([‘my’, ‘name’, ‘is’, ‘Trinity’], handler1) → “New value: MyNameIsTrinity”
// firstFunc([10, 20, 30], handler2) → “New value: 100, 200, 300,”
// firstFunc([{age: 45, name: ‘Jhon’}, {age: 20, name: ‘Aaron’}], handler3) →
// “New value: Jhon is 45, Aaron is 20,”
// firstFunc([‘abc’, ‘123’], handler4) → “New value: cba, 321,” // строки инвертируются

// Подсказка: secondFunc должна быть представлена функцией, которая принимает
// один аргумент (каждый элемент массива) и возвращает результат его обработки

const greeting = ['my', 'name', 'is', 'Trinity'];
const numArr = [10, 20, 30];
const users = [{age: 45, name: 'Jhon'}, {age: 20, name: 'Aaron'}];
const arr1 = ['abc', '123'];

function makeNewValue(arr, fn) {
  const newValue = [];
  
  if ( Array.isArray(arr) && typeof fn === 'function' ) {
    
    for ( let i = 0; i < arr.length; i++ ) {
      newValue.push( fn(arr[i]) )
    }
    
    return `New value: ${newValue}`;
  }
}

const joinElements = el => `${ el.charAt(0).toUpperCase() + el.slice(1) }`;
const orderValue = el => `${el *= 10}`;
const usersInfo = el => {
  const { age, name } = el;
  return `${name} is ${age}`;
}
const arrReverse = el => `${ el.split('').reverse().join('') }`;

const newGreeting = makeNewValue( greeting, joinElements );
const orderArr = makeNewValue( numArr, orderValue);
const usersInfoArr = makeNewValue( users, usersInfo);
const newReverceArr = makeNewValue( arr1, arrReverse);


// 5)
// Написать аналог метода every. Создайте функцию every, она должна принимать первым аргументом массив чисел 
// (обязательно проверьте что передан массив) вторым аргументом callback (обязательно проверьте что передана функция)
// функция должна возвращать true или false в зависимости от результата вызова callback 
// (проверить число больше 5). Callback  должен принимать один элемент массива, его индекс в массиве и весь массив. 

const numbersArr = [6, 7, 8, 12];
let value = 5,
    result;

function every(arr, fn) {
  if ( Array.isArray(arr) && typeof fn === 'function' ) {
    const newNumbersArr = [];
    
    for (let i = 0; i < arr.length; i++) {
      newNumbersArr.push( fn(arr[i], i, arr) );
    }

    return result;
  }
}

function checkItemValue(element, index, array) {
  let newArr = [];
  
  for ( let i = 0; i < array.length; i++ ) {
    if(array[i] > value) {
      newArr.push(array[i]);
    }
  }
  
  if ( newArr.length === array.length ) {
    result =  true;
  } else {
    result = false;
  }
  
  return result;
}

every( numbersArr, checkItemValue );
