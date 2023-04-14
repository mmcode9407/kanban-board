import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward, faBackward, faTrash } from '@fortawesome/free-solid-svg-icons';
import BoardContext from '../context/context';

const Column = (props) => {
    const { tasks, setTasks, columns } = useContext(BoardContext);
    const { name, limit, id } = props;

    const couldTaskMove = (value, item) => {
        const newColumn = columns.find((column) => column.id === item.idColumn + value);
        if (newColumn) {
            const tasksInColumn = tasks.filter((task) => task.idColumn === newColumn.id);
            if (tasksInColumn.length < newColumn.limit) {
                return true;
            }
        }
        return false;
    };

    const moveTask = (value, item) => {
        if (couldTaskMove(value, item)) {
            const movedTask = tasks.findIndex((task) => task.id === item.id);

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
        <div className="column">
            <div className="column__header">
                <h2 className="column__header-title">{name}</h2>
                <p className="column__header-limit"> | {limit}</p>
            </div>
            <ul className="column__list">
                {tasks
                    .filter((task) => task.idColumn === id)
                    .map((item) => (
                        <li className="card" key={item.id}>
                            <h3 className="card__title">{item.taskName}</h3>
                            <p className="card__description">{item.taskDescription}</p>
                            <p className="card__owner">{item.taskOwner}</p>
                            <p className="card__deadline">{item.taskDeadline}</p>
                            <div className="card__buttons-box">
                                <button
                                    className="card__button"
                                    type="button"
                                    disabled={!couldTaskMove(-1, item)}
                                    onClick={() => moveTask(-1, item)}
                                >
                                    <FontAwesomeIcon icon={faBackward} className="card__button-icon" />
                                </button>
                                <button className="card__button" type="button" onClick={() => removeTask(item.id)}>
                                    <FontAwesomeIcon icon={faTrash} className="card__button-icon" />
                                </button>
                                <button
                                    className="card__button"
                                    type="button"
                                    disabled={!couldTaskMove(1, item)}
                                    onClick={() => moveTask(1, item)}
                                >
                                    <FontAwesomeIcon icon={faForward} className="card__button-icon" />
                                </button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Column;

Column.propTypes = {
    name: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
};
