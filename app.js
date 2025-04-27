var questions = [
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

var quesElement = document.getElementById("ques");
var option1 = document.getElementById("opt1");
var option2 = document.getElementById("opt2");
var option3 = document.getElementById("opt3");
var questionNum = document.getElementById("question");
var index = 0;
var score = 0;
var timer = document.getElementById("timer");
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
    console.log(score);
clearInterval(interval);
    timer.innerHTML = "00 : 00";

    // Hide timer and content
    document.querySelector('.main-top').style.display = 'none';
    document.querySelector('.content-div').style.display = 'none';

    // Create result box
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

    // Add elements into resultDiv
    resultDiv.appendChild(heading);
    resultDiv.appendChild(scoreText);
    resultDiv.appendChild(percentageText);

    // Add resultDiv to body
    document.querySelector('.container').appendChild(resultDiv);

  } else {
    // Normal next question logic
    question++;
    questionNum.innerHTML = `Question ${question} of ${questions.length}`;
    quesElement.innerText = questions[index].question;
    option1.innerText = questions[index].option1;
    option2.innerText = questions[index].option2;
    option3.innerText = questions[index].option3;
    index++;
  }


  // if (index > questions.length - 1) {
  //   console.log(score);
  // } else {
  //   question++;
  //   questionNum.innerHTML = `Question ${question} of ${questions.length}`;
  //   quesElement.innerText = questions[index].question;
  //   option1.innerText = questions[index].option1;
  //   option2.innerText = questions[index].option2;
  //   option3.innerText = questions[index].option3;
  //   index++;
  // }

  min = 1;
  sec = 59;
}

function clicked() {
  var nextBtn = document.getElementById("btn");
  nextBtn.disabled = false;
}


