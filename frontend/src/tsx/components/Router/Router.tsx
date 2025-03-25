import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "../Layout/Layout"
import { HomePage } from "../Pages/HomePage/HomePage"
export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}