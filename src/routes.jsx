// import Components from "views/Components/Components.jsx";
import LandingPage from "./views/LandingPage/LandingPage.jsx";
// import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import SellerDashboard from "views/SellerProfile/SellerDashboard.jsx";

var indexRoutes = [
//   { path: "/landing-page", name: "LandingPage", component: LandingPage },
//   { path: "/profile-page", name: "ProfilePage", component: ProfilePage },
   { path: "/login", name: "LoginPage", component: LoginPage },
   { path: "/", name: "Landing Page", component: LandingPage },
   { path: "/profile", name:"SellerProfile", component: SellerDashboard}
];

export default indexRoutes;
