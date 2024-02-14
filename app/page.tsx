import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoNav from "./components/TodoNav";

const Home = () => {
  return (
    <>
      <div className="h-[600px] w-[300px] md:w-[600px] p-5 flex flex-col space-y-4 items-center  bg-red border border-gray-400 rounded-md">
        <h1 className="text-xl">Todo List</h1>
        <TodoNav />
        <TodoInput />
        <div className="flex flex-col w-full bg-red">
           <TodoList/>
        </div>
      </div>
    </>
  );
};

export default Home;
