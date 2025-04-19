const welcomeContainer = document.getElementById("welcome-container");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const resultContainer = document.getElementById("result-container");
const finalScoreElement = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");
const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;
let selectedCategory = "";
let currentQuestions = [];

const quizData = {
  html: [
    {
      question: "What does HTML stand for?",
      options: ["Hyper Type Markup Language", "HyperText Markdown Language", "HyperText Markup Language", "Home Tool Markup Language"],
      answer: "HyperText Markup Language"
    },
    {
      question: "Which tag is used to make a numbered list?",
      options: ["<ul>", "<ol>", "<li>", "<list>"],
      answer: "<ol>"
    },
    {
      question: "What is the correct HTML tag for inserting a line break?",
      options: ["<break>", "<br>", "<lb>", "<newline>"],
      answer: "<br>"
    },
    {
      question: "Which tag is used to display an image?",
      options: ["<img>", "<image>", "<src>", "<pic>"],
      answer: "<img>"
    },
    {
      question: "Which attribute is used for image source?",
      options: ["href", "src", "link", "image"],
      answer: "src"
    },
    {
      question: "Which tag is used for creating a hyperlink?",
      options: ["<a>", "<link>", "<href>", "<url>"],
      answer: "<a>"
    },
    {
      question: "What is the default alignment of text in a <p> tag?",
      options: ["Left", "Center", "Right", "Justify"],
      answer: "Left"
    },
    {
      question: "What tag is used for bold text?",
      options: ["<bold>", "<strong>", "<bld>", "<heavy>"],
      answer: "<strong>"
    },
    {
      question: "How do you write a comment in HTML?",
      options: ["// comment", "<!-- comment -->", "# comment", "** comment **"],
      answer: "<!-- comment -->"
    },
    {
      question: "Which tag defines a table?",
      options: ["<td>", "<table>", "<tab>", "<tbl>"],
      answer: "<table>"
    },
    {
      question: "Which tag is used for table row?",
      options: ["<td>", "<row>", "<tr>", "<th>"],
      answer: "<tr>"
    },
    {
      question: "Which tag is used to define table header?",
      options: ["<thead>", "<th>", "<header>", "<head>"],
      answer: "<th>"
    },
    {
      question: "Which tag is used to define a list item?",
      options: ["<ul>", "<ol>", "<li>", "<list>"],
      answer: "<li>"
    },
    {
      question: "Which tag represents emphasized text?",
      options: ["<i>", "<italic>", "<em>", "<strong>"],
      answer: "<em>"
    },
    {
      question: "What is the purpose of <title> tag?",
      options: ["To set the page heading", "To define footer", "To set the browser title", "To add image"],
      answer: "To set the browser title"
    },
    {
      question: "Which element is used for inserting a horizontal line?",
      options: ["<hr>", "<line>", "<br>", "<hl>"],
      answer: "<hr>"
    },
    {
      question: "What does the <head> tag contain?",
      options: ["Main content", "Meta data", "Page footer", "All the above"],
      answer: "Meta data"
    },
    {
      question: "Which input type is used for selecting a file?",
      options: ["text", "file", "submit", "checkbox"],
      answer: "file"
    },
    {
      question: "What is the use of <form> tag?",
      options: ["To create forms", "To add images", "To display videos", "To make bold text"],
      answer: "To create forms"
    },
    {
      question: "Which tag is used to define inline text formatting?",
      options: ["<span>", "<div>", "<section>", "<main>"],
      answer: "<span>"
    },
    {
      question: "Which of the following is a semantic tag?",
      options: ["<b>", "<i>", "<article>", "<font>"],
      answer: "<article>"
    },
    {
      question: "What is the correct way to start an HTML document?",
      options: ["<html>", "<!DOCTYPE html>", "<start>", "<begin>"],
      answer: "<!DOCTYPE html>"
    },
    {
      question: "Which HTML element is used for audio playback?",
      options: ["<sound>", "<music>", "<audio>", "<play>"],
      answer: "<audio>"
    },
    {
      question: "Which tag is used to group block-elements?",
      options: ["<div>", "<group>", "<span>", "<container>"],
      answer: "<div>"
    }
  ],
  css: [
    {    
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which HTML tag is used to link external CSS?",
    options: ["<script>", "<css>", "<style>", "<link>"],
    answer: "<link>"
  },
  {
    question: "Which property changes text color?",
    options: ["font-color", "text-color", "color", "style"],
    answer: "color"
  },
  {
    question: "How do you select an element by its ID in CSS?",
    options: [".id", "#id", "*id", "id"],
    answer: "#id"
  },
  {
    question: "Which symbol is used to select a class in CSS?",
    options: ["#", "*", ".", "/"],
    answer: "."
  },
  {
    question: "What is the default position value of an element?",
    options: ["fixed", "relative", "absolute", "static"],
    answer: "static"
  },
  {
    question: "Which property is used to change the background color?",
    options: ["color", "background", "bgcolor", "background-color"],
    answer: "background-color"
  },
  {
    question: "How do you add a comment in CSS?",
    options: ["// comment", "<!-- comment -->", "/* comment */", "# comment"],
    answer: "/* comment */"
  },
  {
    question: "Which property is used to change font?",
    options: ["font-family", "text-style", "font-weight", "font-change"],
    answer: "font-family"
  },
  {
    question: "How to make text bold?",
    options: ["font-style: bold", "font-weight: bold", "style: bold", "text-bold: true"],
    answer: "font-weight: bold"
  },
  {
    question: "What unit is used for responsive fonts?",
    options: ["px", "pt", "em", "cm"],
    answer: "em"
  },
  {
    question: "What does 'px' stand for?",
    options: ["Pixel", "Percent", "Padding Extra", "Page X"],
    answer: "Pixel"
  },
  {
    question: "Which CSS property controls spacing inside an element?",
    options: ["margin", "padding", "border", "spacing"],
    answer: "padding"
  },
  {
    question: "Which CSS property adds space outside the border?",
    options: ["padding", "margin", "border-spacing", "gap"],
    answer: "margin"
  },
  {
    question: "What value makes an element invisible but keeps its space?",
    options: ["display: none", "visibility: hidden", "opacity: 0", "position: absolute"],
    answer: "visibility: hidden"
  },
  {
    question: "How do you center a block element horizontally?",
    options: [
      "text-align: center",
      "margin: 0 auto",
      "padding: auto",
      "align: center"
    ],
    answer: "margin: 0 auto"
  },
  {
    question: "Which property is used for shadow behind text?",
    options: ["text-decoration", "box-shadow", "text-shadow", "font-shadow"],
    answer: "text-shadow"
  },
  {
    question: "Which property creates rounded corners?",
    options: ["border", "border-style", "border-radius", "corner-radius"],
    answer: "border-radius"
  },
  {
    question: "How do you make a flex container?",
    options: [
      "display: block",
      "position: absolute",
      "display: flex",
      "float: left"
    ],
    answer: "display: flex"
  },
  {
    question: "What does z-index control?",
    options: ["Font size", "Background color", "Stack order", "Alignment"],
    answer: "Stack order"
  },
  {
    question: "Which property is used to change the cursor on hover?",
    options: ["pointer", "cursor", "hover", "mouse"],
    answer: "cursor"
  },
  {
    question: "Which property is used for animation?",
    options: ["transition", "effect", "animate", "duration"],
    answer: "transition"
  },
  {
    question: "Which media query is used for responsive design?",
    options: ["@media", "@screen", "@responsive", "@viewport"],
    answer: "@media"
  },
  {
    question: "Which property is used to add space between lines?",
    options: ["line-gap", "line-spacing", "line-height", "spacing"],
    answer: "line-height"
  },
  {
    question: "What property changes the element layout from block to inline?",
    options: ["display", "position", "float", "visibility"],
    answer: "display"
  } ],

  js: [ // FIXED: Changed `correctAnswer` to `answer`
    {
      question: "Which of the following is used to declare a variable in JavaScript?",
      options: ["var", "let", "const", "All of the above"],
      answer: "All of the above"
    },
    {
      question: "Which keyword is used to define a constant in JavaScript?",
      options: ["var", "const", "let", "constant"],
      answer: "const"
    },
    {
      question: "What does the console.log() method do in JavaScript?",
      options: ["Prints output to the screen", "Prints output to the console", "Shows an alert", "Writes to a file"],
      answer: "Prints output to the console"
    },
    {
      question: "What is the result of typeof 42 in JavaScript?",
      options: ["'number'", "'string'", "'boolean'", "'undefined'"],
      answer: "'number'"
    },
    {
      question: "Which method can be used to convert a string into a number in JavaScript?",
      options: ["parseInt()", "parseFloat()", "toString()", "Both 1 and 2"],
      answer: "Both 1 and 2"
    },
    {
      question: "What does NaN stand for in JavaScript?",
      options: ["Not a Number", "Not a Null", "No Number", "Not available"],
      answer: "Not a Number"
    },
    {
      question: "What is the output of Boolean('false') in JavaScript?",
      options: ["true", "false", "undefined", "NaN"],
      answer: "true"
    },
    {
      question: "How can you define a function in JavaScript?",
      options: ["function myFunc() {}", "def myFunc() {}", "func myFunc() {}", "function: myFunc()"],
      answer: "function myFunc() {}"
    },
    {
      question: "What does the !== operator mean in JavaScript?",
      options: ["Equal to", "Not equal to", "Strict equal to", "Strict not equal to"],
      answer: "Strict not equal to"
    },
    {
      question: "Which of the following methods is used to add an element to the end of an array in JavaScript?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      answer: "push()"
    },
    {
      question: "Which operator is used to assign a value to a variable in JavaScript?",
      options: ["=", "==", "===", ":="],
      answer: "="
    },
    {
      question: "How can you check if a variable is an array in JavaScript?",
      options: ["Array.isArray()", "typeof array()", "instanceof Array", "None of the above"],
      answer: "Array.isArray()"
    },
    {
      question: "Which of the following will you use to add a new property to an object?",
      options: ["object.property = value", "object['property'] = value", "Both 1 and 2", "None of the above"],
      answer: "Both 1 and 2"
    },
    {
      question: "What is the scope of a variable declared with let inside a block in JavaScript?",
      options: ["Global scope", "Function scope", "Block scope", "None of the above"],
      answer: "Block scope"
    },
    {
      question: "What does the map() method do in JavaScript?",
      options: ["Creates a new array with the results of a function applied to each element", "Filters elements in an array", "Loops through the array", "None of the above"],
      answer: "Creates a new array with the results of a function applied to each element"
    },
    {
      question: "What is a closure in JavaScript?",
      options: ["A function that is defined inside another function", "A function that returns a value", "A function that accesses its outer function's variables", "None of the above"],
      answer: "A function that accesses its outer function's variables"
    },
    {
      question: "What is the this keyword in JavaScript?",
      options: ["Refers to the current object", "Refers to the global object", "Refers to the function itself", "None of the above"],
      answer: "Refers to the current object"
    },
    {
      question: "What is the result of 2 + '2' in JavaScript?",
      options: ["4", "'22'", "undefined", "NaN"],
      answer: "'22'"
    },
    {
      question: "Which of the following is a valid way to create a new array in JavaScript?",
      options: ["[]", "new Array()", "Array.of()", "All of the above"],
      answer: "All of the above"
    },
    {
      question: "What is the purpose of the reduce() method in JavaScript?",
      options: ["To iterate over an array", "To reduce the array to a single value", "To create a new array", "To remove elements from an array"],
      answer: "To reduce the array to a single value"
    },
    {
      question: "How do you create a new object in JavaScript?",
      options: ["var obj = {}", "var obj = new Object()", "Both 1 and 2", "None of the above"],
      answer: "Both 1 and 2"
    },
    {
      question: "What is the output of typeof null in JavaScript?",
      options: ["'object'", "'null'", "'undefined'", "'boolean'"],
      answer: "'object'"
    },
    {
      question: "Which method is used to remove the last element from an array in JavaScript?",
      options: ["pop()", "push()", "shift()", "unshift()"],
      answer: "pop()"
    },
    {
      question: "How can you write a comment in JavaScript?",
      options: ["// This is a comment", "/* This is a comment */", "Both 1 and 2", "None of the above"],
      answer: "Both 1 and 2"
    },
    {
      question: "What does the Array.prototype.sort() method do in JavaScript?",
      options: ["Sorts the array in ascending order", "Sorts the array in descending order", "Sorts the array based on a comparator", "None of the above"],
      answer: "Sorts the array based on a comparator"
    },
    {
      question: "What does JSON.parse() do in JavaScript?",
      options: ["Converts a JSON string to a JavaScript object", "Converts a JavaScript object to a JSON string", "Both 1 and 2", "None of the above"],
      answer: "Converts a JSON string to a JavaScript object"
    }
  ]
};

// Category click setup
document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    currentQuestions = quizData[selectedCategory];
    startQuiz();
  });
});

function startQuiz() {
  welcomeContainer.style.display = "none";
  questionContainer.style.display = "block";
  resultContainer.style.display = "none";
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  const current = currentQuestions[currentQuestionIndex];
  questionElement.textContent = current.question;
  optionsContainer.innerHTML = "";

  current.options.forEach(option => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = option;
    button.addEventListener("click", selectAnswer);
    li.appendChild(button);
    optionsContainer.appendChild(li);
  });

  answerSelected = false;
  nextButton.disabled = true;
  backButton.disabled = currentQuestionIndex === 0;
}

function selectAnswer(e) {
  if (answerSelected) return;
  answerSelected = true;
  nextButton.disabled = false;

  const selected = e.target;
  const selectedAnswer = selected.textContent;
  const correctAnswer = currentQuestions[currentQuestionIndex].answer;

  if (selectedAnswer === correctAnswer) {
    selected.classList.add("correct");
    score++;
    setTimeout(nextQuestion, 1000);
  } else {
    selected.classList.add("incorrect");
    optionsContainer.querySelectorAll(".option").forEach(btn => {
      if (btn.textContent === correctAnswer) btn.classList.add("correct");
    });
  }
}

function nextQuestion() {
  if (currentQuestionIndex < currentQuestions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResults();
  }
}

function backQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
  }
}

function showResults() {
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
  finalScoreElement.textContent = `You scored ${score} out of ${currentQuestions.length}!`;
}

function restartQuiz() {
  welcomeContainer.style.display = "block";
  questionContainer.style.display = "none";
  resultContainer.style.display = "none";
}

nextButton.addEventListener("click", nextQuestion);
backButton.addEventListener("click", backQuestion);
restartButton.addEventListener("click", restartQuiz);
