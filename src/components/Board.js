import React, { useContext } from 'react';
import BoardContext from '../context/context';
import Column from './Column';

import '../styles/board.scss';

const Board = () => {
    const { columns } = useContext(BoardContext);

    return (
        <div className="board">
            {columns.map(({ name, limit, id }) => (
                <Column key={id} name={name} limit={limit} id={id} />
            ))}
        </div>
    );
};

export default Board;
