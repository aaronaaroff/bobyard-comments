const BASE_URL = 'http://localhost:8000/api/comments/';

export async function fetchComments() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch comments');
  return res.json();
}

export async function createComment(text, parentId = null) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      author: 'Admin',
      text,
      date: new Date().toISOString(),
      likes: 0,
      image: '',
      parent: parentId,
    }),
  });
  if (!res.ok) throw new Error('Failed to create comment');
  return res.json();
}

export const updateComment = async (id, text) => {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error('Failed to update comment');
  return res.json();
};

export async function deleteComment(id) {
  const resp = await fetch(`${BASE_URL}${id}/`, { method: 'DELETE' });
  if (!resp.ok) throw new Error('Failed to delete comment');
}
