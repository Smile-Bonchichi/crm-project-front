import React from 'react';
import Header from "../../ui/header/Header";
import { RouterUrl } from "../../app/router/Routers";

const IngredientsPage = () => {
    return (
        <div>
            <Header text={ RouterUrl.INGREDIENTS_PAGE.name }/>


        </div>
    );
};

export default IngredientsPage;