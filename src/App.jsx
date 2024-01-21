import { useState } from "react";
import { toast } from "react-toastify";

function App() {
  const [task, settask] = useState("");
  const [desc, setdesc] = useState("");
  const [allTasks, setallTasks] = useState([]);
  const deleteHandler = (i) => {
    var tempTasks = [...allTasks];
    tempTasks.splice(i, 1);
    setallTasks(tempTasks);
    toast.error("Task Deleted");
  };
  const completeHandler = (i) => {
    var tempTasks = [...allTasks];
    tempTasks[i].state = "Completed";
    setallTasks(tempTasks);
    toast.success("Task Completed");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (task == "" || desc == "") {
      toast.error("Enter valid task details");
      return;
    }
    setallTasks([...allTasks, { task, desc, state: "Pending" }]);
    toast.success("Task Added");
    settask("");
    setdesc("");
  };
  return (
    <>
      <h1 className="px-5 py-6 items-center text-center w-full h-20 text-white bg-sky-600">
        ToDo App
      </h1>
      <div className="w-screen items-center justify-center flex align-middle">
        <form
          className="items-start flex flex-col mt-5 mb-5 rounded-lg shadow-lg w-1/3 border-2 py-10 px-11"
          onSubmit={submitHandler}
        >
          <input
            className="border-slate-700 border-2 w-full rounded px-4 py-2 text-xl"
            type="text"
            placeholder="Enter task name"
            value={task}
            onChange={(e) => {
              settask(e.target.value);
            }}
          />
          <input
            className="border-slate-700 border-2 w-full h-20 rounded mt-4 px-4 py-2 text-xl"
            type="text"
            placeholder="Enter task description"
            value={desc}
            onChange={(e) => {
              setdesc(e.target.value);
            }}
          />
          <button className="bg-zinc-900 text-white w-full px-4 py-2 mt-4 rounded-xl text-2xl">
            Add Task
          </button>
        </form>
      </div>
      <hr />
      <div className="m-5 mr-5 text-center rounded-lg shadow-2xl shadow-zinc-400 p-5 bg-sky-300 ">
        {allTasks.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Task</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {allTasks.map((t, i) => (
                <tr key={i}>
                  <td className="px-4 py-2 text-center">{t.task}</td>
                  <td className="px-4 py-2 text-center">{t.desc}</td>
                  <td className="px-4 py-2 text-center">
                    {t.state == "Pending" ? (
                      <button
                        className="bg-green-600 px-2 py-1 mr-2 rounded"
                        onClick={() => {
                          completeHandler(i);
                        }}
                      >
                        Complete
                      </button>
                    ) : (
                      <button
                        className="bg-zinc-500 mr-2 px-2 py-1 rounded"
                        disabled
                      >
                        Completed
                      </button>
                    )}
                    <button
                      className="bg-red-500 px-2 py-1 rounded"
                      onClick={() => {
                        deleteHandler(i);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>No Tasks Available</h1>
        )}
      </div>
    </>
  );
}

export default App;
