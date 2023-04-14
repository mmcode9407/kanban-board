/* eslint-disable no-unused-vars */
import React, { useState, useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

import getTodayDate from '../dateProvider/dateProvider';
import validateForm from '../validateForm';
import '../styles/form.scss';

const initialState = { taskName: '', taskOwner: '', taskDescription: '', taskDeadline: '' };

const Form = (props) => {
    const [errors, setErrors] = useState([]);

    const reducer = (state, action) => {
        if (action.type === 'CLEAR') {
            return action.payload;
        }
        return {
            ...state,
            [action.name]: action.name === 'taskDeadline' ? action.value.replace('T', ' ') : action.value,
        };
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    const clearInputs = () => {
        dispatch({ type: 'CLEAR', payload: initialState });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const { onSubmit } = props;

        const errorsList = validateForm(state);

        if (errorsList === 0) {
            const preparedTask = {
                id: uuid(),
                idColumn: 1,
                ...state,
            };
            onSubmit(preparedTask);
            clearInputs();
        }

        setErrors(errorsList);
    };

    const showError = (label) => {
        const errorsByLabel = errors.filter((item) => item.includes(label));

        return errorsByLabel.map((err) => (
            <p className="form__controls-errors-text" key={uuid()}>
                {err}
            </p>
        ));
    };

    return (
        <form className="form" onSubmit={submitHandler}>
            <h2 className="form__title">Dodaj zadanie:</h2>
            <div className="form__controls-box">
                <div className="form__controls">
                    <label className="form__controls-label" htmlFor="taskName">
                        Tytuł zadania:
                        <input
                            className="form__controls-input"
                            type="text"
                            name="taskName"
                            id="taskName"
                            value={state.taskName}
                            placeholder="Min 3 znaki..."
                            onChange={(e) => dispatch(e.target)}
                        />
                        {errors.length > 0 ? (
                            <div className="form__controls-errors">{showError('Tytuł zadania')}</div>
                        ) : null}
                    </label>
                    <label className="form__controls-label" htmlFor="taskOwner">
                        Odpowiedzialny:
                        <input
                            className="form__controls-input"
                            type="text"
                            name="taskOwner"
                            id="taskOwner"
                            value={state.taskOwner}
                            placeholder="Min 3 znaki..."
                            onChange={(e) => dispatch(e.target)}
                        />
                        {errors.length > 0 ? (
                            <div className="form__controls-errors">{showError('Odpowiedzialny')}</div>
                        ) : null}
                    </label>
                    <label className="form__controls-label" htmlFor="taskOwner">
                        Termin:
                        <input
                            className="form__controls-input"
                            type="datetime-local"
                            name="taskDeadline"
                            id="taskDeadline"
                            min={getTodayDate()}
                            value={state.taskDeadline}
                            onChange={(e) => dispatch(e.target)}
                        />
                        {errors.length > 0 ? <div className="form__controls-errors">{showError('Termin')}</div> : null}
                    </label>
                </div>
                <div className="form__controls">
                    <label className="form__controls-label form__controls-label--textarea " htmlFor="taskDescription">
                        Opis zadania:
                        <textarea
                            className="form__controls-input form__controls-input--textarea"
                            name="taskDescription"
                            id="taskDescription"
                            value={state.taskDescription}
                            onChange={(e) => dispatch(e.target)}
                        />
                        {errors.length > 0 ? (
                            <div className="form__controls-errors">{showError('Opis zadania')}</div>
                        ) : null}
                    </label>
                </div>
                <button className="form__button" type="submit">
                    +
                </button>
            </div>
        </form>
    );
};

export default Form;

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
