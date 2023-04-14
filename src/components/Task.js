import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward, faTrash } from '@fortawesome/free-solid-svg-icons';
import BoardContext from '../context/context';
import '../styles/task.scss';

const Task = (props) => {
    const { tasks, setTasks, columns } = useContext(BoardContext);
    const { data } = props;
    const { taskName, taskDescription, taskOwner, taskDeadline, id, idColumn } = data;

    const couldTaskMove = (value) => {
        const newColumn = columns.find((column) => column.id === idColumn + value);
        if (newColumn) {
            const tasksInColumn = tasks.filter((task) => task.idColumn === newColumn.id);
            if (tasksInColumn.length < newColumn.limit) {
                return true;
            }
        }
        return false;
    };

    const moveTask = (value, taskId) => {
        if (couldTaskMove(value)) {
            const movedTask = tasks.findIndex((task) => task.id === taskId);

            const newState = tasks.map((task, index) => {
                if (index === movedTask) {
                    return { ...task, idColumn: task.idColumn + value };
                }
                return task;
            });

            setTasks(newState);
        }
    };

    const removeTask = (taskId) => {
        const tasksAfterRemove = tasks.filter((task) => task.id !== taskId);
        setTasks(tasksAfterRemove);
    };

    return (
        <li className="task">
            <h3 className="task__title">{taskName}</h3>
            <p className="task__description">{taskDescription}</p>
            <p className="task__owner">{taskOwner}</p>
            <p className="task__deadline">{taskDeadline}</p>
            <div className="task__buttons-box">
                <button
                    className="task__button"
                    type="button"
                    disabled={!couldTaskMove(-1)}
                    onClick={() => moveTask(-1, id)}
                >
                    <FontAwesomeIcon icon={faBackward} className="task__button-icon" />
                </button>
                <button className="task__button" type="button" onClick={() => removeTask(id)}>
                    <FontAwesomeIcon icon={faTrash} className="task__button-icon" />
                </button>
                <button
                    className="task__button"
                    type="button"
                    disabled={!couldTaskMove(1)}
                    onClick={() => moveTask(1, id)}
                >
                    <FontAwesomeIcon icon={faForward} className="task__button-icon" />
                </button>
            </div>
        </li>
    );
};

export default Task;

Task.propTypes = {
    data: PropTypes.shape({
        taskName: PropTypes.string.isRequired,
        taskDescription: PropTypes.string.isRequired,
        taskOwner: PropTypes.string.isRequired,
        taskDeadline: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        idColumn: PropTypes.number.isRequired,
    }).isRequired,
};
