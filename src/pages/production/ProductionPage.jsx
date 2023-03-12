import React from 'react';
import Header from "../../ui/header/Header";
import { RouterUrl } from "../../app/router/Routers";
import Filter from "../../ui/filter/Filter";

const ProductionPage = () => {
    return (
        <div>
            <Header text={ RouterUrl.PRODUCTION_PAGE.name }/>

            <Filter/>
        </div>
    );
};

export default ProductionPage;