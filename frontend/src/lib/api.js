const BASE = '/api/backend';

async function post(path, body = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(err?.message || '요청에 실패했습니다'), { status: res.status, data: err });
  }
  return res.json();
}

/** SSR 전용: 서버에서 직접 백엔드 호출 */
export async function serverPost(path, body = {}) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
  const res = await fetch(`${backendUrl}/api${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(err?.message || '요청에 실패했습니다'), { status: res.status });
  }
  return res.json();
}

export const api = {
  getQuestions: () => post('/questions/list'),
  submitAnswers: (answers, recaptchaToken) => post('/results', { answers, recaptchaToken }),
  getResult: (shareToken) => post('/results/get', { shareToken }),
  getType: (mbtiCode) => post('/types/get', { mbtiCode }),
  getStatistics: () => post('/statistics/get'),
};
