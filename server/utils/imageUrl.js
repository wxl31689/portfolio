function getRequestOrigin(req) {
  return `${req.protocol}://${req.get('host')}`
}

function normalizeImageUrl(image, req) {
  if (!image) {
    return ''
  }

  const origin = getRequestOrigin(req)
  const value = String(image).trim()

  if (value.startsWith('/uploads/')) {
    return origin + value
  }

  try {
    const parsed = new URL(value)

    if (parsed.pathname.startsWith('/uploads/')) {
      return origin + parsed.pathname
    }
  } catch (err) {
    // Keep non-URL values unchanged.
  }

  return value
}

function normalizeDishImages(rows, req) {
  return rows.map(row => ({
    ...row,
    image: normalizeImageUrl(row.image, req)
  }))
}

module.exports = {
  normalizeImageUrl,
  normalizeDishImages
}
