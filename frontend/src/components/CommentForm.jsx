import { useState } from 'react';
import styles from './CommentForm.module.css';

function CommentForm({ onAdd }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        rows={3}
      />
      <button className={styles.submit} type="submit">
        Comment
      </button>
    </form>
  );
}

export default CommentForm;
