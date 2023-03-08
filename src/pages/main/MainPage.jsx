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
                    text={ RouterUrl.SALE_OF_PRODUCTS_PAGE.name }
                    onClick={ () => navigator(RouterUrl.SALE_OF_PRODUCTS_PAGE.url) }
                />
                <Button
                    text={ RouterUrl.BUDGET_PAGE.name }
                    onClick={ () => navigator(RouterUrl.BUDGET_PAGE.url) }
                />
                <Button
                    text={ RouterUrl.EMPLOYEE_PAGE.name }
                    onClick={ () => navigator(RouterUrl.EMPLOYEE_PAGE.url) }
                />
                <Button
                    text={ RouterUrl.JOB_TITLE_PAGE.name }
                    onClick={ () => navigator(RouterUrl.JOB_TITLE_PAGE.url) }
                />
                <Button
                    text={ RouterUrl.PRODUCTION_PAGE.name }
                    onClick={ () => navigator(RouterUrl.PRODUCTION_PAGE.url) }
                />
                <Button
                    text={ RouterUrl.PURCHASE_RAW_MATERIALS_PAGE.name }
                    onClick={ () => navigator(RouterUrl.PURCHASE_RAW_MATERIALS_PAGE.url) }
                />
                <Button
                    text={ RouterUrl.RAW_MATERIALS_PAGE.name }
                    onClick={ () => navigator(RouterUrl.RAW_MATERIALS_PAGE.url) }
                />
                <Button
                    text={ RouterUrl.UNITS_PAGE.name }
                    onClick={ () => navigator(RouterUrl.UNITS_PAGE.url) }
                />
                <Button
                    text={ RouterUrl.FINISHED_PRODUCTION_PAGE.name }
                    onClick={ () => navigator(RouterUrl.FINISHED_PRODUCTION_PAGE.url) }
                />
                <Button
                    text={ RouterUrl.INGREDIENTS_PAGE.name }
                    onClick={ () => navigator(RouterUrl.INGREDIENTS_PAGE.url) }
                />
            </div>
        </div>
    );
};

export default MainPage;