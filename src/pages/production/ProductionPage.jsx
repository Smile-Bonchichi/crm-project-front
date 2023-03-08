import React from 'react';
import Header from "../../ui/header/Header";
import { RouterUrl } from "../../app/router/Routers";

const ProductionPage = () => {
    return (
        <div>
            <Header text={ RouterUrl.PRODUCTION_PAGE.name }/>
        </div>
    );
};

export default ProductionPage;