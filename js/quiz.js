let score = 0;
const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const scoreElement = document.querySelector('.score');
let wordsQueue = shuffleWords(Object.keys(vocabulary));
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');

function shuffleWords(array) {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
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
    if (wordsQueue.length === 0) {
        questionElement.textContent = 'Quiz Completed!';
        optionsElement.innerHTML = '';
        scoreElement.textContent = 'Final Score: ' + score;
        return;
    }
    
    let word = wordsQueue.shift(); // Pop the first word from the queue
    const correctAnswer = vocabulary[word];

    styleText = word.replace(/"([^"]*)"/g, '<span style="font-weight:bold; color:red;">$1</span>');

    questionElement.innerHTML = styleText;
    const options = shuffleOptions(correctAnswer);

    optionsElement.innerHTML = '';
    options.forEach(option => {
        const li = document.createElement('li');
        li.textContent = option;
        li.onclick = function () { checkAnswer(option, li, word); };
        optionsElement.appendChild(li);
    });
}

function checkAnswer(selectedAnswer, element, word) {
    const correctAnswer = vocabulary[word];
    
    if (selectedAnswer === correctAnswer) {
        element.classList.add('correct');
        correctSound.play();
        score++;
    } else {
        element.classList.add('wrong');
        wrongSound.play();
        wordsQueue.push(word); // Re-enqueue the word for retry
    }

    let allOptions = optionsElement.children;
    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].style.pointerEvents = 'none';
        if (allOptions[i].textContent === correctAnswer) {
            allOptions[i].classList.add('correct');
        }
    }

    setTimeout(function() {
        displayQuestion();
        updateScore();
    }, 500);
}

function updateScore() {
    scoreElement.textContent = `Score: ${score}/${wordsQueue.length}`;
}

// Initialize the quiz
displayQuestion();
updateScore();