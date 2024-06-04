import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/public/home";
import PrivateLayout from "./components/layout/private";
import WarningUserModal from "./components/warning-user-modal";
import PublicLayout from "./components/layout/public";
import { useSelector } from "react-redux";
// import rolePages from "./constants/private-page";
import LoginPage from "./pages/public/login";
import RegisterPage from "./pages/public/register";
import useRolePages from "./hooks/usePages";
import ClientsPage from "./components/layout/public/clients";
import ClientPortfolioPage from "./pages/public/client-portfolio/client-portfolio";

// import AccountPage from "./pages/private/account";
// import PortfoliosPage from "./pages/private/portfolios";
// import SkillsPage from "./pages/private/skills";
// import UsersPage from "./pages/private/users";
// import DashboardPage from "./pages/private/dashboard";
// import useRolePages from "./hooks/useRolePages";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const rolePages = useRolePages();

  // const role = JSON.parse(localStorage.getItem("user"))?.role;
  return (
    <BrowserRouter>
      {user?.role === "user" ? <WarningUserModal /> : null}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="portfolios" element={<ClientPortfolioPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route element={<PrivateLayout />}>
          {rolePages.map(({ url, page: Page }) => (
            <Route key={url} path={url} element={<Page />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
