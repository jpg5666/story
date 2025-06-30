export function renderHome() {
  return `
    <section class="home-section">
      <h2>Daftar Cerita</h2>
      <div id="story-list" class="story-list"></div>
      <div class="upload-float-btn">
        <label for="upload-modal-toggle" class="floating-button">+</label>
      </div>
      <input type="checkbox" id="upload-modal-toggle" hidden>
      <div class="upload-modal">
        <div class="upload-box">
          <h3>Tambah Cerita</h3>
          <form id="upload-form">
            <input type="text" id="desc" placeholder="Deskripsi" required><br>
            <video id="camera-preview" autoplay playsinline width="100%" style="max-height:200px;"></video>
            <img id="captured-preview" style="max-height:200px; display: none;" />
            <canvas id="camera-canvas" style="display: none;"></canvas>
            <button type="button" id="capture-btn">Ambil Gambar</button><br>
            <input type="file" id="photo" style="display:none;" />
            <button type="submit">Upload</button>
          </form>
          <label for="upload-modal-toggle" class="close-button">X</label>
        </div>
      </div>
    </section>
  `;
}

export function renderStoryList(stories) {
  const container = document.getElementById("story-list");
  if (!container) return;

  container.innerHTML = stories
    .map(
      (story) => `
        <div class="story-card">
          <img src="${story.photoUrl}" alt="${story.name}" class="story-img" />
          <h3>${story.name}</h3>
          <p>${story.description}</p>
          <small>${new Date(story.createdAt).toLocaleString()}</small>
        </div>
      `
    )
    .join("");
}
