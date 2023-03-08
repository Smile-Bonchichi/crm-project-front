import React from 'react';
import { useNavigate } from "react-router-dom";
import type { SelectType } from "./SelectType";
import { routers, RouterUrl } from "../../app/router/Routers";

import './select.css';

const Select = (props: SelectType) => {
    const navigator = useNavigate();
    const changeRoute = (event) => {
        navigator(event.target.value);
    }

    return (
        <select onChange={ changeRoute }>
            {
                routers
                    .filter(item => item.url !== RouterUrl.MAIN_PAGE)
                    .map((item, i) => {
                        if (item.url.name === props.item)
                            return <option selected value={ item.url.url } key={ i }> { item.url.name } </option>;
                        return <option value={ item.url.url } key={ i }> { item.url.name } </option>;
                    })
            }
        </select>
    );
};

export default Select;