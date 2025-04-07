import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "../Layout/Layout"
import { HomePage } from "../Pages/HomePage/HomePage"
import { AboutUs } from "../Pages/AboutUs/AboutUs"
import { Login } from "../Main/Form/Login/Login"
import { Registration } from "../Main/Form/Registration/Registration"
import { Provider } from "react-redux"
import { persistedStore, store } from "../../redux/store/store"
import { Page404 } from "../Pages/Page404/Page404"
import { PersistGate } from "redux-persist/integration/react"
import { AdminHome } from "../Pages/Admin/AdminHome"


export function Router() {
    return (
        <PersistGate loading={null} persistor={persistedStore}>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/registration" element={<Registration />} />
                            <Route path='/admin' element={<AdminHome />}/>
                        </Route>
                        <Route path="*" element={<Page404 />}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </PersistGate> 
    )
}