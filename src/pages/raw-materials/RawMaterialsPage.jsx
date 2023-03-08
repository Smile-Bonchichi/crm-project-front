import React from 'react';
import Header from "../../ui/header/Header";
import { RouterUrl } from "../../app/router/Routers";

const RawMaterialsPage = () => {
    return (
        <div>
            <Header text={ RouterUrl.RAW_MATERIALS_PAGE.name }/>
        </div>
    );
};

export default RawMaterialsPage;