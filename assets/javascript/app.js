function Question(text, choices, answer) {
    this.text=text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.corectAnswer = function(choices) {
    return choice === this.answer;
}
//
//new question javascript file
//
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];

}

Quiz.prototype.isEnded = function() {
    return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function(answer) {
    this.questionIndex++;
    if(this.getQuestionIndex().corectAnswer(answer)) {
        this.score++;
    }
}

//new file app javascript file

function populate() {
    if(quiz.isEnded()) {
        showScores();

    }

    else {
        //show question
        var element= document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
        //show choices
       
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
} 


function showScores() {
 var gameOverHtml = "<h1>Results</h1>";
    gameOverHtml += "<h2> id='score> Your Score: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHtml;

}



var questions = [
    new Question("Who wrote the song Toxic?", ["Britany", "Justin", "Kanye", "Taylor"], "Britany"),
    new Question("What is the world's longest river? ", ["Nile", "Amazon", "Mississippi", "Delaware"], "Nile"),
    new Question("What is the capital city of Spain?", ["Madrid", "Barcelona", "Valencia", "Bilbao"], "Madrid"),
    new Question("Which chess piece can only move diagonally?", ["King", "Queen", "Knight", "Bishop"], "Bishop"),
    new Question("Which color is a primary color?", ["Purple", "Green", "Yellow", "Orange"], "Yellow"),
    new Question("Which is the largest body of water", ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Artic Ocean"], "Pacific Ocean"),
    new Question("How many prongs are on a fork?", ["4", "5", "3", "2"], "4"),
];

var quiz = new Quiz(questions);

populate();

