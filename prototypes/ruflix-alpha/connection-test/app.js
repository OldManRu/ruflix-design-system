const $ = (id) => document.getElementById(id);

const serverUrlInput = $('serverUrl');
const usernameInput = $('username');
const passwordInput = $('password');
const connectBtn = $('connectBtn');
const useSavedBtn = $('useSavedBtn');
const logoutBtn = $('logoutBtn');
const statusCard = $('statusCard');
const statusText = $('statusText');
const userOutput = $('userOutput');
const logOutput = $('logOutput');
const librariesEl = $('libraries');
const latestEl = $('latest');
const resumeEl = $('resume');
const keys = window.RuFlixStorageKeys;

serverUrlInput.value = localStorage.getItem(keys.serverUrl) || '';

function log(message) {
  const timestamp = new Date().toLocaleTimeString();
  logOutput.textContent += `\n[${timestamp}] ${message}`;
}

function setStatus(text, type = '') {
  statusText.textContent = text;
  statusCard.classList.remove('good', 'bad');
  if (type) statusCard.classList.add(type);
}

function saveSession(api) {
  localStorage.setItem(keys.serverUrl, api.serverUrl);
  localStorage.setItem(keys.token, api.token);
  localStorage.setItem(keys.userId, api.userId);
}

function clearSession() {
  localStorage.removeItem(keys.token);
  localStorage.removeItem(keys.userId);
  setStatus('Token cleared');
  userOutput.textContent = 'Waiting...';
  librariesEl.innerHTML = '';
  latestEl.innerHTML = '';
  resumeEl.innerHTML = '';
  log('Cleared saved Jellyfin token.');
}

function libraryCard(view) {
  const el = document.createElement('div');
  el.className = 'library-card';
  el.innerHTML = `<strong>${view.Name}</strong><span>${view.CollectionType || 'library'} · ${view.Id}</span>`;
  return el;
}

function mediaCard(api, item) {
  const image = api.imageUrl(item);
  const playback = api.playbackUrl(item);
  const el = document.createElement('article');
  el.className = 'media-card';
  el.innerHTML = `
    <div class="poster" style="background-image:url('${image}')"></div>
    <div class="media-body">
      <div class="media-title">${item.Name || 'Untitled'}</div>
      <div class="media-sub">${item.Type || 'Item'}${item.ProductionYear ? ` · ${item.ProductionYear}` : ''}</div>
      <div class="small-url">${playback ? 'Playback URL generated' : 'No playback URL'}</div>
    </div>
  `;
  return el;
}

async function runTests(api) {
  setStatus('Testing connection...');
  logOutput.textContent = 'Starting connection test...';

  const info = await api.publicInfo();
  log(`Public server info OK: ${info.ServerName || 'Jellyfin'} (${info.Version || 'unknown version'})`);

  const user = await api.currentUser();
  userOutput.textContent = JSON.stringify({ Id: user.Id, Name: user.Name, Policy: user.Policy ? 'present' : 'not returned' }, null, 2);
  log(`Current user OK: ${user.Name}`);

  const libraries = await api.libraries();
  librariesEl.innerHTML = '';
  (libraries.Items || []).forEach(view => librariesEl.appendChild(libraryCard(view)));
  log(`Libraries OK: ${(libraries.Items || []).length} found`);

  const latest = await api.latest();
  latestEl.innerHTML = '';
  (latest || []).forEach(item => latestEl.appendChild(mediaCard(api, item)));
  log(`Latest media OK: ${(latest || []).length} items`);

  const resume = await api.resume();
  resumeEl.innerHTML = '';
  (resume.Items || []).forEach(item => resumeEl.appendChild(mediaCard(api, item)));
  log(`Continue watching OK: ${(resume.Items || []).length} items`);

  setStatus('Connected', 'good');
  log('Connection test complete.');
}

async function connectWithCredentials() {
  try {
    const serverUrl = serverUrlInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!serverUrl || !username || !password) throw new Error('Server URL, username, and password are required.');

    localStorage.setItem(keys.serverUrl, serverUrl);
    const api = new JellyfinApi(serverUrl);
    setStatus('Authenticating...');
    logOutput.textContent = 'Authenticating with Jellyfin...';
    const auth = await api.login(username, password);
    saveSession(api);
    log(`Authentication OK: ${auth.User.Name}`);
    await runTests(api);
  } catch (error) {
    setStatus('Connection failed', 'bad');
    log(`ERROR: ${error.message}`);
    console.error(error);
  }
}

async function connectWithSavedToken() {
  try {
    const serverUrl = serverUrlInput.value.trim() || localStorage.getItem(keys.serverUrl);
    const token = localStorage.getItem(keys.token);
    const userId = localStorage.getItem(keys.userId);
    if (!serverUrl || !token || !userId) throw new Error('No saved server URL, token, and user ID found.');
    localStorage.setItem(keys.serverUrl, serverUrl);
    const api = new JellyfinApi(serverUrl, token, userId);
    await runTests(api);
  } catch (error) {
    setStatus('Saved token failed', 'bad');
    log(`ERROR: ${error.message}`);
    console.error(error);
  }
}

connectBtn.addEventListener('click', connectWithCredentials);
useSavedBtn.addEventListener('click', connectWithSavedToken);
logoutBtn.addEventListener('click', clearSession);
