import React from 'react';
import Header from "../../ui/header/Header";
import { RouterUrl } from "../../app/router/Routers";
import Filter from "../../ui/filter/Filter";

const SaleOfProductsPage = () => {
    return (
        <div>
            <Header text={ RouterUrl.SALE_OF_PRODUCTS_PAGE.name }/>

            <Filter/>
        </div>
    );
};

export default SaleOfProductsPage;