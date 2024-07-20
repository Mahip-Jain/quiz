// import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizPlay from "./QuizPlay";
import QuizNotFound from "./QuizNotFound";
import Home from "./Home";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/quiz/:quizID" element={<QuizPlay />}></Route>
					<Route path="*" element={<QuizNotFound />}></Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
