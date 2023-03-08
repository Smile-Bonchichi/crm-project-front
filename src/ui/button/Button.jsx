import React from 'react';
import { ButtonType } from "./ButtonType";

import './button.css';

const Button = (props: ButtonType) => {
    return (
        <button className={ props.className } onClick={ props.onClick }>
            { props.text }
        </button>
    );
};

export default Button;