import { useState } from 'react'

export default function PostForm({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      alert('제목을 입력해 주세요.')
      return
    }
    if (!content.trim()) {
      alert('내용을 입력해 주세요.')
      return
    }
    onSubmit({ title, author, content })
  }

  return (
    <div className="card">
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">제목</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            maxLength={100}
            autoFocus
          />
        </div>

        <div className="field">
          <label htmlFor="author">작성자</label>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="이름 (비우면 '익명')"
            maxLength={20}
          />
        </div>

        <div className="field">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-ghost" onClick={onCancel}>
            취소
          </button>
          <button type="submit" className="btn-primary">
            등록
          </button>
        </div>
      </form>
    </div>
  )
}
