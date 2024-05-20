import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Search from "../Pages/Search/Search";
import DetailsPage from "../Pages/DetailsPage/DetailsPage";
import ExplorePage from "../Pages/ExplorePage/ExplorePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: ':explore',
                element: <ExplorePage></ExplorePage>
            },
            {
                path: 'search',
                element: <Search></Search>
            },
            {
                path: ':details/:id',
                element: <DetailsPage></DetailsPage>
            }
        ]
    },
]);

export default router