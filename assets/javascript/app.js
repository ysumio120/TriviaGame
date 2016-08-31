// Object that holds the question type, question, answer, and choices
function questions(type) {
	this.type = type;
	this.question = "";
	this.answer = "";
	this.choices = [];
	this.chosen = false;
};

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

		console.log(entry);
		arrFormatted.push(entry);
	}
};

//Sets up the page for a new question 
//Randomizes question and order of answer choices
function nextQuestion() {
	var randQuestion;
	var question;

	//Randomly pick a question that has not already been chosen
	do{

		rand = Math.floor(Math.random() * arr.length);
		question = arrFormatted[rand];

	}while(question.chosen == true);
	console.log(question);
	$(".question").html("<p>" + question.question + "</p");

	//Random sort the answer choices if it is multiple choice type
	if(question.type == "multiple choice") {
		rand = Math.floor(Math.random() * 4) + 1;
		$(".choice" + rand).html("<p>" + question.answer + "</p");
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
		} while(choice != 3);

	}
	else {
		$(".choice1").html("<p>True</p");
		$(".choice2").html("<p>False</p");
	}

	return question.answer;
};


var parsedQuestions;

$(document).ready(function() {

	$("#start").on("click", function() {
		$(".jumbotron").css("display", "none");
		console.log("TEST");
		parse(arr);
		nextQuestion();
	});

});

/*
 * Each element is fomratted by,
 * 		- type of question (multiple choice or true/false)	
 *		- a question (begins with 'Q' and a space)
 *      - an answer (begins with 'A' and a space)
 *		- (incorrect) choices (begins with 'C' and a space)
 			- 3 choices for multiple choice questions
 			- either true or false  for true/false questions
 *	Also, each part is separated by '\n' 
 */		 

var arrFormatted = [];
var arr = ["multiple choice\nQ What is your name?\nA Bob\nC John\nC James\nC Kelly"
		
			];