import { useState } from 'react';
import styles from './CommentCard.module.css';

function CommentCard({ comment, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  function handleSave() {
    if (!editText.trim()) return;
    onEdit(comment.id, editText);
    setIsEditing(false);
  }

  const handleCancel = () => {
    setEditText(comment.text);
    setIsEditing(false);
  };

  // format date to something readable
  const displayDate = new Date(comment.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.authorInfo}>
          <span className={styles.avatar}>
            {comment.author.charAt(0).toUpperCase()}
          </span>
          <span className={styles.author}>{comment.author}</span>
          <span className={styles.date}>{displayDate}</span>
        </div>
        <div className={styles.actions}>
          {isEditing ? (
            <>
              <button className={styles.saveBtn} onClick={handleSave}>
                Save
              </button>
              <button className={styles.cancelBtn} onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                className={styles.editBtn}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => onDelete(comment.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <textarea
          className={styles.editArea}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <p className={styles.text}>{comment.text}</p>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className={styles.replies}>
          {comment.replies.map(reply => (
            <CommentCard
                      key={reply.id}
                      comment={reply}
                      onEdit={onEdit}
                      onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {comment.image && (
        <img
          className={styles.image}
          src={comment.image}
          alt=""
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}

      <div className={styles.footer}>
        <span className={styles.likes}>&#9650; {comment.likes}</span>
      </div>
    </div>
  );
}

export default CommentCard;
