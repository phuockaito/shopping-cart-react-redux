import { lazy } from 'react';
const Home = lazy(() => import('Apps/Home'));
const ProductsNSX = lazy(() => import('./page/productsNSX/ProductsNSX'));
const DetailProducts = lazy(() => import('./page/DetailProducts/DetailProducts'));
const Search = lazy(() => import('./page/Search/Search'));
const CartProduct = lazy(() => import('./page/CartProduct/CartProduct'));
const Login = lazy(() => import('./page/Login/Login'));
const Register = lazy(() => import('./page/Register/Register'));
const NotFount = lazy(() => import('./page/NotFount/NotFount'));
const HistoryCart = lazy(() => import('./page/HistoryCart/HistoryCart')); 
const Trademark  = lazy(() => import('./page/Trademark/Trademark'));
const HistoryComment  = lazy(() => import('./page/HistoryComments/HistoryComment'));
const Routes = [
    {
        path: '/',
        exact: true,
        main: Home,
    },
    {
        path: '/login',
        exact: true,
        main: Login,
    },
    {
        path: '/register',
        exact: true,
        main: Register,
    },
    {
        path: '/products/:key/:NSX',
        exact: true,
        main: ProductsNSX,
    },
    {
        path: '/:key/:nsx/:name/:_id',
        exact: true,
        main: DetailProducts,
    },
    {
        path: '/search/:keyword',
        exact: true,
        main: Search,
    },
    {
        path: '/cart',
        exact: true,
        main: CartProduct,
    },
    {
        path: '/history-cart',
        exact: true,
        main: HistoryCart,
    },
    {
        path: '/product/:name_Trademark',
        exact: true,
        main: Trademark,
    },
    {
        path: '/history-comment',
        exact: true,
        main: HistoryComment,
    },
    {
        path: '*',
        exact: true,
        main: NotFount
    }
];
export default Routes;