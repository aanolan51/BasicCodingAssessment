//Create the global variables to be used:
var questionIndex;
var highScoreArray = [];
var quesDisplay;
var score = 0;
var timeStart;
var listHighScore;
var rightAnswerDisplay;
var userName;
var timerReduction;
var oneSecondInterval;
var highScoreButton = document.getElementById('highScore');
var startButton = document.getElementById('start_button');
var nextButton = document.getElementById('next_button');
var submitButton = document.getElementById('submit_button');
var scorePage = document.getElementById('score_page');
var quizPage = document.getElementById('quiz_page');
var recentScore = document.getElementById('recentScore');
var timerDisplay = document.getElementById('timer');
var highScorePage = document.getElementById('highScore_page');
var questionPool; //Create a variable that will be a copy of the questionBank array so that items can be removed as they are displayed.

//Create the variables that will be used to push the object content to the HTML for display:
var currentQuestion;
var choiceADisplay;
var choiceBDisplay;
var choiceCDisplay;
var choiceDDisplay;


//Create an array of objects for each question and the corresponding answer choices, and the correct answer:
var questionBank = [
  { //object one
    question: "What does a for loop do?",
  
    choiceA: "Executes code, or stops executing it, based on a boolean condition at the end.",
    choiceB: "Executes a block of code through a specified number of iterations.",
    choiceC: "Executes a block of code that is self-contained and can be called over and over again.",
    choiceD: "Executes code if a specific condition is met.",
    
    rightAnswer: "Executes a block of code through a specified number of iterations."
  },

  { //object two
    question: "What does console.log() do?",
    
    choiceA: "Prints information to the console to help a user follow along with the code execution.",
    choiceB: "Prints logs to the console.",
    choiceC: "Displays an alert pop-up to the user with an error message.",
    choiceD: "Pushes content to the HTML file.",
  
    rightAnswer: "Prints information to the console to help a user follow along with the code execution."
  },

  { //object three
    question: "What does HTML and CSS stand for?",
    
    choiceA: "They don't stand for anything.",
    choiceB: "HyperText Markup Language and Coding Style Sections.",
    choiceC: "HyperText Markup Language and Cascading Style Sheets.",
    choiceD: "High Tech Math Language and Cascading Style Sheets.",
  
    rightAnswer: "HyperText Markup Language and Cascading Style Sheets."
  },

  { //object four
    question: "What line of code takes in user input and sets it to a variable?",
    
    choiceA: "Let userInput = alert(\"What is your favorite color?\")",
    choiceB: "Let userInput = promt(\"What is your favorite color?\")",
    choiceC: "Let userInput = print(\"What is your favorite color?\")",
    choiceD: "Let userInput = prompt(\"What is your favorite color?\")",
  
    rightAnswer: "Let userInput = prompt(\"What is your favorite color?\")"
  },

  { //object five
    question: "How do you create a div element using Javascript?",
    
    choiceA: "$('#parent').append('<div>hello</div>');",
    choiceB: "document.body.appendChild(div);",
    choiceC: "var div = document.createElement('div');",
    choiceD: "document.createElement(<div>)",
  
    rightAnswer: "var div = document.createElement('div');"
  }
  
];


//Get a question and corresponding answer from the question bank to display:

function displayQuestion(){
  //Clear the checks from previous question on the radio button:
  document.getElementById('A').checked = false;
  document.getElementById('B').checked = false;
  document.getElementById('C').checked = false;
  document.getElementById('D').checked = false;

  
    questionIndex = Math.floor(Math.random()* questionPool.length);

    currentQuestion = questionPool[questionIndex].question;
    //console.log(currentQuestion);
    document.getElementById("quesDisplay").textContent = currentQuestion;
  
    choiceADisplay = questionPool[questionIndex].choiceA;
    document.getElementById('choiceADisplay').textContent = choiceADisplay;

    choiceBDisplay = questionPool[questionIndex].choiceB;
    document.getElementById('choiceBDisplay').textContent = choiceBDisplay;

    choiceCDisplay = questionPool[questionIndex].choiceC;
    document.getElementById('choiceCDisplay').textContent = choiceCDisplay;

    choiceDDisplay = questionPool[questionIndex].choiceD;
    document.getElementById('choiceDDisplay').textContent = choiceDDisplay;

    rightAnswerDisplay = questionPool[questionIndex].rightAnswer; // Sets the variable for the rightAnswer to be graded later.

    questionPool.splice(questionIndex, 1); //Remove the question that was just displayed from the pool of available questions


};


/*testing completed prior to writing checkAnswer function:
console.log(document.getElementById('A').checked); // returns false, because not checked on form entry
document.getElementById('A').addEventListener('click', function(){
  console.log(document.getElementById('A').checked);
//}) // returns true if A is clicked */


function checkAnswer(){
  //Adding an event listner. When an option is selected, a variable selection is set to the corresponding label text which will be 
  //matched to the right answer for grading. If the right answer is selected, one point will be added. Commented out console.log tests.
  document.getElementById('A').addEventListener('click', function(){
    if(document.getElementById('A').checked){      
      if(choiceADisplay == rightAnswerDisplay){
        //console.log('Right answer chosen!')
        score++;        
      } 
    }
  });

  document.getElementById('B').addEventListener('click', function(){
    if(document.getElementById('B').checked){
      //console.log(choiceBDisplay);
      if(choiceBDisplay == rightAnswerDisplay){
        //console.log('Right answer chosen!')
        score++;        
      }      
    }
  });

  document.getElementById('C').addEventListener('click', function(){
    if(document.getElementById('C').checked){
      //console.log(choiceCDisplay)      
      if(choiceCDisplay == rightAnswerDisplay){
        //console.log('Right answer chosen!')
        score++;        
      } 
    }
  });

  document.getElementById('D').addEventListener('click', function(){
    if(document.getElementById('D').checked){
      //console.log(choiceDDisplay);
      if(choiceDDisplay == rightAnswerDisplay){
        //console.log('Right answer chosen!');
        score++;        
      } 
    }
  });
  
};


function hideStart(){
  //Hide start button once the quiz has started
  startButton.style.display = 'none'; 
};


function timerCountdown(){
  timeStart = 300;

  oneSecondInterval = setInterval(function(){    
    //Display how much time is left if timer is still >0 seconds and subtract one second:
    if(timeStart > 0){
      timerDisplay.textContent = timeStart;
      timeStart--;
    }
    
    if(timeStart == 0){
      //clear the timer interval:
      clearInterval(oneSecondInterval);
      //Display the last page to try again:
      submit();
    }
  }, 1000);
};


function wrongAnswerTimer(){
  //Add event listeners and check if answer is correct, if wrong, reduce the timeStart variable by a larger jump. 
  //This function will be used on the next button, so that it will only take time off once the answer
  //is officially graded. Console.log testing has been commented out.
  //console.log('WRONG ANSWER TIMER BEING CALLED');
  
  if(document.getElementById('A').checked){
    //console.log('A being reduced');  
    if(choiceADisplay !== rightAnswerDisplay){
      timeStart -= 40;
      //console.log('choice a is wrong');             
    } 
  }

  if(document.getElementById('B').checked){
    //console.log('B being reduced');    
    if(choiceBDisplay !== rightAnswerDisplay){
      timeStart -= 40; 
      //console.log('choice b is wrong');            
    } 
  }

  if(document.getElementById('C').checked){
    //console.log('C being reduced');    
    if(choiceCDisplay !== rightAnswerDisplay){
      timeStart -= 40;  
      //console.log('choice c is wrong');            
    } 
  }

  if(document.getElementById('D').checked){
    //console.log('D being reduced');
    if(choiceDDisplay !== rightAnswerDisplay){
      timeStart -= 40;
      //console.log('choice d is wrong');     
    } 
  } 
};



function submit(){
    //Clear timer if it hasn't reached 0 yet:
  clearInterval(oneSecondInterval);

  //Take in username:
  userName = prompt("What is your username?");
  //console.log(userName);

  quizPage.style.display = 'none';
  scorePage.style.display = 'inline-block';
  highScoreButton.style.display = 'none'; 
  
  //Change the score to a string and write it to the header element with the id of recentScore:
  score = score.toString();
  score = Math.floor(score/questionBank.length*100);
  recentScore.textContent = (score + ' %');


  //Set the local storage key and value:
  window.localStorage.setItem(userName, score);


  //get all the keys from the local storage object and set them equal to a variable keys:
  let keys = Object.keys(localStorage);

  //For all the keys from local storage, loop through each one and push as an object {} to the highScoreArray. Console.log for testing
  for (i = 0; i <keys.length; i++){
    highScoreArray.push({name: keys[i], score: localStorage.getItem(keys[i])});
    //console.log('HIGHSCORE ARRAY!');
    //console.log(highScoreArray);
  }

  //Sort the array from high to low in order to create a high scores list in order:
  highScoreArray.sort(function(low,high){
    return high.score - low.score;
  });
  //console.log testing to make sure the array is ordered from high to low:
  //console.log('sorted array');
  //console.log(highScoreArray);

  //Create a new array that will only be the first five items of the highScoresArray:
  
  const topFiveArray = highScoreArray.slice(0,5);
  //console.log(topFiveArray);

  //now create a for loop for li elements to push in top 5 high scores:
  for(i=0; i<topFiveArray.length; i++){
    //Create the list element for the highscore:
    listHighScore = document.createElement('li');

    //Set an ID attribute to created list element:
    listHighScore.setAttribute('id', 'highScoreLi');

    //Append the created list element for the high score to the <ul> tag:
    highScoreList.appendChild(listHighScore);
  
    //Create the text content that will go into the list element:
    listHighScore.textContent =  topFiveArray[i].name + ' got ' + topFiveArray[i].score + ' %';
  }

};



function startQuiz(){

  //Create the questionPool array:
  questionPool = [...questionBank];
    
    
  //Run the displayQuestion and checkAnswer functions
  displayQuestion();
  checkAnswer();
  timerCountdown();
  
  
  //display next button:
  nextButton.style.display = 'initial';
  
  //Listen for nextButton being clicked, and then run the displayQuestion function again.
  nextButton.addEventListener('click', function() {
    wrongAnswerTimer(); //check boxes not cleared yet, so timer will reduce.
    displayQuestion(); //Setting checked boxes to false.
    
     //Only working on first question. Sometimes only works on second question if a button pressed on first page.
    //When re-try quiz not working. WHY IS IT ONLY WORKING ONCE?!

    if(questionPool.length == 0){
      nextButton.style.display = 'none';
      submitButton.style.display = 'initial';
    }
    
  });

  //Run the submit button function when the submit button is clicked:
  submitButton.addEventListener('click', function(){
    submit();

  });
  
};


//At start, scorePage, Next button and submit button are hidden:
scorePage.style.display = 'none';
submitButton.style.display = 'none';
nextButton.style.display = 'none';


//To start the quiz on click of start button:

startButton.addEventListener('click', startQuiz);



document.getElementById('Re-try').addEventListener('click', function(){
  //Reload the original start page:
  window.location.reload();
  
});


  





  
  
 