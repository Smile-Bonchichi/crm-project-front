import React from 'react';
import Header from "../../ui/header/Header";
import { RouterUrl } from "../../app/router/Routers";

const JobTitlePage = () => {
    return (
        <div>
            <Header text={ RouterUrl.JOB_TITLE_PAGE.name }/>
        </div>
    );
};

export default JobTitlePage;