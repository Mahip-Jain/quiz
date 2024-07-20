import { useNavigate } from "react-router-dom";

function QuizCard({ props }) {
	const navigate = useNavigate();
	function handleClick() {
		navigate(`/quiz/${props.id}`);
	}
	return (
		<div
			className="quizcard"
			id={props.id}
			onClick={() => {
				handleClick();
			}}
		>
			<div className="quizcard-info">
				<h1 className="quizcard-title">{props.title}</h1>
				<p className="quizcard-desc">{props.description}</p>
			</div>
			<div className="quizcard-stats">
				<p className="quizcard-createdBy">by {props.creatorName}</p>
				<p className="quizcard-plays">{props.plays} plays</p>
				<p className="quizcard-difficulty">{props.difficulty}</p>
			</div>
		</div>
	);
}

export default QuizCard;
