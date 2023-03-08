import React from 'react';
import Header from "../../ui/header/Header";
import { RouterUrl } from "../../app/router/Routers";

const UnitsPage = () => {
    return (
        <div>
            <Header text={ RouterUrl.UNITS_PAGE.name }/>
        </div>
    );
};

export default UnitsPage;