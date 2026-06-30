const demoMedia = [
  { title: 'Beyond the Horizon', sub: '1h 32m left', year: '2024', rating: 'PG-13', runtime: '2h 18m', genre: 'Adventure', progress: '42%', colors: ['#6b2b12', '#111827'], desc: 'A cinematic adventure with a calm, sweeping atmosphere and a warm sense of discovery.' },
  { title: 'The Last Signal', sub: 'S1:E4', year: '2023', rating: 'TV-14', runtime: '48m', genre: 'Mystery', progress: '68%', colors: ['#112c38', '#0c1118'], desc: 'A quiet mystery series with cool tones, patient pacing, and a strong visual mood.' },
  { title: 'Autumn House', sub: '2022', year: '2022', rating: 'PG', runtime: '1h 54m', genre: 'Drama', progress: '22%', colors: ['#7a3d18', '#15100d'], desc: 'A warm family drama built around memory, home, and the comfort of familiar places.' },
  { title: 'Midnight Circuit', sub: '2024', year: '2024', rating: 'PG-13', runtime: '2h 02m', genre: 'Action', progress: '58%', colors: ['#1c3158', '#090d16'], desc: 'A sleek action film with cool city lights, fast movement, and polished nighttime visuals.' },
  { title: 'Campfire Stories', sub: 'Family Favorite', year: '2021', rating: 'PG', runtime: '1h 41m', genre: 'Family', progress: '15%', colors: ['#7c4418', '#0d0a07'], desc: 'A cozy family favorite with soft amber lighting, gentle humor, and relaxed pacing.' },
  { title: 'Deep Blue County', sub: 'Recently Added', year: '2020', rating: 'PG-13', runtime: '2h 06m', genre: 'Thriller', progress: '35%', colors: ['#0d475d', '#071014'], desc: 'A moody coastal thriller with fog, blue shadows, and a quiet sense of tension.' }
];

const hero = document.getElementById('hero');
const heroBackdropA = document.getElementById('heroBackdropA');
const heroBackdropB = document.getElementById('heroBackdropB');
const heroTitle = document.getElementById('heroTitle');
const heroLogo = document.getElementById('heroLogo');
const heroMeta = document.getElementById('heroMeta');
const heroDesc = document.getElementById('heroDesc');
const heroEyebrow = document.getElementById('heroEyebrow');
const movieNightBtn = document.getElementById('movieNightBtn');
const tonightShelf = document.getElementById('tonightShelf');
const exitMovieNight = document.getElementById('exitMovieNight');
const dataStatus = document.getElementById('dataStatus');
const profileName = document.getElementById('profileName');
const libraryNav = document.getElementById('libraryNav');

let heroTimer = null;
let activeHero = null;
let activeBackdrop = heroBackdropA;
let inactiveBackdrop = heroBackdropB;

function hashColor(input) {
  const palette = ['#6b2b12', '#16324f', '#3b1d5a', '#0d475d', '#7c4418', '#173b2f', '#4a1833', '#26324a'];
  let hash = 0;
  for (let i = 0; i < input.length; i++) hash = input.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

function gradient(item) {
  return `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]})`;
}

function heroImage(item) {
  if (item.backdrop) return `linear-gradient(135deg, rgba(5,6,9,.20), rgba(5,6,9,.08)), url('${item.backdrop}')`;
  return gradient(item);
}

function swapBackdrop(item, immediate = false) {
  inactiveBackdrop.style.backgroundImage = heroImage(item);

  if (immediate) {
    activeBackdrop.classList.remove('is-visible');
    inactiveBackdrop.classList.add('is-visible');
  } else {
    requestAnimationFrame(() => {
      inactiveBackdrop.classList.add('is-visible');
      activeBackdrop.classList.remove('is-visible');
    });
  }

  const previous = activeBackdrop;
  activeBackdrop = inactiveBackdrop;
  inactiveBackdrop = previous;
}

function setHero(item, immediate = false) {
  if (item.surprise || !item.title) return;
  if (activeHero === item.title && !immediate) return;
  activeHero = item.title;

  clearTimeout(heroTimer);
  heroTimer = setTimeout(() => {
    hero.classList.add('is-changing');
    document.documentElement.style.setProperty('--glow', `${item.colors[0]}66`);
    swapBackdrop(item, immediate);

    setTimeout(() => {
      heroTitle.textContent = item.title;
      heroDesc.textContent = item.desc || 'No overview available yet.';
      heroEyebrow.textContent = item.eyebrow || 'Featured';
      heroMeta.innerHTML = [item.year, item.rating, item.runtime, item.genre].filter(Boolean).map(x => `<span>${x}</span>`).join('');

      if (item.logo) {
        heroLogo.src = item.logo;
        heroLogo.classList.remove('hidden');
        heroTitle.classList.add('hidden');
      } else {
        heroLogo.classList.add('hidden');
        heroTitle.classList.remove('hidden');
      }
    }, immediate ? 0 : 220);

    setTimeout(() => hero.classList.remove('is-changing'), immediate ? 120 : 760);
  }, immediate ? 0 : 200);
}

function makeCard(item) {
  const card = document.createElement('button');
  card.className = `card ${item.surprise ? 'surprise' : ''}`;
  card.style.setProperty('--card-bg', gradient(item));
  if (item.image) card.style.backgroundImage = `linear-gradient(0deg, rgba(0,0,0,.72), rgba(0,0,0,.12)), url('${item.image}')`;
  card.innerHTML = item.surprise
    ? `<div class="card-title">Surprise Me</div><div class="card-sub">Movie Night pick</div>`
    : `<div class="progress"><span style="width:${item.progress || '0%'}"></span></div><div class="card-title">${item.title}</div><div class="card-sub">${item.sub || ''}</div>`;
  card.addEventListener('mouseenter', () => setHero(item));
  card.addEventListener('focus', () => setHero(item));
  return card;
}

function renderRow(id, items) {
  const row = document.getElementById(id);
  row.innerHTML = '';
  items.forEach(item => row.appendChild(makeCard(item)));
}

function ticksToRuntime(ticks) {
  if (!ticks) return '';
  const mins = Math.round(ticks / 600000000);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

function progressFromUserData(item) {
  const pct = item.UserData?.PlayedPercentage;
  if (typeof pct === 'number') return `${Math.max(0, Math.min(100, pct)).toFixed(0)}%`;
  return '0%';
}

function remainingTime(item) {
  const runtimeTicks = item.RunTimeTicks || 0;
  const playedTicks = item.UserData?.PlaybackPositionTicks || 0;
  if (!runtimeTicks || !playedTicks) return '';
  const remainingTicks = Math.max(0, runtimeTicks - playedTicks);
  const remaining = ticksToRuntime(remainingTicks);
  return remaining ? `${remaining} left` : '';
}

function imageTagUrl(api, item, type, width = 900) {
  if (!item?.Id) return '';
  return `${api.serverUrl}/Items/${item.Id}/Images/${type}?fillWidth=${width}&quality=92`;
}

function jellyfinToMedia(api, item, label = '') {
  const color = hashColor(item.Id || item.Name || 'ruflix');
  const image = imageTagUrl(api, item, 'Primary', 520);
  const backdrop = item.BackdropImageTags?.length ? imageTagUrl(api, item, 'Backdrop', 1500) : image;
  const logo = item.ImageTags?.Logo ? imageTagUrl(api, item, 'Logo', 700) : '';
  const progressLabel = remainingTime(item);
  return {
    title: item.Name || 'Untitled',
    sub: progressLabel || label || item.Type || '',
    year: item.ProductionYear || '',
    rating: item.OfficialRating || (item.CommunityRating ? `${Number(item.CommunityRating).toFixed(1)} rating` : ''),
    runtime: ticksToRuntime(item.RunTimeTicks),
    genre: item.Genres?.[0] || item.Type || '',
    progress: progressFromUserData(item),
    colors: [color, '#07090d'],
    desc: item.Overview || 'No overview available yet.',
    image,
    backdrop,
    logo,
    eyebrow: label || item.Type || 'From Jellyfin'
  };
}

function demoRows() {
  return {
    continueRow: demoMedia.slice(0, 5),
    recentRow: [demoMedia[2], demoMedia[3], demoMedia[5], demoMedia[0], demoMedia[1]],
    favoritesRow: [demoMedia[4], demoMedia[0], demoMedia[2], demoMedia[1], demoMedia[5]],
    tonightRow: [{ title: 'Surprise Me', sub: 'Pick for me', colors: ['rgba(255,176,32,.35)', '#1b1204'], surprise: true }, ...demoMedia.slice(0, 5)]
  };
}

function renderNav(libraries = []) {
  libraryNav.innerHTML = '';
  libraries.slice(0, 7).forEach(view => {
    const button = document.createElement('button');
    button.className = 'nav-item';
    button.innerHTML = `<span>${view.Name}</span>`;
    libraryNav.appendChild(button);
  });
}

function renderAll(rows) {
  renderRow('continueRow', rows.continueRow);
  renderRow('recentRow', rows.recentRow);
  renderRow('favoritesRow', rows.favoritesRow);
  renderRow('tonightRow', rows.tonightRow);
  setHero(rows.continueRow[0] || rows.recentRow[0] || demoMedia[0], true);
}

async function loadJellyfinData() {
  const keys = window.RuFlixStorageKeys;
  const serverUrl = localStorage.getItem(keys.serverUrl);
  const token = localStorage.getItem(keys.token);
  const userId = localStorage.getItem(keys.userId);
  if (!serverUrl || !token || !userId || !window.JellyfinApi) {
    dataStatus.textContent = 'Demo data';
    renderNav([{ Name: 'Movies' }, { Name: 'TV Shows' }, { Name: 'Live TV' }]);
    renderAll(demoRows());
    return;
  }

  try {
    dataStatus.textContent = 'Loading Jellyfin...';
    const api = new JellyfinApi(serverUrl, token, userId);
    const user = await api.currentUser();
    profileName.textContent = user.Name || 'Jellyfin';

    const librariesRaw = await api.libraries();
    renderNav(librariesRaw.Items || []);

    const latestRaw = await api.latest(16);
    const resumeRaw = await api.resume(16);
    const latest = (latestRaw || []).map(item => jellyfinToMedia(api, item, 'Recently Added'));
    const resume = (resumeRaw.Items || []).map(item => jellyfinToMedia(api, item, 'Continue Watching'));
    const favorites = latest.slice(0, 8).map(item => ({ ...item, sub: 'Family Favorite', eyebrow: 'Family Favorite' }));
    const tonight = [{ title: 'Surprise Me', sub: 'Pick for me', colors: ['rgba(255,176,32,.35)', '#1b1204'], surprise: true }, ...latest.slice(0, 8)];

    renderAll({
      continueRow: resume.length ? resume : latest.slice(0, 8),
      recentRow: latest.length ? latest : demoRows().recentRow,
      favoritesRow: favorites.length ? favorites : demoRows().favoritesRow,
      tonightRow: tonight
    });
    dataStatus.textContent = 'Connected to Jellyfin';
  } catch (error) {
    console.error(error);
    dataStatus.textContent = 'Jellyfin load failed - demo data';
    renderNav([{ Name: 'Movies' }, { Name: 'TV Shows' }, { Name: 'Live TV' }]);
    renderAll(demoRows());
  }
}

function enterMovieNight() {
  document.body.classList.add('movie-night');
  movieNightBtn.classList.add('active');
  tonightShelf.classList.remove('hidden');
  tonightShelf.classList.add('show');
  const firstTonight = document.querySelector('#tonightRow .card:not(.surprise)');
  if (firstTonight) firstTonight.focus();
}

function leaveMovieNight() {
  document.body.classList.remove('movie-night');
  movieNightBtn.classList.remove('active');
  tonightShelf.classList.add('hidden');
  tonightShelf.classList.remove('show');
}

movieNightBtn.addEventListener('click', () => {
  if (document.body.classList.contains('movie-night')) leaveMovieNight();
  else enterMovieNight();
});
exitMovieNight.addEventListener('click', leaveMovieNight);

loadJellyfinData();
