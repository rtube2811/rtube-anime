// rt-anime.js - logic halaman Anime RTube2811
const animeData = [
  {
    id:"a1",
    title:"ShiroKaze Academy",
    thumb:"https://via.placeholder.com/300x180?text=ShiroKaze",
    genre:"Action",
    synopsis:"Seorang siswa menemukan kekuatan rahasia dan memulai petualangan antar dimensi.",
    episodes:[
      {ep:1,title:"Prolog",src:"https://www.w3schools.com/html/mov_bbb.mp4",type:"mp4"},
      {ep:2,title:"Bangkit",src:"https://www.w3schools.com/html/mov_bbb.mp4",type:"mp4"}
    ]
  },
  {
    id:"a2",
    title:"Romance in Neon",
    thumb:"https://via.placeholder.com/300x180?text=Romance+in+Neon",
    genre:"Romance",
    synopsis:"Kisah cinta dua remaja yang bertemu di kota futuristik penuh lampu neon.",
    episodes:[
      {ep:1,title:"Pertemuan",src:"https://www.w3schools.com/html/mov_bbb.mp4",type:"mp4"},
      {ep:2,title:"Salah Paham",src:"https://www.w3schools.com/html/mov_bbb.mp4",type:"mp4"}
    ]
  }
];

const container = document.getElementById("rt-anime-page");
const modal = document.createElement("div");
modal.id = "rt-modal";
modal.innerHTML = `<div class="modal-box">
  <h2 id="modal-title"></h2>
  <div id="modal-player"></div>
  <div class="episode-list" id="modal-episodes"></div>
  <button onclick="closeModal()">Tutup</button>
</div>`;
document.body.appendChild(modal);

function renderGrid(){
  const grid = document.createElement("div");
  grid.className = "anime-grid";
  animeData.forEach(anime=>{
    const card = document.createElement("div");
    card.className = "anime-card";
    card.innerHTML = `<img src="${anime.thumb}"><div class="info"><strong>${anime.title}</strong><br><small>${anime.genre}</small></div>`;
    card.onclick=()=>openAnime(anime);
    grid.appendChild(card);
  });
  container.appendChild(grid);
}

function openAnime(anime){
  document.getElementById("modal-title").textContent = anime.title;
  renderEpisodes(anime);
  showEpisode(anime,0);
  modal.classList.add("show");
}
function renderEpisodes(anime){
  const list = document.getElementById("modal-episodes");
  list.innerHTML = "";
  anime.episodes.forEach((ep,i)=>{
    const d = document.createElement("div");
    d.className="episode";
    d.textContent=`EP ${ep.ep} - ${ep.title}`;
    d.onclick=()=>showEpisode(anime,i);
    list.appendChild(d);
  });
}
function showEpisode(anime,index){
  const ep = anime.episodes[index];
  const player = document.getElementById("modal-player");
  if(ep.type==="mp4"){
    player.innerHTML = `<video src="${ep.src}" controls autoplay></video>`;
  } else {
    player.innerHTML = `<iframe src="${ep.src}" frameborder="0" allowfullscreen></iframe>`;
  }
  document.querySelectorAll(".episode").forEach((el,i)=>{
    el.classList.toggle("active", i===index);
  });
}
function closeModal(){ modal.classList.remove("show"); }

renderGrid();
