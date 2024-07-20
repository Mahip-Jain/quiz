import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import db from "./firebase";

function NewQuiz() {
	const [questions, setQuestions] = useState([]);
	const [options, setOptions] = useState([]);
	const [correctOptions, setCorrectOptions] = useState([]);
	const [addQuestionPress, setAddQuestionPress] = useState(false);
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [difficulty, setDifficulty] = useState("");
	const [infoFilled, setInfoFilled] = useState(false);
	// const [questionInput, setQuestionInput] = useState("");
	function handleForm(e) {
		// handle the form
		var formData = new FormData(e.target);
		const question = formData.get("question");
		// var q = [...questions]
		// q.push(question)
		// setQuestions([q])
		setQuestions([...questions, question]);
		// questions.append(question);
		// if
		const ops = [
			formData.get("option-1"),
			formData.get("option-2"),
			formData.get("option-3"),
			formData.get("option-4"),
		];
		console.log(formData.get("difficulty"));

		setOptions([...options, ops]);
		const correct = formData.get("correctIndex");
		setCorrectOptions([...correctOptions, correct]);
		setAddQuestionPress(false);
	}
	async function submitQuiz() {
		const docRef = await addDoc(collection(db, "quizzes"), {
			title: title,
			description: desc,
			difficulty: difficulty,
			plays: 0,
			creatorName: "Anonymous",
			creatorID: "",
		});

		questions.forEach(async function (question, index) {
			await addDoc(collection(docRef, "questions"), {
				text: question,
				options: options[index],
				correctOption: correctOptions[index],
			});
		});
	}
	function handleInfoForm(e) {
		e.preventDefault();
		var formData = new FormData(e.target);
		setTitle(formData.get("title"));
		setDesc(formData.get("description"));
		setDifficulty(formData.get("difficulty"));
		console.log(formData.get("difficulty"));
		setInfoFilled(true);
	}
	return (
		<div>
			{/* display title and description */}
			<div className="info">
				<h1 className="title">{title}</h1>
				<h3 className="description">{desc}</h3>
			</div>
			{/* display all questions with options as a list*/}
			{questions.map((question, key) => (
				<div key={key} className="question-with-options">
					<h1>
						{key + 1}. {question}
					</h1>
					<h3>{options[key][0]}</h3>
					<h3>{options[key][1]}</h3>
					<h3>{options[key][2]}</h3>
					<h3>{options[key][3]}</h3>
				</div>
			))}
			{infoFilled && (
				<button
					onClick={() => {
						setAddQuestionPress(true);
					}}
				>
					+
				</button>
			)}
			{/* add new question button */}

			{!infoFilled && (
				<form onSubmit={handleInfoForm} className="infoForm">
					{/* textbox for quiz title */}
					<p>Quiz Title:</p>
					<input type="text" name="title" required />
					{/* textbox for quiz description */}
					<p>Quiz Description:</p>
					<input type="text" name="description" required />
					<p>Difficulty: </p>
					{/* dropdown for quiz difficulty */}
					<select name="difficulty">
						<option value="easy">easy</option>
						<option value="medium">medium</option>
						<option value="hard">hard</option>
					</select>
					<br />
					<button type="submit">Submit</button>
				</form>
			)}

			{addQuestionPress && (
				<form onSubmit={handleForm} className="addQuestion">
					{/* textbox for question */}
					<div className="questionForm">
						<p>Question {questions.length + 1}:</p>
						<input required type="text" name="question" />
					</div>
					{/* 4 textboxes for options, each is numberd 1-4 */}
					<div className="optionsForm">
						<p>Option 1:</p>
						<input required type="text" name="option-1" />
						<p>Option 2:</p>
						<input required type="text" name="option-2" />
						<p>Option 3:</p>
						<input required type="text" name="option-3" />
						<p>Option 4:</p>
						<input required type="text" name="option-4" />
						{/* enter correct option number */}
						<p>Correct option number:</p>
						<input required type="number" name="correctIndex" />
					</div>
					{/* Add New Question Button */}
					<button type="submit">Add</button>
				</form>
			)}

			{/* submit/create button */}
			{questions.length > 0 && (
				<button
					onClick={() => {
						submitQuiz();
					}}
				>
					Submit
				</button>
			)}
		</div>
	);
}

export default NewQuiz;
