function formatDate(iso) {
  const d = new Date(iso)
  const yy = String(d.getFullYear()).slice(2)
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yy}.${mm}.${dd}`
}

export default function PostList({ posts, onOpen, onWrite }) {
  return (
    <>
      <div className="list-toolbar">
        <span className="count">전체 {posts.length}개</span>
        <button className="btn-primary" onClick={onWrite}>
          글쓰기
        </button>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th className="col-no">번호</th>
              <th>제목</th>
              <th className="col-meta">작성자</th>
              <th className="col-meta">날짜</th>
              <th className="col-meta">조회</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty">
                  아직 글이 없습니다. 첫 글을 작성해 보세요!
                </td>
              </tr>
            ) : (
              posts.map((post, i) => (
                <tr
                  key={post.id}
                  className="clickable"
                  onClick={() => onOpen(post.id)}
                >
                  <td className="col-no">{posts.length - i}</td>
                  <td className="post-title">{post.title}</td>
                  <td className="col-meta">{post.author}</td>
                  <td className="col-meta">{formatDate(post.createdAt)}</td>
                  <td className="col-meta">{post.views}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
