// Object that holds the question type, question, answer, and choices
function questions(type) {
	this.type = type;
	this.question = "";
	this.answer = "";
	this.choices = [];
	this.chosen = false;
}

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
				entry.choices.push(string);
			
		}
		console.log(entry);

		if(question[0] == "muliple choice") 
			rand = Math.ceil(Math.random() * 4);
		

	}
}

var parsedQuestions;

$(document).ready(function() {

	$("#start").on("click", function() {
		$(".jumbotron").css("display", "none");
		console.log("TEST");
		parse(text);
	});

});


var text = ["multiple choice\nQ What is your name?\nA Bob\nC John\nC James\nC Kelly"
		
			];