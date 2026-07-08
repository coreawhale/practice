import { useEffect, useState } from 'react'
import PostList from './components/PostList.jsx'
import PostForm from './components/PostForm.jsx'
import PostDetail from './components/PostDetail.jsx'

const STORAGE_KEY = 'practice-board-posts'

// 최초 실행 시 보여줄 샘플 글
const SEED_POSTS = [
  {
    id: 1,
    title: '게시판에 오신 걸 환영합니다 👋',
    author: '관리자',
    content:
      '이 게시판은 React + Vite로 만든 연습용 게시판입니다.\n\n' +
      '- 글쓰기 버튼으로 새 글을 작성할 수 있어요.\n' +
      '- 제목을 클릭하면 상세 내용을 볼 수 있어요.\n' +
      '- 작성한 글은 브라우저(localStorage)에 저장되어 새로고침해도 유지됩니다.',
    createdAt: '2026-07-09T00:00:00.000Z',
    views: 0,
  },
]

// localStorage에서 글 불러오기 (없으면 샘플)
function loadPosts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // 파싱 실패 시 샘플로 초기화
  }
  return SEED_POSTS
}

export default function App() {
  const [posts, setPosts] = useState(loadPosts)
  // view: { name: 'list' } | { name: 'write' } | { name: 'detail', id }
  const [view, setView] = useState({ name: 'list' })

  // 글 목록이 바뀔 때마다 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  }, [posts])

  function handleCreate({ title, author, content }) {
    const newPost = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim() || '익명',
      content: content.trim(),
      createdAt: new Date().toISOString(),
      views: 0,
    }
    setPosts((prev) => [newPost, ...prev])
    setView({ name: 'list' })
  }

  function handleOpen(id) {
    // 조회수 +1
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, views: p.views + 1 } : p))
    )
    setView({ name: 'detail', id })
  }

  function handleDelete(id) {
    setPosts((prev) => prev.filter((p) => p.id !== id))
    setView({ name: 'list' })
  }

  const current =
    view.name === 'detail' ? posts.find((p) => p.id === view.id) : null

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 자유게시판</h1>
        <span className="subtitle">React + Vite</span>
      </header>

      {view.name === 'list' && (
        <PostList
          posts={posts}
          onOpen={handleOpen}
          onWrite={() => setView({ name: 'write' })}
        />
      )}

      {view.name === 'write' && (
        <PostForm
          onSubmit={handleCreate}
          onCancel={() => setView({ name: 'list' })}
        />
      )}

      {view.name === 'detail' &&
        (current ? (
          <PostDetail
            post={current}
            onBack={() => setView({ name: 'list' })}
            onDelete={handleDelete}
          />
        ) : (
          // 글이 삭제된 경우 목록으로
          <PostList
            posts={posts}
            onOpen={handleOpen}
            onWrite={() => setView({ name: 'write' })}
          />
        ))}
    </div>
  )
}
