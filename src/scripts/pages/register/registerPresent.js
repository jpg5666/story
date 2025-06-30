import { registerModel } from "./registerModel.js";
import { renderRegisterView } from "./registerView.js";

export function renderRegister() {
  const main = document.getElementById("main");
  if (!main) return;
  main.innerHTML = renderRegisterView();
}

export function registerPresenter() {
  const form = document.getElementById("register-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!name || !email || !password) {
      alert("Semua kolom wajib diisi!");
      return;
    }

    if (password.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }

    const result = await registerModel.registerUser(name, email, password);

    if (!result.error) {
      alert("Registrasi berhasil! Silakan login.");
      window.location.hash = "#/login";

      // ✅ Trigger manual rerender agar loginPresenter() dipanggil
      setTimeout(() => {
        document.dispatchEvent(new Event("rerender"));
      }, 100);
    } else {
      alert("Registrasi gagal: " + result.message);
    }
  });
}
