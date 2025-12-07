const extensionToTypeMap = {
  // JavaScript/TypeScript
  js: 'javascript',
  ts: 'typescript',
  jsx: 'javascript',
  tsx: 'typescript',
  
  // Styles
  css: 'css',
  scss: 'scss',
  sass: 'scss',
  
  // Web/Config
  html: 'html',
  json: 'json',
  
  // Documents
//   md: 'markdown',
//   txt: 'text',
}

export const extensionToFileType = (extension) => {
  if (!extension) return undefined
  
  const normalized = extension.toLowerCase().trim()
  return extensionToTypeMap[normalized] || undefined
}