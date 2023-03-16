import IRoute from "./interfaces/route";
import BasePage from "./pages/BasePage/BasePage";
import BuyNFTPage from "./pages/BuyNFTPage/BuyNFTPage";
import CreateSaleNFTPage from "./pages/CreateSaleNFTPage/CreateSaleNFTPage";
import MyNFTSPage from "./pages/MyNFTSPage/MyNFTSPage";

// pages

const mainRoutes: IRoute[] = [
    {
        name: 'Home',
        path: '/',
        component: BasePage,
        auth: false
    },
    {
        name: 'MyNFTs',
        path: '/my-nfts',
        component: MyNFTSPage,
        auth: true
    },
    {
        name: 'BuyNFT',
        path: '/getOffer',
        component: BuyNFTPage,
        auth: false
    },
    {
        name: 'BuyNFTNew',
        path: '/offer/:hash',
        component: BuyNFTPage,
        auth: false
    },
    {
        name: 'BuyNFTNew',
        path: '/offer/:hash/:id',
        component: BuyNFTPage,
        auth: false
    },
    {
        name: 'BuyNFT',
        path: '/create-sale',
        component: CreateSaleNFTPage,
        auth: true
    },
];

const routes: IRoute[] = [...mainRoutes];

export default routes;
