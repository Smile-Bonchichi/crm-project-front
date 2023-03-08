import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routers } from "./router/Routers";

import './style/global-reset.css';

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {
                    routers.map((item, i) => {
                        return <Route
                            key={ i }
                            path={ item.url.url }
                            element={ item.element }
                        />;
                    })
                }
            </Routes>
        </BrowserRouter>
    );
};
