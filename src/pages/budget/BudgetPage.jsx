import React from 'react';
import Header from "../../ui/header/Header";
import { RouterUrl } from "../../app/router/Routers";

const BudgetPage = () => {
    return (
        <div>
            <Header text={ RouterUrl.BUDGET_PAGE.name }/>


        </div>
    );
};

export default BudgetPage;