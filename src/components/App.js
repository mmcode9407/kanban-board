/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import Form from './Form';
import Board from './Board';
import BoardContext from '../context/context';
import { defaultColumns, defaultTasks } from '../defaultData';
import useStorage from '../hook';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [columns, setNewColumns] = useState(defaultColumns);
    const [setStorageTasks, getStorageTasks] = useStorage('tasks');

    const { Provider: BoardProvider } = BoardContext;

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    useEffect(() => {
        const storageTasks = getStorageTasks();
        if (!storageTasks || storageTasks.length === 0) {
            setTasks(defaultTasks);
            return;
        }

        setTasks(storageTasks);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setStorageTasks(tasks);
        // eslint-disable-next-line
    }, [tasks]);

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
