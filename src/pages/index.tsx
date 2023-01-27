import {type NextPage} from "next";

import {api} from "../utils/api";
import Button from "../components/ui/Button";
import {useState} from "react";
import CreateTodo from "../components/CreateTodo";
import TodoCard from "../components/TodoCard";

const Home: NextPage = () => {
	const {data} = api.todo.getTodoList.useQuery()

	const [createTodoOpened, setCreateTodoOpened] = useState(false)

	return (
		<div className="p-8 text-violet-900">
			<div className="flex justify-between mb-8">
				<h1 className="text-5xl font-bold">Todo List</h1>
				<Button onClick={() => setCreateTodoOpened(true)}>Create Todo</Button>
			</div>

			<CreateTodo isOpen={createTodoOpened} setIsOpen={setCreateTodoOpened}/>

			<div className="flex flex-col gap-8">
				{
					data?.map(({
						id,
						title, description
					}) => (
						<TodoCard key={id} id={id} title={title} description={description}/>
					))
				}
			</div>
		</div>
	);
};

export default Home;
