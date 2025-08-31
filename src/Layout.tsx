import {
 Link,
 Outlet,
 useLocation,
} from "react-router";

export const Layout = () => {
 const { pathname } = useLocation();
 const isHomePage = pathname === "/";
 return (
  <>
   {!isHomePage && (
    <Link to="/" className="back-button">
     Back
    </Link>
   )}
   <Outlet />
  </>
 );
};
