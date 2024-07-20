import QuizCard from "./QuizCard";

function Home() {
	const quizzes = [
		{
			title: "General Knowledge Quiz",
			description: "A quiz to test your general knowledge on a variety of topics.",
			createdBy: "user123",
			difficulty: "medium",
			numberOfPlays: 150,
		},
		{
			title: "Science and Technology Quiz",
			description:
				"Challenge yourself with questions about the latest in science and technology.",
			createdBy: "user456",
			difficulty: "hard",
			numberOfPlays: 90,
		},
		{
			title: "History Quiz",
			description:
				"How well do you know historical events and figures? Take this quiz to find out!",
			createdBy: "user789",
			difficulty: "easy",
			numberOfPlays: 200,
		},
		{
			title: "Geography Quiz",
			description:
				"Test your knowledge about countries, capitals, and landmarks around the world.",
			createdBy: "user101",
			difficulty: "medium",
			numberOfPlays: 120,
		},
		{
			title: "Pop Culture Quiz",
			description:
				"From movies to music, see how well you know the latest in pop culture.",
			createdBy: "user202",
			difficulty: "easy",
			numberOfPlays: 180,
		},
	];
	return (
		<div>
			{/* Navbar */}
			<h1>Quizzes</h1>
			{/* Quiz Cards */}
			<div className="quizcards">
				{quizzes.map((quiz, key) => (
					<QuizCard props={quiz} key={key}></QuizCard>
				))}
			</div>
		</div>
	);
}

export default Home;
