import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '../pages/main-page';
import { Helmet } from 'react-helmet';
import { MainUserPage } from '../pages/main-user-page';
import { NotFoundPage } from '../pages/notfound-page';

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
                                <title>{titleDefault}</title>
                            </Helmet>
                            <MainPage />
                        </React.Fragment>
                    }
                />

                <Route
                    path='/home'
                    element={
                        <React.Fragment>
                            <Helmet>
                                <title>Pagina Inicial | {titleDefault}</title>
                            </Helmet>
                            <MainUserPage/>
                        </React.Fragment>
                    }
                />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
