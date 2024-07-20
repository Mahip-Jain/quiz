function QuizCard({ props }) {
	return (
		<div className="quizcard">
			<div className="quizcard-info">
				<h1 className="quizcard-title">{props.title}</h1>
				<p className="quizcard-desc">{props.description}</p>
			</div>
			<div className="quizcard-stats">
				<p className="quizcard-createdBy">by {props.createdBy}</p>
				<p className="quizcard-plays">{props.numberOfPlays} plays</p>
				<p className="quizcard-difficulty">{props.difficulty}</p>
			</div>
		</div>
	);
}

export default QuizCard;
