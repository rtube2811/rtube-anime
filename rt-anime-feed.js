// rt-anime-feed.js - ambil otomatis label Anime dari Blogger feed

const BLOG_URL = "https://rtube2811.blogspot.com"; // pakai blog kamu
const LABEL = "Anime";
const FEED_URL = `${BLOG_URL}/feeds/posts/default/-/${LABEL}?alt=json&max-results=20`;

const container = document.getElementById("rt-anime-page");

async function loadAnime() {
  try {
    const res = await fetch(FEED_URL);
    const data = await res.json();
    const entries = data.feed.entry || [];
    
    const grid = document.createElement("div");
    grid.className = "anime-grid";
    
    entries.forEach(entry => {
      const title = entry.title.$t;
      const link = entry.link.find(l => l.rel === "alternate").href;
      const thumb = (entry.media$thumbnail) ? entry.media$thumbnail.url.replace("/s72-c/", "/s320/") : "https://via.placeholder.com/300x180?text=Anime";
      
      const card = document.createElement("div");
      card.className = "anime-card";
      card.innerHTML = `
        <a href="${link}">
          <img src="${thumb}" alt="${title}">
          <div class="info"><strong>${title}</strong></div>
        </a>
      `;
      grid.appendChild(card);
    });
    
    container.innerHTML = "";
    container.appendChild(grid);
    
  } catch (e) {
    container.innerHTML = "<p>Gagal memuat daftar anime...</p>";
    console.error(e);
  }
}

loadAnime();
