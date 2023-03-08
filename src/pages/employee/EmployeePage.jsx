import React from 'react';
import Header from "../../ui/header/Header";
import { RouterUrl } from "../../app/router/Routers";

const EmployeePage = () => {
    return (
        <div>
            <Header text={ RouterUrl.EMPLOYEE_PAGE.name }/>
        </div>
    );
};

export default EmployeePage;