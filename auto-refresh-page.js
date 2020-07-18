if (typeof document.hidden !== 'undefined') {
  hidden = 'hidden'
  visibilityChange = 'visibilitychange'
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden'
  visibilityChange = 'msvisibilitychange'
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden'
  visibilityChange = 'webkitvisibilitychange'
}
function refresh_page() {
  if (document[hidden]) {
    setInterval(function() {
      location.reload()
    }, 600000)
  }
}
refresh_page()
if (typeof document.addEventListener !== 'undefined' || hidden !== undefined) {
  document.addEventListener(visibilityChange, refresh_page, false)
}
