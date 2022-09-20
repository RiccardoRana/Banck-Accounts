'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

let accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//ARRAY METHODS

//SLICE

let arr = ['a', 'b', 'c', 'd', 'e'];
let arrNew = arr.slice(2);
console.log(arrNew); // Ritornera' un nuovo array con i 3 valori che ci sono dall'indice due!!!
console.log(arr.slice(1));
console.log(arr.slice(-1));
console.log(arr.slice(3));
console.log(arr.slice(3, 5));
console.log(arr.slice()); //Ritornera' un nuovo array uguale a arr!!!
console.log(arr.slice(-4, -1));
console.log(arr.slice(2, -1));
console.log(arr.slice(0, -2));

//SPLICE

let arrTwo = ['a', 'b', 'c', 'd', 'e'];
// let arrTwoNew = arrTwo.splice(2);
// console.log(arrTwoNew); // ['c','d','e']; //N.B. Lo splice non ritorna un nuovo array ma sempre lo stesso array modificato!!!
arrTwo.splice(-1);
console.log(arrTwo);

let arrThree = ['a', 'b', 'c', 'd', 'e'];
arrThree.splice(1, 3);
console.log(arrThree);


//REVERSE

const arrFour = ['g', 'r', 't', 'w', 'l'];
console.log(arrFour.reverse()); // l w t r g;


//CONCAT

const letters = arr.concat(arrFour);
console.log(letters);

//JOIN (array to string)

console.log(letters.join(' , '));


//Creating DOM elements:

function displayMovements(movements) {
  containerMovements.innerHTML = ''; //Per eliminare i 2 che gia' c'erano!!!
  movements.forEach(function (movement, index) {
    const occasional = movement > 0 ? `deposit` : `withdrawal`;
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${occasional}">${occasional}</div>
      <div class="movements__date">${index} days ago</div>
      <div class="movements__value">${movement}$</div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}
displayMovements(account1.movements);



//Creiamo gli username (che non sono altro che le inziali dei nomi):


function createUser(accounts) {
  accounts.forEach((acc) => {
    let stringBegin = [];
    let arr = acc.owner.split(' ');
    arr.forEach((value) =>
      stringBegin.push(value[0].toLowerCase())
    )
    let user = stringBegin.join('');
    acc.username = user;
  })
}

createUser(accounts); // js jd stw ss
console.log(account1); // A tutti gli oggetti gli hai creato una nuova proprieta'!!! (username)
console.log(account2);
console.log(account3);
console.log(account4);

//The filter method:

const deposits = movements.filter(function (mov) {
  if (mov > 0) return mov;
})
const withdrawals = movements.filter(function (mov) {
  if (mov < 0) return mov;
})

console.log(deposits);
console.log(withdrawals);

//The reduce method: usate per 'ridurre' tutti gli elementi di un array ad uno solo:

function calcAndShowBalance(arr) {
  const globalBalance = arr.reduce((accumulator, mov, i, array) => accumulator + mov, 0); //N.B: quando usi il reduce, il primo parametro e' sempre l'accumulator!!!
  console.log(globalBalance); // Guarda su, hai anche un secondo parametro a parte la funzione, che e' da dove vuoi che l'acc parta!!!
  labelBalance.innerHTML = globalBalance + '$';
}

calcAndShowBalance(account1.movements);

//Possiamo usare il reduce anche per cercare un singolo valore, ad esempio il valore piu' grande:

const arrayReduce = [23, 1890, 56, 87, 1400, 53, 578, 999, 9];

const maximumInArray = arrayReduce.reduce((acc, value) => {
  if (value > acc) { acc = value; return acc; }
  return acc;
}, arrayReduce[0])

console.log(maximumInArray);


//Eventualmente puoi anche chiamare un reduce:

const movInUSDSum = movements.filter((value) => value > 0).map((value) => value * 1.1).reduce((acc, value) => acc + value, 0);
console.log(movInUSDSum);

//Display everything in the UI

function displayIn(arr) {
  const earnings = arr.filter((value) => value > 0).reduce((acc, value) => acc + value, 0)
  labelSumIn.innerHTML = earnings + '$';
}

function displayOut(arr) {
  const expenses = arr.filter((value) => value < 0).reduce((acc, value) => acc + value, 0)
  labelSumOut.innerHTML = Math.abs(expenses) + '$';
}

function displayInterest(acc) {
  const interest = acc.movements.filter((value) => value > 0).map((deposit) => deposit * acc.interestRate).filter((interest) => interest >= 1).reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.innerHTML = interest + '$';

}

displayIn(account1.movements);
displayOut(account1.movements);
displayInterest(account1);


//Event Handler Login Form:
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value)
  if (!currentAccount) {
    console.log('Errore!❗️');
    inputLoginUsername.style.borderColor = 'red';
    inputLoginUsername.placeholder = 'Error';
    inputLoginUsername.className = 'login__input_error';
    inputLoginPin.style.borderColor = 'red';
    inputLoginPin.placeholder = 'Error';
    inputLoginPin.className = 'login__input_error';
  } else
    if (currentAccount.pin === Number(inputLoginPin.value)) {
      console.log(currentAccount);
      console.log('Accesso eseguito con successo!');

      //Display UI and welcome message!!!
      labelWelcome.innerHTML = `You are Welcome ${currentAccount.owner.split(' ')[0]}😁!`;
      containerApp.style.opacity = 3;

      //clean the login's fields:
      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginUsername.blur();
      inputLoginUsername.style.border = 'none';
      inputLoginUsername.placeholder = 'user';
      inputLoginUsername.className = 'login__input';
      inputLoginPin.style.border = 'none';
      inputLoginPin.placeholder = 'Pin';
      inputLoginPin.className = 'login__input';

      //Display Balance, Summary and Movements:
      function calcAndShowBalance() {
        const globalBalance = currentAccount.movements.reduce((accumulator, mov, i, array) => accumulator + mov, 0); //N.B: quando usi il reduce, il primo parametro e' sempre l'accumulator!!!
        // console.log(globalBalance); // Guarda su, hai anche un secondo parametro a parte la funzione, che e' da dove vuoi che l'acc parta!!!
        labelBalance.innerHTML = globalBalance + '$';
      }
      calcAndShowBalance();
      //Summary:
      displayIn(currentAccount.movements);
      displayOut(currentAccount.movements);
      displayInterest(currentAccount);
      //Movements:
      displayMovements(currentAccount.movements);
    }
}
);
console.log(accounts);

//Money Transfer

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = inputTransferAmount.value;
  const personTo = accounts.find((acc) => acc.username === inputTransferTo.value)

  //New Amount of the account
  labelBalance.innerHTML = Number(labelBalance.textContent.slice(0, -1)) - Number(amount) + '$';

  if (amount > 0) {
    //Display the new movement
    let newMov = [...currentAccount.movements, -amount];
    currentAccount.movements = newMov;
    displayMovements(currentAccount.movements);

    //New amount of the receiver
    let newMovPersonTo = [...personTo.movements, Number(amount)];
    personTo.movements = newMovPersonTo;
  } else if (amount <= 0 || amount === null || amount === undefined) {
    alert('Immetti un valore!')
  }

  //Clean everything
  inputTransferAmount.value = inputTransferTo.value = '';

})


btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const accToEliminate = inputCloseUsername.value;
  const pinToEliminate = inputClosePin.value;
  if (accToEliminate === currentAccount.username && Number(pinToEliminate) === currentAccount.pin) {
    const index = accounts.findIndex((acc) => acc.username === currentAccount.username);
    console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.innerHTML = 'Log in to get started';
    inputLoginUsername.value = inputLoginPin.value = '';
  }
})


// Request Loan

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = inputLoanAmount.value;
  currentAccount.movements = [...currentAccount.movements, amount];
  displayMovements(currentAccount.movements);
  labelBalance.innerHTML = Number(labelBalance.textContent.slice(0, -1)) + Number(amount) + '$';
  inputLoanAmount.value = '';
})


//Sorting algorithm:
let sorted = true;
btnSort.addEventListener('click', function () {
  const copy = [...currentAccount.movements];
  const movOrdered = copy.sort((a, b) => {
    if (a > b) return 1;
    else if (b > a) return -1;
  });
  if (sorted === true) {
    displayMovements(movOrdered);
    sorted = !sorted;
  } else if (sorted === false) {
    displayMovements(currentAccount.movements);
    sorted = !sorted;
  }
})

// Fill method (funziona solo con il new Array):

const arrPreubaStrana = new Array(7);
console.log(arrPreubaStrana);

// console.log(arrPreubaStrana.fill(3)); // [3,3,3,3]
// Funziona anche rispetto alle posizioni!!!
console.log(arrPreubaStrana.fill(23, 0, 4)); // [23,23,23,23, empty per four]

// E' anche un nuovo modo per dichiarare un array, Array e; una funzione!!!
const y = Array.from({ length: 9 }, () => 3); // [3,3,3,3,3,3,3,3]
console.log(y);

const z = Array.from({ length: 8 }, (_, i) => i + 1); //N.B: parametro che non ci serve ma dobbiamo comunque metterlo perche' l'index deve solo essere il secondo parametro!!!
console.log(z);




















































