
const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord;
let timer;

const showAlert = (message) => {
    console.log("Alert triggered:", message);  // Debugging log
    const alertBox = document.querySelector('.alert-message');
    alertBox.querySelector('p').innerText = message;

    clearInterval(timer);

    // Show the alert and make it visible
    alertBox.style.display = 'block';

    // Hide after 3 seconds
    alertBox.querySelector('.okay-btn').addEventListener('click', () => {
        alertBox.style.display = 'none';
        initGame();
    });

    alertBox.querySelector('.back-to-menu-btn').addEventListener('click', () => {
        window.location.href = 'index.html';  // Navigate to menu.html
    });
};

const homeIcon = document.querySelector('.home-icon');
homeIcon.addEventListener('click', () => {
    window.location.href = 'index.html';  // Redirect to the home page
});

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        showAlert(`Times Up! ${correctWord.toUpperCase()} was the correct word`);
        
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}

const resetGame = () => {
    inputField.value = "";
    initGame();  // Start a new game with a new word
};


const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if(!userWord) return alert("Please enter a word");
    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`);
    showAlert(`Congrats! ${userWord.toUpperCase()} is a correct word`);
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

initGame();