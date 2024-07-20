import { useEffect, useState } from "react";
import QuizCard from "./QuizCard";
import { getDocs, collection } from "firebase/firestore";
import db from "./firebase";

function Home() {
	// const quizzes = [
	// 	{
	// 		title: "General Knowledge Quiz",
	// 		description: "A quiz to test your general knowledge on a variety of topics.",
	// 		createdBy: "user123",
	// 		difficulty: "medium",
	// 		numberOfPlays: 150,
	// 	},
	// 	{
	// 		title: "Science and Technology Quiz",
	// 		description:
	// 			"Challenge yourself with questions about the latest in science and technology.",
	// 		createdBy: "user456",
	// 		difficulty: "hard",
	// 		numberOfPlays: 90,
	// 	},
	// 	{
	// 		title: "History Quiz",
	// 		description:
	// 			"How well do you know historical events and figures? Take this quiz to find out!",
	// 		createdBy: "user789",
	// 		difficulty: "easy",
	// 		numberOfPlays: 200,
	// 	},
	// 	{
	// 		title: "Geography Quiz",
	// 		description:
	// 			"Test your knowledge about countries, capitals, and landmarks around the world.",
	// 		createdBy: "user101",
	// 		difficulty: "medium",
	// 		numberOfPlays: 120,
	// 	},
	// 	{
	// 		title: "Pop Culture Quiz",
	// 		description:
	// 			"From movies to music, see how well you know the latest in pop culture.",
	// 		createdBy: "user202",
	// 		difficulty: "easy",
	// 		numberOfPlays: 180,
	// 	},
	// ];
	const [quizzes, setQuizzes] = useState([]);
	useEffect(() => {
		(async () => {
			var q = [];
			const quizzesCollectionRef = collection(db, "quizzes");
			const querySnapshot = await getDocs(quizzesCollectionRef);
			console.log(querySnapshot);
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());
				// setQuizzes([...quizzes, doc.data()]);
				var x = doc.data();
				x.id = doc.id;
				q.push(x);
			});
			setQuizzes(q);
		})();

		return () => {
			// this now gets called when the component unmounts
		};
	}, []);

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
