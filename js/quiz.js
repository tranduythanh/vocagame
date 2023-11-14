let score = 0;
let currentQuestionIndex = 0;
const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const scoreElement = document.querySelector('.score');
let words = Object.keys(vocabulary);
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');

shuffleWords(words);

function shuffleWords(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleOptions(correctAnswer) {
    let options = [correctAnswer];
    let meanings = Object.values(vocabulary);
    meanings.splice(meanings.indexOf(correctAnswer), 1); // Remove the correct answer from the pool
    // Randomly pick 3 incorrect answers
    while (options.length < 4) {
    const randomIndex = Math.floor(Math.random() * meanings.length);
    const option = meanings.splice(randomIndex, 1)[0];
    if (!options.includes(option)) {
        options.push(option);
    }
    }
    // Shuffle the options array
    for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
}

function displayQuestion() {
    if (currentQuestionIndex >= words.length) {
        questionElement.textContent = 'Quiz Completed!';
        optionsElement.innerHTML = '';
        scoreElement.textContent = 'Final Score: ' + score;
        return;
    }
    
    let word = words[currentQuestionIndex];
    const correctAnswer = vocabulary[word];

    // Bold and colorize terms in quotes
    word = word.replace(/"([^"]*)"/g, '<span style="font-weight:bold; color:red;">$1</span>');

    questionElement.innerHTML = word; // Use innerHTML instead of textContent
    const options = shuffleOptions(correctAnswer);

    optionsElement.innerHTML = '';
    options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        li.onclick = function () { checkAnswer(option, li); }; // Pass the li element as well
        optionsElement.appendChild(li);
    });
}

function checkAnswer(selectedAnswer, element) {
    const word = words[currentQuestionIndex];
    const correctAnswer = vocabulary[word];

    if (selectedAnswer === correctAnswer) {
        element.classList.add('correct');
        correctSound.play();
        score++;
    } else {
        element.classList.add('wrong');
        wrongSound.play();
    }

    // Disable all options after one is selected
    let allOptions = optionsElement.children;
    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].style.pointerEvents = 'none';
        if (allOptions[i].textContent === correctAnswer) {
        allOptions[i].classList.add('correct');
        }
    }

    // Move to the next question after a delay
    setTimeout(function() {
        currentQuestionIndex++;
        displayQuestion();
        updateScore();
    }, 500);
}

function updateScore() {
    scoreElement.textContent = 'Score: ' + score;
}

// Initialize the quiz
displayQuestion();
updateScore();