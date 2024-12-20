const countdownElement = document.getElementById('countdown')
const listNumbers = document.getElementById('numbers-list')
const playForm = document.getElementById('answers-form')
const instructionElement = document.getElementById('instructions')
const userDataGroup = document.getElementById('input-group')
const message = document.getElementById('message')
const confirmBtn = document.querySelector('.btn')

// Gameplay variables
const countdownTimeSecond = 3
const itemNumber = 5
const min = 1
const max = 50

const numberArray = fillRandomNumberArray(itemNumber, min, max)
console.log(numberArray)

const isCountdownOver = startCountdown(countdownTimeSecond, countdownElement)

showPlayNumbers()

playForm.addEventListener('submit', submitHandler)

function submitHandler(event) {
    event.preventDefault()

    const userInputArray = saveUserData()
    const correctNumbers = compareArrays(userInputArray, numberArray)
    const messageClassList = message.classList
    let messageUpdated = ''

    if (userInputArray === 0) {
        disableUserInput()
        messageUpdated = 'Dati inseriti non validi!'
        message.innerText = messageUpdated
        confirmBtnToRefreshBtn()
    } else {
        if (correctNumbers.length === 0) {
            messageUpdated = 'Non hai indovinato nessun numero!'
        } else if (correctNumbers.length === itemNumber) {
            messageClassList.add('text-success')
            messageClassList.remove('text-danger')
            messageUpdated = 'Hai indovinato tutti i numeri! Congratulazioni!'
        } else {
            messageUpdated = `Hai indovinato ${
                correctNumbers.length
            } numeri! (${correctNumbers.join(', ')})`
        }

        message.innerText = messageUpdated

        disableUserInput()

        confirmBtnToRefreshBtn()
    }
}

function showPlayNumbers() {
    const shadowElement = document.createDocumentFragment() // !important
    numberArray.forEach((arrayItem) => {
        const newListItem = document.createElement('li')
        newListItem.innerText = arrayItem
        shadowElement.appendChild(newListItem)
    })
    listNumbers.appendChild(shadowElement)
}

function confirmBtnToRefreshBtn() {
    confirmBtn.innerText = 'Riprova'
    const confirmBtnClassList = confirmBtn.classList
    confirmBtnClassList.remove('btn-primary')
    confirmBtnClassList.add('btn-danger')
    playForm.removeEventListener('submit', submitHandler)
    playForm.addEventListener('submit', () => {
        location.reload()
    })
}

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
        const userInputInt = parseInt(userInput[i].value)
        if (userInputInt >= 0 && userInputInt <= 50) {
            outputArray.push(userInputInt)
        } else {
            return 0
        }
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

function fillRandomNumberArray(arrayLength, min, max) {
    const fullArray = []
    while (fullArray.length < arrayLength) {
        const randomInt = getRandomNumber(min, max)
        if (!fullArray.includes(randomInt)) {
            fullArray.push(randomInt)
        }
    }

    return fullArray
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
