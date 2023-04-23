const quiz = [
    {
        question: "1. 水在摄氏多少度的温度下结冰？",
        answers: {
            a: "100 度",
            b: "0 度",
            c: "50 度"
        },
        correctAnswer: "b"
    },
    {
        question: "2. 以下哪个国家位于非洲大陆？",
        answers: {
            a: "巴西",
            b: "澳大利亚",
            c: "尼日利亚"
        },
        correctAnswer: "c"
    },
    {
        question: "3. 下列哪个形状具有四个相等的边？",
        answers: {
            a: "长方形",
            b: "正方形",
            c: "梯形"
        },
        correctAnswer: "b"
    },
    {
        question: "4. 以下哪个是太阳系中最大的行星？",
        answers: {
            a: "木星",
            b: "土星",
            c: "天王星"
        },
        correctAnswer: "a"
    },
    {
        question: "5. 以下哪种动物是哺乳动物？",
        answers: {
            a: "蛇",
            b: "蜥蜴",
            c: "袋鼠"
        },
        correctAnswer: "c"
    },
    {
        question: "6. 在计算机科学中，哪个术语用于表示无法通过算法解决的问题？",
        answers: {
            a: "困难问题",
            b: "无解问题",
            c: "不可计算问题"
        },
        correctAnswer: "c"
    },
    {
        question: "7. 以下哪个是一种编程语言？",
        answers: {
            a: "Python",
            b: "HTML",
            c: "CSS"
        },
        correctAnswer: "a"
    },
    {
        question: "8. 能源最终转化为哪种形式的能？",
        answers: {
            a: "电能",
            b: "机械能",
            c: "热能"
        },
        correctAnswer: "c"
    },
    {
        question: "9. 人类基因组中大约有多少个基因？",
        answers: {
            a: "2000",
            b: "20,000",
            c: "200,000"
        },
        correctAnswer: "b"
    },
    {
        question: "10. 在国际象棋中，哪个棋子可以横着和竖着移动？",
        answers: {
            a: "国王",
            b: "皇后",
            c: "车"
        },
        correctAnswer: "c"
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;

function buildQuiz() {
    const currentQuestion = quiz[currentQuestionIndex];

    const answers = [];
    for (letter in currentQuestion.answers) {
        answers.push(
            `<label>
            <input type="radio" name="question" value="${letter}">
            ${letter} : ${currentQuestion.answers[letter]}
        </label>`
    );
}

quizContainer.innerHTML = `
    <div class="question">${currentQuestion.question}</div>
    <div class="answers">${answers.join("")}</div>
`;

if (currentQuestionIndex === quiz.length - 1) {
    submitButton.textContent = "提交答案";
} else {
    submitButton.textContent = "下一题";
}
}

function showResults() {
    if (submitButton.textContent === "提交答案") {
        const iq = Math.round((correctAnswers / quiz.length) * 200);

        quizContainer.innerHTML = `
            <h2>你的智商得分是：${iq}</h2>
            <p>你答对了 ${correctAnswers} 道题，共有 ${quiz.length} 道题。</p>
            <button id="restart">重新开始</button>
        `;

        submitButton.style.display = "none"; // 隐藏提交答案按钮

        const restartButton = document.getElementById("restart");
        restartButton.addEventListener("click", restartQuiz);
    } else {
        const answerContainers = quizContainer.querySelectorAll(".answers");
        const answerContainer = answerContainers[0];
        const selector = `input[name=question]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === quiz[currentQuestionIndex].correctAnswer) {
            correctAnswers++;
        }

        currentQuestionIndex++;
        buildQuiz();
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    submitButton.style.display = "inline-block"; // 显示提交答案按钮
    buildQuiz();
}


function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    buildQuiz();
}


const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");

buildQuiz();

submitButton.addEventListener("click", showResults);
