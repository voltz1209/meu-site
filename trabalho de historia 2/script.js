
const allQuestions = [
    { question: "Quem foi Pelé e qual foi sua importância para o esporte e a sociedade racial?", options: ["Jogador de basquete", "Jogador de futebol", "Jogador de vôlei"], correct: 1 },
    { question: "Em que ano Pelé foi eleito o melhor jogador de futebol do século pela FIFA?", options: ["2000", "1998", "2005"], correct: 0 },
    { question: "Qual foi o impacto de Pelé para a luta contra o racismo no Brasil?", options: ["Ajudou a popularizar o futebol no Brasil", "Foi um ícone racial que inspirou igualdade", "Não teve impacto relevante"], correct: 1 },
    { question: "Pelé foi o primeiro jogador a conquistar quantos títulos da Copa do Mundo?", options: ["1", "2", "3"], correct: 2 },
    { question: "Qual foi o apelido de Pelé, dado pela mídia internacional?", options: ["Rei do Futebol", "Mestre da Bola", "Gênio do Futebol"], correct: 0 },
    { question: "Qual foi a primeira equipe profissional de Pelé?", options: ["São Paulo", "Santos FC", "Flamengo"], correct: 1 },
    { question: "Em que ano Pelé começou sua carreira profissional no Santos?", options: ["1958", "1956", "1960"], correct: 1 },
    { question: "Quantos gols Pelé marcou pela seleção brasileira?", options: ["748", "656", "1032"], correct: 0 },
    { question: "Pelé é o único jogador a ganhar três Copas do Mundo. Quais anos ele as venceu?", options: ["1958, 1962, 1970", "1966, 1970, 1974", "1954, 1962, 1970"], correct: 0 },
    { question: "Pelé ficou famoso por sua habilidade em qual posição no futebol?", options: ["Goleiro", "Atacante", "Meio-campista"], correct: 1 },
    { question: "Além de jogador de futebol, Pelé também teve destaque em outras áreas. Em qual desses ele se envolveu?", options: ["Política", "Música", "Atuação no cinema"], correct: 2 },
    { question: "Pelé é frequentemente associado à popularização do futebol no Brasil. Qual desses elementos ele ajudou a promover?", options: ["Futebol de campo", "Futebol feminino", "Futebol de salão"], correct: 0 },
    { question: "Pelé inspirou muitos jovens atletas ao redor do mundo. Qual é uma das suas maiores legados além dos gols?", options: ["Superação pessoal e luta contra o racismo", "Invenção do futebol de salão", "Popularização dos esportes olímpicos"], correct: 0 },
    { question: "Qual é o nome completo de Pelé?", options: ["Edson Arantes do Nascimento", "Pelé Nascimento de Souza", "Edson de Souza Arantes"], correct: 0 },
    { question: "Em que ano Pelé se aposentou do futebol profissional?", options: ["1977", "1980", "1985"], correct: 0 }
];


function startQuiz() {
    timeLimit = parseInt(document.getElementById('time-limit').value);
    score = 0;
    currentQuestion = 0;
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    loadQuestion();
    startTimer();
}


function loadQuestion() {
    const question = allQuestions[currentQuestion];
    const quizForm = document.getElementById('quizForm');
    quizForm.innerHTML = `
        <div class="question">
            <p>${currentQuestion + 1}. ${question.question}</p>
            <div class="options">
                ${question.options.map((option, index) => `
                    <label><input type="radio" name="question" value="${index}"> ${option}</label>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('nextButton').style.display = 'inline-block';
}


function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="question"]:checked');
    const correctAnswer = allQuestions[currentQuestion].correct;

    
    clearInterval(timer);

    
    if (selectedAnswer && parseInt(selectedAnswer.value) === correctAnswer) {
        score++;
    }

    
    const questionDiv = document.querySelector('.question');
    questionDiv.style.animation = 'fadeOut 0.5s forwards';
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < allQuestions.length) {
            loadQuestion();
            startTimer(); 
        } else {
            showResult();
        }
    }, 500);
}


function showResult() {
    const result = document.getElementById('result');
    result.textContent = `Você acertou ${score} de ${allQuestions.length} questões!`;
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById('restartBtn').style.display = 'inline-block';
}


function restartQuiz() {
    document.getElementById('result').textContent = '';
    document.getElementById('restartBtn').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
    document.getElementById('quiz-screen').style.display = 'none';
}


function startTimer() {
    timeLeft = timeLimit;
    updateTimer();
    timer = setInterval(function () {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timer); 
            nextQuestion(); 
        }
    }, 1000);
}


function updateTimer() {
    document.getElementById('timer').textContent = `Tempo restante: ${timeLeft}s`;
}


document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
