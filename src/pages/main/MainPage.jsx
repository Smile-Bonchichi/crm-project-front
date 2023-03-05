import React from 'react';
import { useNavigate } from "react-router-dom";
import Button from "../../ui/button/Button";
import { RouterUrl } from "../../app/router/Routers";

import './mainstyle.css';

const MainPage = () => {
    const navigator = useNavigate();

    return (
        <div className={ 'wrapper' }>
            <p className={ 'wrapper__text' }>
                Main Page
            </p>

            <div className={ 'wrapper__buttons' }>
                <Button
                    text={ 'Sale of products' }
                    onClick={ () => navigator(RouterUrl.SALE_OF_PRODUCTS_PAGE) }
                />
                <Button
                    text={ 'Budget' }
                    onClick={ () => navigator(RouterUrl.BUDGET_PAGE) }
                />
                <Button
                    text={ 'Employee' }
                    onClick={ () => navigator(RouterUrl.EMPLOYEE_PAGE) }
                />
                <Button
                    text={ 'Job title' }
                    onClick={ () => navigator(RouterUrl.JOB_TITLE_PAGE) }
                />
                <Button
                    text={ 'Production' }
                    onClick={ () => navigator(RouterUrl.PRODUCTION_PAGE) }
                />
                <Button
                    text={ 'Purchase raw materials' }
                    onClick={ () => navigator(RouterUrl.PURCHASE_RAW_MATERIALS_PAGE) }
                />
                <Button
                    text={ 'Raw materials' }
                    onClick={ () => navigator(RouterUrl.RAW_MATERIALS_PAGE) }
                />
                <Button
                    text={ 'Units' }
                    onClick={ () => navigator(RouterUrl.UNITS_PAGE) }
                />
                <Button
                    text={ 'Finished production' }
                    onClick={ () => navigator(RouterUrl.FINISHED_PRODUCTION_PAGE) }
                />
                <Button
                    text={ 'Ingredients' }
                    onClick={ () => navigator(RouterUrl.INGREDIENTS_PAGE) }
                />
            </div>
        </div>
    );
};

export default MainPage;