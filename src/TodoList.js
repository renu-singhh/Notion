import React, { useState, useEffect } from 'react';

export default function TodoList() {
    function getStoredTodos(status) {
        let data = localStorage.getItem(status);
        let json = JSON.parse(data);
        if (json) {
            return json;
        }
        return [];
    }

    const [notStartedTodos, setNotStartedTodos] = useState(getStoredTodos("notStarted"));
    const [completedTodos, setCompletedTodos] = useState(getStoredTodos("completed"));
    const [inProgressTodos, setInProgressTodos] = useState(getStoredTodos("inProgress"));

    useEffect(() => {
        localStorage.setItem("notStarted", JSON.stringify(notStartedTodos));
    }, [notStartedTodos]);

    useEffect(() => {
        localStorage.setItem("completed", JSON.stringify(completedTodos));
    }, [completedTodos]);

    useEffect(() => {
        localStorage.setItem("inProgress", JSON.stringify(inProgressTodos));
    }, [inProgressTodos]);

    function handleSubmit(event, status, setStatus) {
        event.preventDefault();
        let task = event.target.task.value;
        if (!task) {
            alert("Please provide a valid task");
            return;
        }
        setStatus([...status, { task: task, completed: false }]);
        event.target.reset();
    }

    function changeTaskState(index, status, setStatus) {
        let newTodos = [...status];
        newTodos[index].completed = !newTodos[index].completed;
        setStatus(newTodos);
    }

    function deleteTask(index, status, setStatus) {
        let newTodos = [...status];
        newTodos.splice(index, 1);
        setStatus(newTodos);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <a className="navbar-brand" href="#" >Todo List</a>
            </nav>
            <div className="container my-5" style={{ display: "flex", flexDirection: "row" }}>
                <div className="mx-auto rounded p-6" style={{ width: "300px", backgroundColor: "#FFFFFF" }}>
                    <h4 className="text-black text-right mb-5" style={{ backgroundColor: "pink" }}>Not started ({notStartedTodos.length})</h4>
                    <form className="d-flex" onSubmit={(e) => handleSubmit(e, notStartedTodos, setNotStartedTodos)}>
                        <input className="form-control me-2" placeholder="New task" name="task" />
                        <button className="btn btn-outline-dark" type="submit">&#43;</button>
                    </form>
                    {notStartedTodos.map((todo, index) => (
                        <div key={index} className="rounded mt-4 p-2 d-flex" style={{ backgroundColor: todo.completed ? "#87FC60" : "LightGray" }}>
                            <div className="me-auto">{todo.task}</div>
                            <div className="ms-auto">
                                <i className={"h5 me-2 " + (todo.completed ? "bi bi-check-square" : "bi bi-square")} style={{ cursor: "pointer" }} onClick={() => changeTaskState(index, notStartedTodos, setNotStartedTodos)}></i>
                                <i className="bi bi-trash" style={{ cursor: "pointer" }} onClick={() => deleteTask(index, notStartedTodos, setNotStartedTodos)}></i>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Render completed tasks */}
                <div className="mx-auto rounded p-6" style={{ width: "300px", backgroundColor: "#FFFFFF" }}>
                    <h4 className="text-black text-right mb-5" style={{ backgroundColor: "lightgreen" }}>In Progress ({completedTodos.length})</h4>
                    <form className="d-flex" onSubmit={(e) => handleSubmit(e, completedTodos, setCompletedTodos)}>
                        <input className="form-control me-2" placeholder="New task" name="task" />
                        <button className="btn btn-outline-dark" type="submit">&#43;</button>
                    </form>
                    {completedTodos.map((todo, index) => (
                        <div key={index} className="rounded mt-4 p-2 d-flex" style={{ backgroundColor: todo.completed ? "#87FC60" : "LightGray" }}>
                            <div className="me-auto">{todo.task}</div>
                            <div className="ms-auto">
                                <i className={"h5 me-2 " + (todo.completed ? "bi bi-check-square" : "bi bi-square")} style={{ cursor: "pointer" }} onClick={() => changeTaskState(index, completedTodos, setCompletedTodos)}></i>
                                <i className="bi bi-trash" style={{ cursor: "pointer" }} onClick={() => deleteTask(index, completedTodos, setCompletedTodos)}></i>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Render in progress tasks */}
                <div className="mx-auto rounded p-6" style={{ width: "300px", backgroundColor: "#FFFFFF" }}>
                    <h4 className="text-black text-right mb-5" style={{ backgroundColor: "skyblue" }}>Completed ({inProgressTodos.length})</h4>
                    <form className="d-flex" onSubmit={(e) => handleSubmit(e, inProgressTodos, setInProgressTodos)}>
                        <input className="form-control me-2" placeholder="New task" name="task" />
                        <button className="btn btn-outline-dark" type="submit">&#43;</button>
                    </form>
                    {inProgressTodos.map((todo, index) => (
                        <div key={index} className="rounded mt-4 p-2 d-flex" style={{ backgroundColor: todo.completed ? "#87FC60" : "LightGray" }}>
                            <div className="me-auto">{todo.task}</div>
                            <div className="ms-auto">
                                <i className={"h5 me-2 " + (todo.completed ? "bi bi-check-square" : "bi bi-square")} style={{ cursor: "pointer" }} onClick={() => changeTaskState(index, inProgressTodos, setInProgressTodos)}></i>
                                <i className="bi bi-trash" style={{ cursor: "pointer" }} onClick={() => deleteTask(index, inProgressTodos, setInProgressTodos)}></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
