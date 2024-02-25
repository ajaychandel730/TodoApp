import Alert from "./components/Alert";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoNav from "./components/TodoNav";

const Page = () => {
  return (
    <>
      <div className="w-full h-[100dvh] flex items-center flex-col justify-center overflow-y-auto">
      <Alert />
        <div className="h-[600px] w-[90%] md:w-[600px] p-5 flex flex-col space-y-4 items-center  bg-red border border-gray-400 rounded-md">
          <h1 className="text-xl font-medium">Todo List</h1>
          <TodoNav />
          <TodoInput />
          <div className="flex flex-col w-full bg-red">
            <TodoList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
