export function renderLoginView() {
  return `
    <section class="login-section">
      <div class="login-card">
        <h2>Login</h2>
        <form id="login-form">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <button type="submit">Login</button>
        </form>
        <p>Belum punya akun?
          <a href="#/register" id="to-register-link">Daftar di sini</a>
        </p>
      </div>
    </section>
  `;
}
