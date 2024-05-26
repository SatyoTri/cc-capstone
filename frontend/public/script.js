document.getElementById('start-quiz').addEventListener('click', async () => {
    const category = document.getElementById('category').value;
    try {
        const response = await fetch('http://localhost:3000/quiz/start-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category })
        });
        const data = await response.json();
        displayQuestions(data.questions);
    } catch (error) {
        console.error('Error:', error);
    }
});

function displayQuestions(questions) {
    const questionsContainer = document.getElementById('questions-container');
    questionsContainer.innerHTML = '';

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `
            <label>${index + 1}. ${question}</label>
            <label>
                <input type="radio" name="question${index}" value="1"> Yes
            </label>
            <label>
                <input type="radio" name="question${index}" value="0"> No
            </label>
        `;
        questionsContainer.appendChild(questionDiv);
    });

    document.getElementById('category-section').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';

    document.getElementById('quiz-form').addEventListener('submit', submitAnswers);
}

async function submitAnswers(event) {
    event.preventDefault();

    const category = document.getElementById('category').value;
    const formData = new FormData(event.target);
    const answers = [];

    for (let pair of formData.entries()) {
        answers.push(parseInt(pair[1]));
    }

    try {
        const response = await fetch('http://localhost:3000/quiz/submit-answers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category, answers })
        });
        const data = await response.json();
        displayResult(data.message);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayResult(message) {
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('result-message').textContent = message;
    document.getElementById('result-section').style.display = 'block';

    document.getElementById('restart-quiz').addEventListener('click', () => {
        document.getElementById('result-section').style.display = 'none';
        document.getElementById('category-section').style.display = 'block';
    });
}
