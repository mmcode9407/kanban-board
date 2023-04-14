/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import Form from './Form';

const App = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    return (
        <div className="wrapper app">
            <h1 className="app__title">Kanban Board</h1>
            <Form onSubmit={addTask} />
        </div>
    );
};

export default App;
