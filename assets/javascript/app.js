// Object that holds the question type, question, answer, and choices
function questions(type) {
	this.type = type;
	this.question = "";
	this.answer = "";
	this.choices = [];
	this.chosen = false;
};

// Convert each element in 'arr' into "questions" Objects and store them in 'arrFormatted'
function parse(text) {
	var question, rand, entry, x;

	for(var i = 0; i < text.length; i++) {
		question = text[i].split("\n");
		console.log(question);
		var entry = new questions(question[0])

		for(var j = 1; j < question.length; j++) {
			console.log(question[j]);
			var string = question[j].substr(2, question[j].length);

			if(question[j].charAt(0) == "Q") 
				entry.question = string;
			
			else if(question[j].charAt(0) == "A")
				entry.answer = string;
			else
				entry.choices.push({str:string, bool: false});
			
		}
		arrFormatted.push(entry);
	}
};

//Sets up the page for a new question 
//Randomizes question and order of answer choices
function nextQuestion() {
	var randQuestion;
	var question;

	//Check if player has reached the end of the game (answered all questions availabel)
	if((correct + incorrect) == arrFormatted.length) {
		console.log("HERE");
		$(".timer").css("display", "none");
		$(".Q_A").css("display", "none");
		$(".win_loss").prepend("<p id='result'>RESULTS</p>");
		$("#restart").css("display", "block");
		return null;
	}

	//Randomly pick a question that has not already been chosen
	do{

		rand = Math.floor(Math.random() * arrFormatted.length);
		question = arrFormatted[rand];

	}while(question.chosen == true);
	question.chosen = true;

	$(".question").html("<p>" + question.question + "</p><hr>");

	//Random sort the answer choices if it is multiple choice type
	if(question.type == "multiple choice") {
		rand = Math.floor(Math.random() * 4) + 1;
		$(".choice" + rand).html("<p>" + question.answer + "</p>");
		var choice = 0;
		var alreadyAdded = [];

		do {
			rand2 = Math.floor(Math.random() * 4) + 1;
			if(rand == rand2 || $.inArray(rand2, alreadyAdded) != -1)
				continue;
			else {
				if(question.choices[choice].bool == false) {
					alreadyAdded.push(rand2);
					question.choices[choice].bool = true;
					$(".choice" + rand2).html("<p>" + question.choices[choice].str + "</p");
					choice++;
				}
			}
			
		} while(choice < question.choices.length);

	}
	// Simply display "True" and "False" answer choices
	else {
		$(".choice1").html("<p>True</p>");
		$(".choice2").html("<p>False</p>");
	}

	return question.answer;
};

// Starts and keeps track of timer for each question
// Timer set to 15 seconds
function timer() {

	var seconds = 15;
	$(".timer").html("<p>Time left: " + seconds + "</p>");
	time = setInterval(function() {
		$(".timer").html("<p>Time left: " + --seconds + "</p>");
		if(seconds < 0) {
			clearInterval(time);
			incorrect++;
			$("#losses").html("Incorrect: " + incorrect);
			$(".choice").empty();
			if((correctAnswer = nextQuestion()) == null)
				return;	
			timer();
		}
	}, 1000);
};

//Global Variables
var chosenAnswer;
var correctAnswer;
var correct = 0;
var incorrect = 0;
var time;
var transition;
var ans;

$(document).ready(function() {
	
	//Click event for 'Start' button
	$("#start").on("click", function() {
		$(".jumbotron").css("display", "none");
		parse(arr);
		timer();
		$("#wins").html("Correct: 0" );
		$("#losses").html("Incorrect: 0");
		correctAnswer = nextQuestion();
	});

	//Click event when choosing an answer
	$(".choice").on("click", play);

	//Click event for 'Restart' button
	$("#restart").on("click", function() {
		$("#restart").css("display", "none");
		$(".timer").css("display", "initial");
		$(".Q_A").css("display", "initial");
		$("#result").remove();
		$(".restart").css("display", "block");
		correct = 0;
		incorrect = 0;
		arrFormatted = [];
		parse(arr);
		timer();
		$("#wins").html("Correct: 0" );
		$("#losses").html("Incorrect: 0");
		$(".choice").on("click", play);
		correctAnswer = nextQuestion();

	});

});

function play() {
	clearInterval(time);
	var chosen = $(this);
	chosenAnswer = chosen.text();

	if(chosenAnswer == correctAnswer) {
		correct++;
		$("#wins").html("Correct: " + correct);
		chosen.addClass("correct");
	}
	else {
		incorrect++;
		$("#losses").html("Incorrect: " + incorrect);
		chosen.addClass("incorrect");	
	}
	$(".choice").off("click");
		transition = setTimeout(function() {
		chosen.removeClass("correct");
		chosen.removeClass("incorrect");
		$(".choice").empty();
		if((correctAnswer = nextQuestion()) != null) {	
			$(".choice").on("click", play);
			timer();
		}
	}, 3000);
};

/*
 * Each element is fomratted by,
 * 		- type of question (multiple choice or true/false)	
 *		- a question (begins with 'Q' and a space)
 *      - an answer (begins with 'A' and a space)
 *		- (incorrect) choices (begins with 'C' and a space)
 			- 3 or less choices for multiple choice questions
 			- no other choices are needed for true/false questions
 *	Also, each part is separated by '\n' 
 */		 

var arrFormatted = [];
var arr = ["multiple choice\nQ The Yalu River separates China from what other country?\nA North Korea\nC South Korea\nC Thailand\nC India",
			"multiple choice\nQ What distant planet circles the Sun every 84 years?\nA Uranus\nC Saturn\nC Mars\nC Venus",
			"multiple choice\nQ Facebook was originally developed as a social tool for students at which university?\nA Harvard\nC Princeton\nC Yale\nC Cornell",
			"multiple choice\nQ What company invented the floppy disk in 1970?\nA IBM\nC Microsoft\nC Apple",
			"multiple choice\nQ What flavoured jellybeans were created for United States' President Ronald Reagan's inauguration?\nA Blueberry\nC Raspberry\nC Apple\nC Lemon",
			"multiple choice\nQ What was the first sport to be televised in the US?\nA Baseball\nC Tennis\nC Football\nC Basketball",
			"multiple choice\nQ What is the fear of mice known as?\nA Musophobia\nC Arachnophobia\nC Panophobia\nC Kenophobia",
			"multiple choice\nQ What US state is home to CNN?\nA Georgia\nC California\nC Florida\nC New York",
			"true/false\nQ Au is the chemical symbol for gold\nA True",
			"true/false\nQ The hummingbird is the only bird that can fly backwards\nA True",
			"true/false\nQ A camel's hump contains mostly of muscle\nA False",
			"true/false\nQ Karate means 'empty hand' in Japanese\nA True",
			"true/false\nQ A bullseye is worth 100 points in darts\nA False",
			"true/false\nQ You can combine sodium and chlorine to make ordinary table salt\nA True",	
			"true/false\nQ A garfish is a fish that has green bones\nA True"	
			];