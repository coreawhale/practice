function formatDateTime(iso) {
  const d = new Date(iso)
  const yy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mi = String(d.getMinutes()).padStart(2, '0')
  return `${yy}.${mm}.${dd} ${hh}:${mi}`
}

export default function PostDetail({ post, onBack, onDelete }) {
  function handleDelete() {
    if (window.confirm('이 글을 삭제할까요?')) {
      onDelete(post.id)
    }
  }

  return (
    <div className="card">
      <article className="detail">
        <h2>{post.title}</h2>
        <div className="detail-meta">
          <span>작성자 {post.author}</span>
          <span>{formatDateTime(post.createdAt)}</span>
          <span>조회 {post.views}</span>
        </div>
        <div className="detail-body">{post.content}</div>

        <div className="detail-actions">
          <button className="btn-ghost" onClick={onBack}>
            ← 목록
          </button>
          <button className="btn-danger" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </article>
    </div>
  )
}
