// import Components from "views/Components/Components.jsx";
import LandingPage from "./views/LandingPage/LandingPage.jsx";
import AdminPage from "views/AdminPage/AdminPage.jsx";
import SignupPage from "views/SignupPage/SignupPage.jsx";
import SellerDashboard from "views/SellerProfile/SellerDashboard.jsx";
import CustomerDashboard from "./views/CustomerProfile/CustomerDashboard.jsx";

var indexRoutes = [
//   { path: "/landing-page", name: "LandingPage", component: LandingPage },
//   { path: "/profile-page", name: "ProfilePage", component: ProfilePage },
    { path:"/home" , name: "Home", component: CustomerDashboard},
    { path: "/admin", name: "Admin", component: AdminPage},
    { path: "/register", name: "SignupPage", component: SignupPage },
    { path: "/profile", name:"SellerProfile", component: SellerDashboard},
    { path: "/", name: "Landing Page", component: LandingPage }
];

export default indexRoutes;
