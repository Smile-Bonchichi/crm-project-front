import React from 'react';
import type { DictionaryType } from "./DictionaryType";

import './dictionary.css';

const Dictionary = (props: DictionaryType) => {
    return (
        <span className={ 'unit' }>
            { props.name }
        </span>
    );
};

export default Dictionary;
