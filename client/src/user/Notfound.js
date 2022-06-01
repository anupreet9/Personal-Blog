import React, { useEffect } from 'react'

function NotFoundPage() {
  useEffect(() => {
    document.title = "Page Not Found | Curly Haired Escapade"
  }, [])

  return (
    <div className="page">
      <h2 className="not-found">Page not found!</h2>
    </div>
  )
}

export default NotFoundPage;