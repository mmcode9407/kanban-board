import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Task from './Task';
import BoardContext from '../context/context';
import '../styles/column.scss';

const Column = (props) => {
    const { tasks } = useContext(BoardContext);
    const { name, limit, id } = props;

    const renderTasks = () => {
        const columnTasks = tasks.filter((task) => task.idColumn === id);

        return columnTasks.map((item) => <Task key={item.id} data={item} />);
    };

    return (
        <div className="column">
            <div className="column__header">
                <h2 className="column__header-title">{name}</h2>
                <p className="column__header-limit"> | {limit}</p>
            </div>
            <ul className="column__list">{renderTasks()}</ul>
        </div>
    );
};

export default Column;

Column.propTypes = {
    name: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
};
