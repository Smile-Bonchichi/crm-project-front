import React from 'react';
import Header from "../../ui/header/Header";
import { RouterUrl } from "../../app/router/Routers";

const PurchaseRawMaterialsPage = () => {
    return (
        <div>
            <Header text={ RouterUrl.PURCHASE_RAW_MATERIALS_PAGE.name }/>
        </div>
    );
};

export default PurchaseRawMaterialsPage;