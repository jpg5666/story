export const loginModel = {
  async loginUser(email, password) {
    try {
      const response = await fetch("https://story-api.dicoding.dev/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      return data;
    } catch {
      return {
        error: true,
        message: "Terjadi kesalahan jaringan. Silakan coba lagi.",
      };
    }
  },
};
