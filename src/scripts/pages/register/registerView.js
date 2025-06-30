export function renderRegisterView() {
  return `
    <section class="auth-page">
      <div class="auth-card">
        <h2>Register</h2>
        <form id="register-form">
          <label for="name">Nama</label>
          <input type="text" name="name" placeholder="Nama lengkap" required />

          <label for="email">Email</label>
          <input type="email" name="email" placeholder="Alamat email" required />

          <label for="password">Password</label>
          <input type="password" name="password" placeholder="Minimal 6 karakter" required />

          <button type="submit">Daftar</button>
        </form>
        <p>Sudah punya akun? 
          <a href="#/login">Login di sini</a>
        </p>
      </div>
    </section>
  `;
}
