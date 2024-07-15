import { BrowserRouter, Route, Routes} from "react-router-dom"
import { MainPage } from "../pages/main-page"

const AppRouter = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<MainPage/>}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter