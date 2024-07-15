import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '../pages/main-page';
import { Helmet } from 'react-helmet';

const AppRouter = () => {
    const titleDefault = 'Trackify';

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <React.Fragment>
                            <Helmet>
                                <title>{`Trackify`}</title>
                            </Helmet>
                            <MainPage />
                        </React.Fragment>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
