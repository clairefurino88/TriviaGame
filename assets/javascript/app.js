var triviaQuestions = [{
    question: "What is the capital city of Spain?",
    answerList: ["Barcelona", "Madrid", "Bolgia", "Valencia"],
    answer: 1
},{
    question:"What is the largest Ocean?",
    answerList: ["Atlantic","Artic","Pacific","Indian"],
    answer: 2 
},{
    question:"What chess piece can move diagonally",
    answerList: ["King","Bishop", "Queen", "Knight"],
    answer: 1
},{
    question:"How wrote the song Toxic?",
    answerList: ["Britney Spears", "Justin Bieber", "Kanye West", "Taylor Swift"],
    answer: 0
},{
    question:"Which color is a primary color?",
    answerList: ["Green", "Purple","Orange", "Yellow"],
    answer: 3
},{
    question:"How many prongs does a fork have?",
    answerList: ["four","five","two","six"],
    answer: 0
},{
    question:"What's the world's longest river?",
    answerList: ["Nile", "Amazon", "Mississippi","Delaware"],
    answer: 1

}];


var currentQuestion; 
var correctAnswer; //correct answers
var incorrectAnswer; //incorrect answers
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;

var messages = {
	correct: "Correct! Excellent work!",
	incorrect: "Nope! You are wrong!",
	endTime: "Time is up!",
	finished: "Good Effort! Let's see how you did!"
}

$('#startBtn').on('click', function(){
	$(this).hide(); //hide start button
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide(); //hiding start over button
	newGame();
});

function newGame(){
	$('#finalMessage').empty(); //resetting messages
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0; 
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
	
	//sets up new questions & answerList
    $('#currentQuestion').html('You are on Question '+(currentQuestion+1)+' out of ' + triviaQuestions.length);
    
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');//
	//using the array triviaQuestions to find the first question at the index (0) using the [currentQuestion] variable
	for(var i = 0; i < 4; i++){
		var choices = $('<div>'); //create div element
		choices.text(triviaQuestions[currentQuestion].answerList[i]); //setting the text of each option inside the div element
		choices.attr({'data-index': i }); //assigning an index to each div element
		choices.addClass('thisChoice'); //adding a class to style each option
		$('.optionsList').append(choices); //parent div class for newly created div element (choices) for options - a place to display answers
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage

	$('.thisChoice').on('click',function(){ //newly created div calss is thisChoice
		userSelect = $(this).data('index'); //taking data index value
		clearInterval(time); //restarting time
		answerPage(); //running anwerpage
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty(); //clearing question reference
	$('.thisChoice').empty(); //Clears options p
	$('.question').empty(); //clears question

	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	var rightAnswerText = triviaQuestions[currentQuestion].answerList[rightAnswerIndex];
	
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 2000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 2000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}