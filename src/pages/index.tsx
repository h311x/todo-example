import {type NextPage} from "next";

import {api} from "../utils/api";
import Button from "../components/ui/Button";
import {useState} from "react";
import CreateTodo from "../components/CreateTodo";
import TodoCard from "../components/TodoCard";
import {Todo} from ".prisma/client";
import EditTodo from "../components/EditTodo";

const Home: NextPage = () => {
	const {data, isLoading} = api.todo.getTodoList.useQuery()

	const [createTodoOpened, setCreateTodoOpened] = useState(false)
	const [editTodo, setEditTodo] = useState<Todo | null>(null)

	return (
		<div className="p-8 text-violet-900">
			<div className="flex justify-between mb-8">
				<h1 className="text-5xl font-bold">Todo List</h1>
				<Button onClick={() => setCreateTodoOpened(true)}>Create Todo</Button>
			</div>

			<CreateTodo isOpen={createTodoOpened} setIsOpen={setCreateTodoOpened}/>

			{editTodo ? <EditTodo todo={editTodo} key={editTodo?.id} setIsOpen={() => setEditTodo(null)}/> : null}

			{
				data && data.length && !isLoading ? (
					<div className="flex flex-col gap-8">
						{
							data?.map(({
								id,
								title, description
							}) => (
								<TodoCard key={id} id={id} title={title} description={description} onEdit={(t) => setEditTodo(t)}/>
							))
						}
					</div>
				) : (
					<div className='text-3xl text-violet-400'>You have no todos...</div>
				)
			}
		</div>
	);
};

export default Home;
