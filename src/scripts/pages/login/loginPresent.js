import { loginModel } from "./loginModel.js";
import { renderLoginView } from "./loginView.js";

export function renderLogin() {
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = renderLoginView();
}

export function loginPresenter() {
  const form = document.getElementById("login-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      alert("Email dan Password harus diisi!");
      return;
    }

    const result = await loginModel.loginUser(email, password);

    if (!result.error) {
      localStorage.setItem("token", result.loginResult.token);
      alert("Login berhasil!");
      window.location.hash = "#/home";
    } else {
      alert("Login gagal: " + result.message);
    }
  });
}
