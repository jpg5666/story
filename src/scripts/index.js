import App from "./pages/app.js";
import { initRouter } from "./routes/routes.js";
import "../styles/styles.css";

// ✅ Tambahkan ini untuk mendaftarkan service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const currentHash = window.location.hash;

  // Jika belum login dan sedang di root, redirect ke login
  if (!token && (!currentHash || currentHash === "#/" || currentHash === "#")) {
    window.location.hash = "#/login";
  }

  const app = new App({
    navigationDrawer: document.querySelector("#navigation-drawer"),
    drawerButton: document.querySelector("#drawer-button"),
    content: document.querySelector("#main"),
  });

  // Pastikan render halaman setelah hashchange
  document.addEventListener("rerender", () => {
    app.renderPage();
  });

  initRouter(); // akan trigger rerender pertama
});
