import React from 'react';
import type { HeaderType } from "./HeaderType";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { RouterUrl } from "../../app/router/Routers";
import Select from "../select/Select";

import './headerstyle.css';

const Header = (props: HeaderType) => {
    const navigator = useNavigate();
    return (
        <div className={ 'header' }>
            <Button
                className={ 'header__button' }
                text={ RouterUrl.MAIN_PAGE.name }
                onClick={ () => navigator(RouterUrl.MAIN_PAGE.url) }
            />

            { props.text }

            <Select item={ props.text }/>
        </div>
    );
};

export default Header;