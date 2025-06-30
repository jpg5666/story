import { renderHome, renderStoryList } from "./homeView.js";
import { homeModel } from "./homeModel.js";
import "../../../styles/home.css";

let mediaStream = null;
let captured = false;

export function renderHomePage() {
  const main = document.getElementById("main");
  if (main) {
    main.innerHTML = renderHome();
  }
}

export async function homePresenter() {
  const stories = await homeModel.fetchStoriesWithLocation();
  renderStoryList(stories);
  setupUploadHandlers();
}

function setupUploadHandlers() {
  const form = document.getElementById("upload-form");
  const video = document.getElementById("camera-preview");
  const canvas = document.getElementById("camera-canvas");
  const previewImg = document.getElementById("captured-preview");
  const captureBtn = document.getElementById("capture-btn");
  const fileInput = document.getElementById("photo");
  const descInput = document.getElementById("desc");
  const modalToggle = document.getElementById("upload-modal-toggle");

  if (!form || !video || !canvas || !captureBtn || !fileInput || !descInput || !modalToggle) {
    return;
  }

  modalToggle.addEventListener("change", async () => {
    if (modalToggle.checked) {
      captured = false;
      previewImg.style.display = "none";
      video.style.display = "block";
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = mediaStream;
      } catch {
        alert("Tidak bisa mengakses kamera");
      }
    } else {
      stopCamera(video);
      resetUploadForm(form, fileInput, previewImg, video);
    }
  });

  captureBtn.addEventListener("click", () => {
    if (!mediaStream) return alert("Kamera belum aktif");

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
        captured = true;

        previewImg.src = URL.createObjectURL(file);
        previewImg.style.display = "block";
        video.style.display = "none";
      },
      "image/jpeg",
      0.9
    );
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const description = descInput.value.trim();
    const photo = fileInput.files[0];

    if (!captured || !photo) {
      alert("Silakan ambil gambar terlebih dahulu!");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        formData.append("lat", pos.coords.latitude);
        formData.append("lon", pos.coords.longitude);
        await uploadAndRefresh(formData, form, fileInput, previewImg, video, modalToggle);
      },
      async () => {
        await uploadAndRefresh(formData, form, fileInput, previewImg, video, modalToggle);
      }
    );
  });
}

async function uploadAndRefresh(formData, form, fileInput, previewImg, video, modalToggle) {
  const result = await homeModel.uploadStory(formData);
  if (!result.error) {
    const updatedStories = await homeModel.fetchStoriesWithLocation();
    renderStoryList(updatedStories);
    stopCamera(video);
    resetUploadForm(form, fileInput, previewImg, video);
    modalToggle.checked = false;
    alert("Cerita berhasil diunggah!");
  } else {
    alert(result.message || "Gagal mengunggah cerita");
  }
}

function stopCamera(videoElement) {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop());
    videoElement.srcObject = null;
    mediaStream = null;
  }
}

function resetUploadForm(form, fileInput, previewImg, video) {
  form.reset();
  fileInput.value = "";
  previewImg.src = "";
  previewImg.style.display = "none";
  video.style.display = "block";
  captured = false;
}
