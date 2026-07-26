import { useState, useEffect } from 'react';
import { fetchComments, createComment, updateComment, deleteComment } from './api';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import styles from './App.module.css';

function App() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // grab comments from the backend
  const loadComments = async () => {
    try {
      const data = await fetchComments();
      setComments(data);
      setError(null);
    } catch (err) {
      setError('Failed to load comments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleAdd = async (text) => {
    try {
      await createComment(text);
      await loadComments();
    } catch {
      setError('Failed to add comment.');
    }
  };

  const handleEdit = async (id, text) => {
    try {
      await updateComment(id, text);
      await loadComments();
    } catch {
      setError('Failed to update comment.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await deleteComment(id);
      await loadComments();
    } catch {
      setError('Failed to delete comment.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      <CommentForm onAdd={handleAdd} />
      {loading && <p className={styles.status}>Loading comments...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && (
        <CommentList
          comments={comments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
