import Login from './pages/Login';
import Registration from "./pages/Registration";
import Profile from './pages/Profile';
import Lenta from './pages/Lenta';
import TopicPage from './pages/TopicPage';
import ChatPage from './pages/ChatPage';
import routeConsts from "./utils/consts";

export const publicRoutes = [
    {
        path: routeConsts.LOGIN_ROUTE,
        Component: Login
    },
    {
        path: routeConsts.REGISTRATION_ROUTE,
        Component: Registration
    },
]

export const privateRoutes = [
    {
        path: routeConsts.LENTA,
        Component: Lenta
    },
    {
        path: routeConsts.FEED,
        Component: Profile,
        props:{
            feed: true
        }
    },
    {
        path: routeConsts.PROFILE_ROUTE,
        Component: Profile,
        props:{
            feed: false
        }
    },
    {
        path: routeConsts.TOPIC_ROUTE,
        Component: TopicPage,
    },
    {
        path: routeConsts.CHAT_ROUTE,
        Component: ChatPage,
    },
];
