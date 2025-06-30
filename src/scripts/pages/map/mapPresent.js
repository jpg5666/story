import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import { getStoriesWithLocation } from "./mapModel.js";
import { renderMapView } from "./mapView.js";

let map;

export function renderMap() {
  const main = document.getElementById("main");
  if (!main) return;

  // Hapus map sebelumnya jika ada
  if (map) {
    map.remove();
    map = null;
  }

  main.innerHTML = renderMapView();

  // Tunggu map div render dulu
  setTimeout(() => {
    mapPresenter();
  }, 100);
}

async function mapPresenter() {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  map = L.map("map", {
    center: [-2.5489, 118.0149],
    zoom: 5,
    minZoom: 3,
    maxZoom: 18,
    maxBounds: [
      [-90, -180],
      [90, 180],
    ],
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Pastikan ukuran peta direfresh
  setTimeout(() => map.invalidateSize(), 0);

  const cluster = L.markerClusterGroup({
    disableClusteringAtZoom: 10,
    maxClusterRadius: 30,
  });

  const icon = L.icon({
    iconUrl: "./images/user.png",
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: [0, -64],
  });

  const stories = await getStoriesWithLocation();
  stories.forEach((story) => {
    const marker = L.marker([story.lat, story.lon], { icon });
    marker.bindPopup(`
      <strong>${story.name}</strong><br>
      ${story.description}<br>
      <img src="${story.photoUrl}" alt="Foto" width="100">
    `);
    cluster.addLayer(marker);
  });

  map.addLayer(cluster);
}
