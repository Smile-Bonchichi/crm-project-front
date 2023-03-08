import React from 'react';
import Button from "../button/Button";

import './filter.css'

const Filter = () => {
    return (
        <div className={ 'filter' }>
            <label htmlFor="date_from">
                <p>Дата с</p>
                <input id='date_from' type="date"/>
            </label>

            <label htmlFor="date_to">
                <p>Дата по</p>
                <input id='date_to' type="date"/>
            </label>

            <Button
                className={ 'filter__button' }
                text={ 'open report' }
                onClick={ () => alert(123) }
            />
        </div>
    );
};

export default Filter;