import React, { useEffect } from 'react'

function NotFoundPage() {
  useEffect(() => {
    document.title = "Not Found | Curly Haired Escapade"
  }, [])

  return (
    <div className="page">
      <h1 className="not-found">Page not found</h1>
    </div>
  )
}

export default NotFoundPage;