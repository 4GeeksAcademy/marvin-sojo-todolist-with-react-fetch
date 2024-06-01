import React, { useState } from "react";
import Title from "./Title";
import TodoList from "./TodoList";


//create your first component
const Home = () => {
	
	return (
		<div className="container p-3">
			<div className="container p-5">
			<Title title ="Todos" />
			<TodoList />
			</div>
		</div>
	);
};

export default Home;


