/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import Form from './Form';
import Board from './Board';
import BoardContext from '../context/context';
import { defaultColumns, defaultTasks } from '../defaultData';

const App = () => {
    const [tasks, setTasks] = useState(defaultTasks);
    const [columns, setNewColumns] = useState(defaultColumns);

    const { Provider: BoardProvider } = BoardContext;

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    return (
        <div className="wrapper app">
            <h1 className="app__title">Kanban Board</h1>
            <Form onSubmit={addTask} />
            <BoardProvider value={{ tasks, setTasks, columns }}>
                <Board />
            </BoardProvider>
        </div>
    );
};

export default App;
