import React from 'react';
import Button from '../button/Button';

import './filter.css';
import type { FilterType } from './FilterType.js';

const Filter = (props: FilterType) => {
    const onChangeDateFrom = (e) => {
        props.changeDateFrom(e.target.value);
    };
    
    const onChangeDateTo = (e) => {
        props.changeDateTo(e.target.value);
    };
    
    return (
        <div className={ 'filter' }>
            <label htmlFor='date_from'>
                <p>Start</p>
                <input
                    onChange={ onChangeDateFrom }
                    id='date_from'
                    type='date'
                />
            </label>
            
            <label htmlFor='date_to'>
                <p>Finish</p>
                <input
                    onChange={ onChangeDateTo }
                    id='date_to'
                    type='date'
                />
            </label>
            
            <Button
                className={ 'filter__button' }
                text={ 'Open report' }
                onClick={ props.findBy }
            />
        </div>
    );
};

export default Filter;