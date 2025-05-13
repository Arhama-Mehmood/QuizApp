const firebaseConfig = {
  apiKey: "AIzaSyBu_FY9h93a-8yPWgdmMoMVp3r6cTf0fAo",
  authDomain: "quizapp-7dc8f.firebaseapp.com",
  databaseURL: "https://quizapp-7dc8f-default-rtdb.firebaseio.com",
  projectId: "quizapp-7dc8f",
  storageBucket: "quizapp-7dc8f.appspot.com",
  messagingSenderId: "512595047873",
  appId: "1:512595047873:web:ec46e22c6a0cef94cc6b40"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.database();

var localQuestions = [
  {
    question: "HTML Stands for ?",
    option1: "Hyper Text Markup Language",
    option2: "Hyper Tech Markup Language",
    option3: "Hyper Touch Markup Language",
    corrAnswer: "Hyper Text Markup Language",
  },
  {
    question: "CSS Stands for ?",
    option1: "Cascoding Style Sheets",
    option2: "Cascading Style Sheets",
    option3: "Cascating Style Sheets",
    corrAnswer: "Cascading Style Sheets",
  },
  {
    question: "Which tag is used for most large heading ?",
    option1: "<h6>",
    option2: "<h2>",
    option3: "<h1>",
    corrAnswer: "<h1>",
  },
  {
    question: "Which tag is used to make element unique ? ",
    option1: "id",
    option2: "class  ",
    option3: "label",
    corrAnswer: "id",
  },
  {
    question: "Any element assigned with id, can be get in css ? ",
    option1: "by # tag",
    option2: "by @ tag",
    option3: "by & tag",
    corrAnswer: "by # tag",
  },
  {
    question: "CSS can be used with ______ methods ? ",
    option1: "8",
    option2: "3",
    option3: "4",
    corrAnswer: "3",
  },
  {
    question: "In JS variable types are ____________ ?",
    option1: "6",
    option2: "3",
    option3: "8",
    corrAnswer: "8",
  },
  {
    question: "In array we can use key name and value ?",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
  {
    question: "toFixed() is used to define length of decimal ?",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "True",
  },
  {
    question: "push() method is used to add element in the start of array ?",
    option1: "True",
    option2: "False",
    option3: "None of above",
    corrAnswer: "False",
  },
];

// Optional first-time upload
const questionsData = {};
for (let i = 0; i < localQuestions.length; i++) {
  questionsData[`q${i + 1}`] = localQuestions[i];
}

db.ref("quizQuestions").set(questionsData);


var questions = [];
db.ref("quizQuestions").on("child_added", function (data) {
  questions.push(data.val());
});

var quesElement = document.getElementById("ques");
var option1 = document.getElementById("opt1");
var option2 = document.getElementById("opt2");
var option3 = document.getElementById("opt3");
var questionNum = document.getElementById("question");
var timer = document.getElementById("timer");

var index = 0;
var score = 0;
var min = 1;
var sec = 59;
var question = 0;

var interval = setInterval(function () {
  timer.innerHTML = `${min} : ${sec}`;
  sec--;
  if (sec < 0) {
    min--;
    sec = 59;
    if (min < 0) {
      min = 1;
      sec = 59;
      nextQuestion();
    }
  }
}, 1000);

function nextQuestion() {
  var nextBtn = document.getElementById("btn");
  var allOptions = document.getElementsByTagName("input");

  for (var i = 0; i < allOptions.length; i++) {
    if (allOptions[i].checked) {
      allOptions[i].checked = false;
      var selectedValue = allOptions[i].value;
      var selectedOption = questions[index - 1][`option${selectedValue}`];
      var correctAnswer = questions[index - 1]["corrAnswer"];
      if (selectedOption === correctAnswer) {
        score++;
      }
    }
  }

  nextBtn.disabled = true;

  if (index > questions.length - 1) {
    clearInterval(interval);
    timer.innerHTML = "00 : 00";

    document.querySelector('.main-top').style.display = 'none';
    document.querySelector('.content-div').style.display = 'none';

    var resultDiv = document.createElement('div');
    resultDiv.className = 'result-div text-center text-white p-5 rounded-4';
    resultDiv.style.backgroundColor = '#345752';
    resultDiv.style.width = '500px';
    resultDiv.style.margin = 'auto';
    resultDiv.style.boxShadow = '10px 10px 20px gray';

    var heading = document.createElement('h2');
    heading.innerText = 'Quiz Completed!';

    var scoreText = document.createElement('h3');
    scoreText.innerText = `Your Score: ${score} / ${questions.length}`;

    var percentageText = document.createElement('h4');
    percentageText.innerText = `Percentage: ${((score / questions.length) * 100).toFixed(2)}%`;

    resultDiv.appendChild(heading);
    resultDiv.appendChild(scoreText);
    resultDiv.appendChild(percentageText);
    document.querySelector('.container').appendChild(resultDiv);

    db.ref("quizResult").set({
      result: {
        score: score,
        percentage: ((score / questions.length) * 100).toFixed(2) + "%",
        time: new Date().toLocaleString()
      }
    });

  } else {
    question++;
    questionNum.innerHTML = `Question ${question} of ${questions.length}`;
    quesElement.innerText = questions[index].question;
    option1.innerText = questions[index].option1;
    option2.innerText = questions[index].option2;
    option3.innerText = questions[index].option3;
    index++;
  }

  min = 1;
  sec = 59;
}

function clicked() {
  document.getElementById("btn").disabled = false;
}

function selectOption(id) {
  let all = ['opt1', 'opt2', 'opt3'];
  all.forEach(opt => {
    document.getElementById(opt).checked = false;
  });
  document.getElementById(id).checked = true;
  clicked();
}

