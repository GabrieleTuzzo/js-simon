const countdownElement = document.getElementById('countdown')
const listNumbers = document.getElementById('numbers-list')
const playForm = document.getElementById('answers-form')
const instructionElement = document.getElementById('instructions')
const userDataGroup = document.getElementById('input-group')
const message = document.getElementById('message')
const confirmBtn = document.querySelector('.btn')
const countdownTimeSecond = 3
const itemNumber = 5

const numberArray = fillRandomNumberArray(itemNumber)
console.log(numberArray)

const isCountdownOver = startCountdown(countdownTimeSecond, countdownElement)

numberArray.forEach((arrayItem) => {
    const newListItem = document.createElement('li')
    newListItem.innerText = arrayItem
    listNumbers.appendChild(newListItem)
})

confirmBtn.addEventListener('click', (event) => {
    event.preventDefault()

    const userInputArray = saveUserData()
    const correctNumbers = compareArrays(userInputArray, numberArray)

    if (correctNumbers.length === 0) {
        message.innerText = 'Non hai indovinato nessun numero!'
    } else if (correctNumbers.length === itemNumber) {
        message.classList.add('text-success')
        message.classList.remove('text-danger')
        message.innerText = 'Hai indovinato tutti i numeri! Congratulazioni!'
    } else {
        message.innerText = `Hai indovinato ${
            correctNumbers.length
        } numeri! (${correctNumbers.join(', ')})`
    }

    disableUserInput()
})

function disableUserInput() {
    const userInput = userDataGroup.children
    for (let i = 0; i < userInput.length; i++) {
        userInput[i].disabled = true
    }
}

function compareArrays(firstArray, comparedArray) {
    const correctArray = []
    for (let i = 0; i < firstArray.length; i++) {
        if (comparedArray.includes(firstArray[i])) {
            correctArray.push(firstArray[i])
        }
    }

    return correctArray
}

function saveUserData() {
    const outputArray = []
    const userInput = userDataGroup.children
    for (let i = 0; i < userInput.length; i++) {
        outputArray.push(parseInt(userInput[i].value))
    }

    return outputArray
}

function changeToPlayWindow() {
    countdownElement.classList.toggle('d-none')
    listNumbers.classList.toggle('d-none')
    playForm.classList.toggle('d-none')

    instructionElement.innerText =
        'Inserisci i numeri che ricordi! Buona fortuna!'
}

function startCountdown(seconds, targetElement) {
    let counter = seconds
    targetElement.innerText = counter

    const clock = setInterval(() => {
        targetElement.innerText = --counter
        if (counter < 0) {
            clearInterval(clock)
            changeToPlayWindow()
        }
    }, 1000)
}

function fillRandomNumberArray(items) {
    const fullArray = []
    for (let i = 0; i < items; i++) {
        const randomInt0to50 = Math.floor(Math.random() * 50)
        fullArray.push(randomInt0to50)
    }

    return fullArray
}
