import React from 'react';
import Header from "../../ui/header/Header";
import { RouterUrl } from "../../app/router/Routers";
import Filter from "../../ui/filter/Filter";

const PurchaseRawMaterialsPage = () => {
    return (
        <div>
            <Header text={ RouterUrl.PURCHASE_RAW_MATERIALS_PAGE.name }/>

            <Filter/>
        </div>
    );
};

export default PurchaseRawMaterialsPage;