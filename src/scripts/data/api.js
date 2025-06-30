const BASE_URL = "https://story-api.dicoding.dev/v1";

import { saveStoryList, getStoryList } from "./db.js";

export async function loginUser(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch {
    return { error: true, message: "Login gagal: jaringan error" };
  }
}

export async function registerUser(name, email, password) {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return await res.json();
  } catch {
    return { error: true, message: "Registrasi gagal: jaringan error" };
  }
}

export async function fetchAllStories({ size = 100, location = 0 } = {}) {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams({ size, location }).toString();

  try {
    const res = await fetch(`${BASE_URL}/stories?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!data.error && data.listStory) {
      await saveStoryList(data.listStory); // ✅ Simpan ke IndexedDB
      return data.listStory;
    }

    return [];
  } catch (err) {
    console.warn("❌ Gagal fetch dari API. Coba ambil dari IndexedDB.");
    return await getStoryList(); // ✅ Fallback ke data lokal
  }
}

export async function uploadStory(formData) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${BASE_URL}/stories`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    return await res.json();
  } catch {
    return { error: true, message: "Upload gagal: jaringan error" };
  }
}
