import { combineReducers } from 'redux';
import listProducts from 'Reducers/listProducts';
import listMenu from 'Reducers/listMenu';
import listProductsType from 'Reducers/listProductsType';
import listSilder from 'Reducers/listSilder';
import productsNSX from 'Reducers/productsNSX';
import products_ID from 'Reducers/products_ID';
import searchProduct from 'Reducers/search';
import CardProducts from 'Reducers/cardProducts';
import user from 'Reducers/User';
import historyCart from 'Reducers/hisorycart';
import comment from 'Reducers/comment';
import historycomment from 'Reducers/historycomment';
const myReducers = combineReducers({
    products: listProducts,
    menu: listMenu,
    productsType: listProductsType,
    silder: listSilder,
    NSX: productsNSX,
    ID: products_ID,
    search: searchProduct,
    card: CardProducts,
    User: user,
    HistoryCart: historyCart,
    Comment: comment,
    historyComments: historycomment,
});
export default myReducers;
