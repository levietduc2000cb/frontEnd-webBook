import Home from "../page/home/Home";
import Login from "../page/login/Login";
import Register from "../page/register/Register";
// import Detail from "../page/detail/Detail";
import SearchPage from "../page/search/Search";
import Cart from "../page/Cart/Cart";
import AddItem from "../page/AddItem/AddItem";
import NotFound from "../page/NotFound/NotFound";
import pathRouters from "../config/pathRoutes";
import Profile from "../page/profile/Profile";

///Public Router
export const PUBLIC_ROUTER = [
  {
    path: pathRouters.home,
    component: Home,
  },
  {
    path: pathRouters.login,
    component: Login,
  },
  {
    path: pathRouters.search,
    component: SearchPage,
  },
  {
    path: pathRouters.register,
    component: Register,
  },
  // {
  //   path: pathRouters.detail,
  //   component: Detail,
  // },
  {
    path: pathRouters.updateitem,
    component: AddItem,
  },
  {
    path: pathRouters.notfound,
    component: NotFound,
  },
];
export const PRIVATE_ROUTER = [
  {
    path: pathRouters.profile,
    component: Profile,
  },
  {
    path: pathRouters.cart,
    component: Cart,
  },
  {
    path: pathRouters.additem,
    component: AddItem,
  },
];
