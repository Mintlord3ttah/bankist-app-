'use strict';
const theme = document.querySelector('.theme');
const txtDate = document.querySelector('.text-and-date');
const DOMmovements = document.querySelector('.movements');
const userMovements = document.querySelector('.movement-UI')
const daysPassed = document.querySelector('.dates')
const userLoggin = document.querySelector('.send');
const userName = document.querySelector('.user');
const userPin = document.querySelector('.pin');
const user = document.querySelector('.user-name');
const totalBalFig = document.querySelector('.balance');
const makeTransfer = document.querySelector('.trig-trans'); // transfer btns
const recipient = document.querySelector('#recipient');
const transferAmount = document.querySelector('#trans-amount');
const requestLoan = document.querySelector('.trig-loan'); // request loan btns
const loanAmount = document.querySelector('#loan-amount');
const closeAccount = document.querySelector('.trig-delete'); // delete account
const accountName = document.querySelector('#close-name');
const accountPin = document.querySelector('#close-pin');
const CHECKEDin = document.querySelector('.inc'); // ststistic
const CHECKEDout = document.querySelector('.outc');
const INTERESTrate = document.querySelector('.intst');
const hide = document.querySelectorAll('.hide');
const hideGrid = document.querySelectorAll('.hide-grid');
const form = document.querySelector('.form');
const NAMES = document.querySelector('#names');
const password = document.querySelector('#pass');
const signup = document.querySelector('.signup');
const greetmsg = document.querySelector('.greet-msg')// greet message
const timeOut = document.querySelector('.time');
const dateOncurrbal = document.querySelector('.date-obj')
const bankistMovUI = document.querySelector('.bankist-movementsUI') // bankist app note: remove class
const bankistUsersSummary = document.querySelector('.bank-summarry-of-users') // set to none
const bankistOfficialInfo = document.querySelector('.info');
const sort = document.querySelector('.sort')
const bankMainUI = document.querySelector('.bankistApp')
const btns = document.querySelector('.btns')


let time = new Date()
let dateInterval;
let hour = time.getHours();
let mins = time.getMinutes();
let sec = time.getSeconds();

function greetUser(){
    let day = time.getDate();
    let month = time.getMonth();
    let year = time.getFullYear();
    
    clearInterval(dateInterval)
    dateInterval = setInterval(() => { // set date and time on current balance
        dateOncurrbal.textContent = `${hour === 0 ? ++day : day}/${month}/${year} 
        ${mins === 59 ? `${++hour}`.padStart(2, 0) : hour === 23 && mins === 59 ? `${hour = 0}`.padStart(2, 0) : `${hour}`.padStart(2, 0)}:${sec === 59 ? `${++mins}`.padStart(2, 0) : mins === 59 && sec === 0 ? `${mins = 0}`.padStart(2, 0) : `${mins}`.padStart(2, 0)}:${sec === 59 ? `${sec = 0}`.padStart(2, 0) :  `${++sec}`.padStart(2, 0)}`
    }, 1000)
}

// User will automatically be logged out in 5mins 
let logoutTimer;
function automaticLogOut(){
    let hr = 0;
    let minute = 4;
    let seconds = 60;

    clearInterval(logoutTimer)
    logoutTimer = setInterval(() => {
        timeOut.textContent = `${`${hr}`.padStart(2, 0)}:
                                   ${seconds === 0 ? `${--minute}`.padStart(2, 0) : `${minute}`.padStart(2, 0)}:
                                   ${seconds === 0 ? seconds = 60 : `${--seconds}`.padStart(2, 0)}`;
                                   if(minute === 0 && seconds === 0){
                                       clearInterval(logoutTimer)
                                       displayMainUI("block", "none", 'none');
                                       greetmsg.innerHTML = "You've been logged out!"
                               }
    }, 1000);

}

// BANK APP THEME
let lightMode = true;
theme.addEventListener('click', function(e){
    theme.innerHTML = ''
    e.preventDefault()
    if(lightMode){
        document.body.style.backgroundColor = '#312e2e';
        document.body.style.color = 'white';
        theme.insertAdjacentHTML('afterbegin', '<ion-icon name="moon-outline" class="theme-icon"></ion-icon>')
        totalBalFig.style.color = 'rgb(84, 248, 84)';
        txtDate.style.color = 'white';
        lightMode = false;
        btns.style.color = 'white';
    }
    else if(!lightMode){
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        theme.insertAdjacentHTML('afterbegin', '<ion-icon name="sunny-outline" class="theme-icon"></ion-icon>')
        txtDate.style.color = 'black';
        totalBalFig.style.color = 'green'
        lightMode = true;
        btns.style.color = '#707070'

    }
})

// global variables
let whoIsLoggedIn;
let LOGGEDIN = false;
let newUser = false;
let TYPE;
let KEY;
let coppiedMovments;
let request = '';

// ACCOUNT DATA
const  account1 = {
    owner: 'PROVIDENCE ETTAH',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 0.12, //%
    pin: 1111,
    userBal: 5000000000,
    giverName: new Map().set(0, "no name"),
    mapTime: new Map().set(0, "initial date-time"),
    loan: 0,
    getLoan:  new Map().set(),
};

const account2 = {
    owner: 'MICHAEL GODWIN',
    movements: [5000, 3400, -150, -790, -3210, -1000, 850, -30],
    interestRate: 0.15,
    pin: 2222,
    userBal: 750000,
    giverName: new Map().set(0, "no name"),
    mapTime:  new Map().set(0, "initial date-time"),
    loan: 0,
    getLoan:  new Map().set(),
};
const account3 = {
    owner: 'MINTLORD PROF',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.07,
    pin: 3333,
    userBal: 420000,
    giverName: new Map().set(0, "no name"),
    mapTime:  new Map().set(0, "initial date-time"),
    loan: 0,
    getLoan:  new Map().set(),
};

const account4 = {
    owner: 'BEATRICE PETERSON',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 0.01,
    pin: 4444,
    userBal: 35000,
    giverName: new Map().set(0, "no name"),
    mapTime:  new Map().set(0, "initial date-time"),
    loan: 0,
    getLoan:  new Map().set(),
};
const officialBankAcc = {
    owner: "BANKIST APP",
    movements: [],
    pin: 5555,
    userBal: 0,
    giverName: new Map().set(0, "no name"),
    mapTime: new Map().set(0, "initial date-time"),
    interestRate: 0.08,
    loan: 0,
    pocketBal: 0,
    getLoan:  new Map().set(),
}

// ALL user account 
const allUsers = [account1, account2, account3, account4, officialBankAcc];

// REUSABLE FUNCTIONS
function shortenedName(names){
    const allNames = names.toLowerCase().split(' ');
    const initials = allNames.map(each => each[0]).join('');
    return initials;
}
console.log(shortenedName('Mintlord Prof'))
function formatFigure(data){ // format number to currency pattern
    const formattedNum = data.toLocaleString('en-US', {
        style: "currency",
        currency: "USD"
    })
    return formattedNum
}
function displayMainUI(displayInitial, displayUserAcc, grid){
    form.style.display = displayInitial;
    hide.forEach(h => h.style.display = displayUserAcc);
    hideGrid.forEach(h => h.style.display = grid);
}
////////////////////////////////////////////////////////////////////////////////////////
function userInfo(USER, active=true){
    if(!active){
        user.textContent = "User" // username ,
        totalBalFig.textContent = formatFigure(0)
        accMovements(whoIsLoggedIn,false); // deleting account
    }
    else{
        accMovements(USER); // acount movements ~ GIVER
        greetmsg.innerHTML = `Welcome back, ${USER.owner}!`// username 
        totalBalFig.textContent = formatFigure(USER.userBal);
    }   
}

let staticBal = 0;
function moneyFlow(obj,  staticBal){
    let positive = staticBal,
        negative = 0;

    for (const mov of obj.movements) {
        if(mov > 0) positive += mov;
        if(mov < 0) negative += mov;
    }
    CHECKEDin.textContent = formatFigure(positive);
    CHECKEDout.textContent = formatFigure(negative);
    INTERESTrate.textContent = formatFigure(obj.interestRate * obj.userBal);   
}
function resetButtons(){
    userLoggin.blur();
    userPin.blur();
    userLoggin.blur();
    requestLoan.blur()
    transferAmount.value = '';
    recipient.value ='';
    userPin.value = '';
    userName.value = ''
}
const bankistUsers = allUsers.map( arr => arr.owner); // to be used on movement report
// THE OFFICIAL BANKIST APP
let balance = 0
userMovements.innerHTML = '';
function bankistAppUsers(){
    officialBankAcc.userBal = 0;
    officialBankAcc.movements = [];
    document.querySelectorAll('.customer-0').forEach(node => node.innerHTML = '')
    
    balance = officialBankAcc.movements.filter(mov => mov > 0)
    .concat(allUsers.map(acc => acc.userBal)).reduce((acc, curr) => acc + curr);
    officialBankAcc.userBal = balance + officialBankAcc.pocketBal
    userInfo(officialBankAcc)

    // const bankistUsers = allUsers.slice(0,allUsers.length -1)
    // .map( arr => arr.owner);
    bankistUsers.forEach( name => {
        const htmlStr = `<p class="customer-0">${name}</p>`;
        bankistUsersSummary.insertAdjacentHTML("beforeend", htmlStr);
    })
        const allMovements = allUsers.flatMap(users => users.movements)
        officialBankAcc.movements = allMovements

        let deposit = 0, withrawal = 0;
        allMovements.forEach(mov => {
            let count = mov > 0 ? ++deposit : ++withrawal;
            let name = mov > 0 ? "DEPOSIT" : "WITHRAWAL";
            let type = mov > 0 ? "deposits" : "widthraws";

            const bankMovements = `<p class="info">
            <span class="num-${type}"><span class="deposit-count"> ${count} </span><span class="type-deposit">${name}</span></span>
            <span>
                <span class="currency">$</span><span class="figure-deposit">${mov}</span>
            </span>
        </p>`
        userMovements.style.backgroundColor = "white";
        userMovements.insertAdjacentHTML("afterbegin", bankMovements);

        })
}

// USER LOGS IN AND UNIQUE DATA IS DISPLAYED
function selectUser(currUser, inputPin, inputName) {
    function loggin() {
        displayMainUI("none", "flex", 'grid');
        LOGGEDIN = true;
        userInfo(currUser);
        staticBal = currUser.userBal;
        moneyFlow(currUser, staticBal);
    }

    for (currUser of allUsers) {
        if ((currUser.pin === Number(inputPin.value)) &&
           (inputName.value === currUser.owner ||
            inputName.value === shortenedName(currUser.owner))) {
                greetUser()
                whoIsLoggedIn = currUser;

            if (currUser === allUsers.find(acc => acc.owner === "BANKIST APP")) {
                bankistUsersSummary.style.display = "block";
                DOMmovements.classList.add('bankist-movementsUI');
                displayMainUI("none", "flex", "grid");
                bankistAppUsers()
                moneyFlow(currUser, staticBal)
                resetButtons()
                automaticLogOut()
            }

            else if(currUser !== officialBankAcc){
                bankistUsersSummary.style.display = "none"
                DOMmovements.classList.remove('bankist-movementsUI');
                loggin();
                automaticLogOut()
            }
        }
    }
    resetButtons()
}

// THE MOVEMENTS UI
function accMovements(obj, accOpen = true,textType="TRANSFER"){
    userMovements.innerHTML = '';
    let type;
    let text;
    let deposit = 0,
        widthraw = 0,
        transfer = 0;
    if (accOpen) {
        obj.movements.forEach(function (mov) {
            let counter = mov > 0 ? ++deposit : type === "WIDTHRAWAL" ? ++widthraw : ++transfer;
            type = mov > 0 ? "deposits" : "widthraws";
            text = mov > 0 ? "DEPOSIT" : textType; // may add widthrawal feature in the future

                const html = `
                    <p class="infos">
                    <span>
                        <span class="num-${type}"><span class="${type}-count"> ${counter} </span><span class="type-${type}"> ${text}</span></span>
                        <span class="dates">x-days ago</span></span>
                        <span>
                            <span class="currency">$</span><span class="figure-deposit">${Math.abs(mov)}</span>
                        </span>
                        </p>
                        <span class='hoverMe'>${mov > 0 ? `You have been credited with ${formatFigure(mov)}
                                                <br />Sender: ${TYPE === "TRANSFER" || "LOAN" ? obj.giverName.get(mov) ?? obj.giverName.get(0) : obj.giverName.get(0)}<br />time: ${TYPE === "TRANSFER" || "LOAN" ? obj.mapTime.get(mov)  ?? obj.mapTime.get(0) : obj.mapTime.get(mov)}` : `You have been debited with ${formatFigure(mov)}`}
                        </span>
                    `;
                        userMovements.insertAdjacentHTML('afterbegin', html);
                        userMovements.style.backgroundColor = 'grey';
        })
    };
}

userLoggin.addEventListener('click', function (e) {
    e.preventDefault()
    selectUser(allUsers, userPin, userName)
})

 // USER MAKES TRANSFER
function updateAccount(RECIPIENT, amountToreceive, type){ // update the user account + recipient
    if(type === "TRANSFER"){
            document.querySelector('.hoverMe').innerHTML = '';
    
                const deducted = RECIPIENT.userBal -= amountToreceive;
                totalBalFig.textContent = formatFigure(deducted); // GIVER
                amountToreceive = -amountToreceive;
    
                RECIPIENT.movements.push(amountToreceive);
                accMovements(RECIPIENT);
                moneyFlow(whoIsLoggedIn, staticBal);
           
            TYPE = 'TRANSFER';
            KEY = sec
    }
    else if(type === "CREDIT"){
        totalBalFig.textContent = formatFigure(RECIPIENT.userBal += amountToreceive);
        RECIPIENT.movements.push(amountToreceive); 
        accMovements(RECIPIENT)
        moneyFlow(whoIsLoggedIn, staticBal);
        RECIPIENT.giverName.set(amountToreceive, whoIsLoggedIn.owner)
        RECIPIENT.mapTime.set(amountToreceive, `${hour}:${mins}:${sec}`)

    }
    else{
        totalBalFig.textContent = formatFigure(RECIPIENT.userBal);
        accMovements(RECIPIENT);
    };
    
}

 makeTransfer.addEventListener('click', function(){ // handle event listener
    for(const reciever of allUsers){
        
        if(LOGGEDIN && recipient.value === shortenedName(reciever.owner) ||
        recipient.value === reciever.owner){
            let amountToTransfer = Number(transferAmount.value);
            clearInterval(logoutTimer);
            automaticLogOut()

            if(whoIsLoggedIn.userBal > 0 && whoIsLoggedIn.userBal >= amountToTransfer){
                if (recipient.value !== whoIsLoggedIn.owner &&
                   recipient.value !== shortenedName(whoIsLoggedIn.owner) &&
                    whoIsLoggedIn !== officialBankAcc) { // prevent self transfer
                    updateAccount(reciever, amountToTransfer, "CREDIT") // recipient got creditted
                    
                    if(reciever === officialBankAcc && whoIsLoggedIn.loan !== 0){ // paying back loan
                        if(amountToTransfer > whoIsLoggedIn.loan){
                            const calcExcess = amountToTransfer -= whoIsLoggedIn.loan;
                            alert(`Your loan of ${formatFigure(whoIsLoggedIn.loan)} has been cleared and an excess of ${formatFigure(calcExcess)} has been refunded!
                                \nThank you for banking with us`)
                            amountToTransfer = whoIsLoggedIn.loan;
                            whoIsLoggedIn.loan = 0;
                        }
                        else if(amountToTransfer < whoIsLoggedIn.loan){
                            alert(`You have successfully paid back ${formatFigure(amountToTransfer)} from your outstanding dept of ${formatFigure(whoIsLoggedIn.loan)} and you are left with ${formatFigure(whoIsLoggedIn.loan -= amountToTransfer)} to pay back
                            \nThank you for banking with us`)
                            // whoIsLoggedIn.loan -= amountToTransfer
                        }
                        else{
                            alert(`Your loan of ${formatFigure(whoIsLoggedIn.loan)} has been cleared!
                            \nThank you for banking with us`)
                            whoIsLoggedIn.loan -= amountToTransfer
                        }
                        updateAccount(whoIsLoggedIn, amountToTransfer, "TRANSFER"); // you got deducted
                    }
                    else if(reciever === officialBankAcc && whoIsLoggedIn.loan === 0){
                            alert("You are not allowed to transact with BANKIST App except you have an outstanding dept!")
                            updateAccount(whoIsLoggedIn, amountToTransfer)
                        }
                    else{
                        updateAccount(whoIsLoggedIn, amountToTransfer, "TRANSFER"); // you got deducted 
                    }
                }
                else{
                    alert('YOU ARE NOT ALLOWED TO MAKE SUCH TRANSACTION!');
                    break;
                }
            }
            else{
                alert('INSUFFICIENT BALANCE!')
            }
        }
    }
    // empty the input values
    resetButtons()
});

// REQUEST FOR LOAN
requestLoan.addEventListener('click', function(){
    if(LOGGEDIN){
        const getAmount = Number(loanAmount.value);
        const minimumLoan = whoIsLoggedIn.userBal * 0.1
        if(getAmount > whoIsLoggedIn.userBal) {alert('YOU ARE NOT ELIGIBLE TO TAKE THIS LOAN!')}        
        else {if(whoIsLoggedIn.loan === 0 && getAmount >= minimumLoan){
            whoIsLoggedIn.loan = getAmount
                setTimeout(() => {
                    TYPE = "LOAN";
                    clearInterval(logoutTimer);
                    whoIsLoggedIn.giverName.set(getAmount, officialBankAcc.owner)
                    whoIsLoggedIn.mapTime.set(getAmount, `${hour}:${mins}:${sec}`)
                    automaticLogOut();
                    updateAccount(whoIsLoggedIn, getAmount, "CREDIT");
                    loanAmount.value = '';
                }, 2000)
        }
        else if(whoIsLoggedIn.loan !== 0){
            alert(`you need to pay back your outstanding loan of ${formatFigure(whoIsLoggedIn.loan)}, before getting another one!`)
        }   
        else{
            alert(`Minimum loan is available on 10% of your income e.g MIN: ${minimumLoan}`)
        } } 
    }

});

// DEFINING CLOSE ACCOUNT
function close() { 
    if (LOGGEDIN && Number(accountPin.value) === whoIsLoggedIn.pin && 
                accountName.value === whoIsLoggedIn.owner ||
                accountName.value === shortenedName(whoIsLoggedIn.owner)) {

                    accountName.value = '';
                    accountPin.value = '';
        if (allUsers.includes(whoIsLoggedIn) && 
        confirm("ARE YOU SURE YOU WANT TO DELETE THIS ACCOUNT")) {       

        const index = allUsers.indexOf(whoIsLoggedIn)
        allUsers.splice(index, 1)
            userInfo(whoIsLoggedIn, false);
        }
    }
}

// CLOSE ACCOUNT
closeAccount.addEventListener('click', close);

// create an account
const createNewUser = {}
signup.addEventListener('click', function(e){
    e.preventDefault();
// get data and settup account
 createNewUser.owner = NAMES.value.trim();
 createNewUser.pin = Number(password.value);
 createNewUser.userBal = 0 // formatFigure(1);
 createNewUser.interestRate = 0.05;
 createNewUser.movements = [];
 createNewUser.giverName = new Map().set(0, "no name"),
 createNewUser.mapTime = new Map().set(0, "initial date-time"),
 createNewUser.loan = 0

if(createNewUser.owner === '' || createNewUser.pin === 0) {alert('Hey, provide name and password to proceed')}
else { 
    allUsers.push(createNewUser); 
    selectUser(allUsers, password, NAMES); 
    console.log(createNewUser)}
});

// the sort event listener
let sorted = false;
sort.addEventListener('click', function(){
     
    console.log(sort.value)
    if(LOGGEDIN){
        request = 'sort';
        if(sort.value === "withrawal"){
            coppiedMovments.sort((a,b) => b-a);
            accMovements(whoIsLoggedIn)
        }
        else if(sort.value === "deposit") {
            whoIsLoggedIn.SORTS.sort((a,b) => a-b)
            accMovements(whoIsLoggedIn)
        }
        else if(sort.value === "last-modified") {
            whoIsLoggedIn.movements = coppiedMovments;
            accMovements(whoIsLoggedIn)
        }
    }
})

// THE BANKIST APP OFFICIAL ACCOUNT
/*
* Dispaly a summary of the total amount in the bank
* Display total widthrawal
* Display summary of all users 
* Display the user online
* Display who deleted their account
*/

//code by mintlord