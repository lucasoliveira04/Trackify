import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/Home"

export const AppRouters = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage/>}
                />
            </Routes>
        </BrowserRouter>
    )
}