// Object that holds the question type, question, answer, and choices
function questions(type, questions, answer) {
	this.type = type;
	this.questions = "";
	this.answer = "";
	this.choices = [];
}

function parse(text) {
	for(var i = 0; i < text.length; i++) {
		var question = text[0].split("\n");

		for(var j = 0; j < question.length; j++) {
			
		}
		var entry = new

	}
}

$(document).ready(function() {

	$("#start").on("click", function() {
		$(".jumbotron").css("display", "none");
		console.log("TEST");
	});

});

var text = ["multiple choice\nQ What is your name?\nA Bob\nC John\nC James\nC Kelly",
		

				];