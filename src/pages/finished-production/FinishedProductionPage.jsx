import React from 'react';
import Header from "../../ui/header/Header";
import { RouterUrl } from "../../app/router/Routers";

const FinishedProductionPage = () => {
    return (
        <div>
            <Header text={ RouterUrl.FINISHED_PRODUCTION_PAGE.name }/>
        </div>
    );
};

export default FinishedProductionPage;