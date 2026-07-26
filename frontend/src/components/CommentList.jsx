import CommentCard from './CommentCard';
import styles from './CommentList.module.css';

const CommentList = ({ comments, onEdit, onDelete }) => {
  if (comments.length === 0) {
    return <p className={styles.empty}>No comments yet. Be the first!</p>;
  }

  return (
    <div className={styles.list}>
      {comments.map((c) => (
        <CommentCard
          key={c.id}
          comment={c}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default CommentList;
