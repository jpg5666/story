import { renderLogin, loginPresenter } from "../pages/login/loginPresent.js";
import { renderRegister, registerPresenter } from "../pages/register/registerPresent.js";
import { renderHomePage, homePresenter } from "../pages/home/homePresent.js";
import { renderMap } from "../pages/map/mapPresent.js";

function isLoggedIn() {
  return !!localStorage.getItem("token");
}

const routes = {
  "/": {
    render: isLoggedIn() ? renderHomePage : renderLogin,
    afterRender: isLoggedIn() ? homePresenter : loginPresenter,
  },
  "/home": {
    render: renderHomePage,
    afterRender: homePresenter,
  },
  "/login": {
    render: renderLogin,
    afterRender: loginPresenter,
  },
  "/register": {
    render: renderRegister,
    afterRender: registerPresenter,
  },
  "/map": {
    render: renderMap,
  },
  "/logout": {
    render: () => {
      localStorage.removeItem("token");
      alert("Logout berhasil");
      window.location.hash = "#/login";
    },
  },
};

export function initRouter() {
  window.addEventListener("hashchange", () => {
    document.dispatchEvent(new Event("rerender"));
    window.scrollTo(0, 0);
  });

  document.dispatchEvent(new Event("rerender"));
}

export default routes;
