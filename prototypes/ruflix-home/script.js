const media = [
  { title: 'Beyond the Horizon', sub: '1h 32m left', year: '2024', rating: 'PG-13', runtime: '2h 18m', genre: 'Adventure', progress: '42%', colors: ['#6b2b12', '#111827'], desc: 'A cinematic adventure with a calm, sweeping atmosphere and a warm sense of discovery.' },
  { title: 'The Last Signal', sub: 'S1:E4', year: '2023', rating: 'TV-14', runtime: '48m', genre: 'Mystery', progress: '68%', colors: ['#112c38', '#0c1118'], desc: 'A quiet mystery series with cool tones, patient pacing, and a strong visual mood.' },
  { title: 'Autumn House', sub: '2022', year: '2022', rating: 'PG', runtime: '1h 54m', genre: 'Drama', progress: '22%', colors: ['#7a3d18', '#15100d'], desc: 'A warm family drama built around memory, home, and the comfort of familiar places.' },
  { title: 'Midnight Circuit', sub: '2024', year: '2024', rating: 'PG-13', runtime: '2h 02m', genre: 'Action', progress: '58%', colors: ['#1c3158', '#090d16'], desc: 'A sleek action film with cool city lights, fast movement, and polished nighttime visuals.' },
  { title: 'Campfire Stories', sub: 'Family Favorite', year: '2021', rating: 'PG', runtime: '1h 41m', genre: 'Family', progress: '15%', colors: ['#7c4418', '#0d0a07'], desc: 'A cozy family favorite with soft amber lighting, gentle humor, and relaxed pacing.' },
  { title: 'Deep Blue County', sub: 'Recently Added', year: '2020', rating: 'PG-13', runtime: '2h 06m', genre: 'Thriller', progress: '35%', colors: ['#0d475d', '#071014'], desc: 'A moody coastal thriller with fog, blue shadows, and a quiet sense of tension.' }
];

const tonight = [
  { title: 'Surprise Me', sub: 'Pick for me', colors: ['rgba(255,176,32,.35)', '#1b1204'], surprise: true },
  ...media.slice(0, 5)
];

const rows = {
  continueRow: media.slice(0, 5),
  recentRow: [media[2], media[3], media[5], media[0], media[1]],
  favoritesRow: [media[4], media[0], media[2], media[1], media[5]],
  tonightRow: tonight
};

const hero = document.getElementById('hero');
const heroTitle = document.getElementById('heroTitle');
const heroMeta = document.getElementById('heroMeta');
const heroDesc = document.getElementById('heroDesc');
const movieNightBtn = document.getElementById('movieNightBtn');
const tonightShelf = document.getElementById('tonightShelf');
const exitMovieNight = document.getElementById('exitMovieNight');

function gradient(item) {
  const a = item.colors[0];
  const b = item.colors[1];
  return `linear-gradient(135deg, ${a}, ${b})`;
}

function setHero(item) {
  if (item.surprise) return;
  document.documentElement.style.setProperty('--glow', `${item.colors[0]}66`);
  hero.style.setProperty('--hero-bg', gradient(item));
  heroTitle.textContent = item.title;
  heroDesc.textContent = item.desc;
  heroMeta.innerHTML = `<span>${item.year}</span><span>${item.rating}</span><span>${item.runtime}</span><span>${item.genre}</span>`;
}

function makeCard(item) {
  const card = document.createElement('button');
  card.className = `card ${item.surprise ? 'surprise' : ''}`;
  card.style.setProperty('--card-bg', gradient(item));
  if (item.surprise) {
    card.innerHTML = `<div class="card-title">Surprise Me</div><div class="card-sub">Movie Night pick</div>`;
  } else {
    card.innerHTML = `<div class="progress"><span style="width:${item.progress}"></span></div><div class="card-title">${item.title}</div><div class="card-sub">${item.sub}</div>`;
  }
  card.addEventListener('mouseenter', () => setHero(item));
  card.addEventListener('focus', () => setHero(item));
  return card;
}

Object.entries(rows).forEach(([id, items]) => {
  const row = document.getElementById(id);
  items.forEach(item => row.appendChild(makeCard(item)));
});

function enterMovieNight() {
  document.body.classList.add('movie-night');
  movieNightBtn.classList.add('active');
  tonightShelf.classList.remove('hidden');
  tonightShelf.classList.add('show');
  setHero(media[4]);
}

function leaveMovieNight() {
  document.body.classList.remove('movie-night');
  movieNightBtn.classList.remove('active');
  tonightShelf.classList.add('hidden');
  tonightShelf.classList.remove('show');
  setHero(media[0]);
}

movieNightBtn.addEventListener('click', () => {
  if (document.body.classList.contains('movie-night')) leaveMovieNight();
  else enterMovieNight();
});
exitMovieNight.addEventListener('click', leaveMovieNight);

setHero(media[0]);
