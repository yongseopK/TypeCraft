const KEY = 'typecraft_quiz';

export function saveProgress(answers, currentIndex) {
  try {
    const existing = loadProgress();
    localStorage.setItem(KEY, JSON.stringify({
      answers,
      currentIndex,
      startedAt: existing?.startedAt || new Date().toISOString(),
    }));
  } catch {}
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function clearProgress() {
  try { localStorage.removeItem(KEY); } catch {}
}

export function hasProgress() {
  const p = loadProgress();
  return p && Object.keys(p.answers || {}).length > 0;
}
