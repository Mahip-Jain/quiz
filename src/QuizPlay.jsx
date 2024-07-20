import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";

import db from "./firebase";
function QuizPlay() {
	const params = useParams();
	const [questions, setQuestions] = useState([]);
	const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0); // 0 is the first question
	const [quizInfo, setQuizInfo] = useState({});
	const [optionPressed, setOptionPressed] = useState(false);
	// const [questionAnswered, setQuestionAnswered] = useState(false);
	const [score, setScore] = useState(0);
	const [quizOver, setQuizOver] = useState(false);
	useEffect(() => {
		(async () => {
			console.log(params);
			const docRef = doc(db, "quizzes", params.quizID);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				console.log("Document data:", docSnap.data());
				setQuizInfo(docSnap.data());
			} else {
				// docSnap.data() will be undefined in this case
				console.log("No such document!");
				return;
			}
			const questionsCollectionRef = collection(docRef, "questions");
			const querySnapshot = await getDocs(questionsCollectionRef);
			var q = [];
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());
				// console.log(([...questions, doc.data()][0].que)
				q.push(doc.data());
			});
			setQuestions(q);
		})();

		return () => {
			// this now gets called when the component unmounts
		};
	}, []);
	function optionPress(e) {
		// switch(e.target.id)
		console.log(e.target.id);
		var selectedOption = e.target.id.substring(
			e.target.id.length - 1,
			e.target.id.length
		);
		var answer = questions[currentQuestionNumber]?.correctOption;
		if (selectedOption == answer) {
			console.log("Correct Answer");
			setScore(score + 1);
		} else {
			console.log("Incorrect Answer");
		}
		setOptionPressed(true);
		if (currentQuestionNumber == questions.length - 1) {
			// end quiz
			setQuizOver(true);
			// increment quiz plays
		}
	}
	function nextQuestion() {
		if (optionPressed) {
			setOptionPressed(false);
			// load new question

			setCurrentQuestionNumber(currentQuestionNumber + 1);
		}
	}

	// function nextQuestion() {}

	return (
		<div>
			{/* title */}
			<h1>{quizInfo.title}</h1>
			{!quizOver && (
				<div className="quiz-display">
					{/* question */}
					<h1>
						{currentQuestionNumber - 1}. {questions[currentQuestionNumber]?.text}
					</h1>
					{/* options */}
					<div className="options">
						<button
							className="option"
							id="option-1"
							onClick={(e) => {
								optionPress(e);
							}}
							disabled={optionPressed}
						>
							{questions[currentQuestionNumber]?.options[0]}
						</button>
						<button
							className="option"
							id="option-2"
							onClick={(e) => {
								optionPress(e);
							}}
							disabled={optionPressed}
						>
							{questions[currentQuestionNumber]?.options[1]}
						</button>
						<button
							className="option"
							id="option-3"
							onClick={(e) => {
								optionPress(e);
							}}
							disabled={optionPressed}
						>
							{questions[currentQuestionNumber]?.options[2]}
						</button>
						<button
							className="option"
							id="option-4"
							onClick={(e) => {
								optionPress(e);
							}}
							disabled={optionPressed}
						>
							{questions[currentQuestionNumber]?.options[3]}
						</button>
					</div>
					<button
						className="next"
						disabled={!optionPressed}
						onClick={() => {
							nextQuestion();
						}}
					>
						Next
					</button>
				</div>
			)}
			{quizOver && (
				<div>
					<h1>Quiz Over</h1>
					<h3>
						You got {score} out of {questions.length} questions right!
					</h3>
					<Link to="/">Home</Link>
					<button>Retake quiz</button>
				</div>
			)}
		</div>
	);
}

export default QuizPlay;
