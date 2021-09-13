export const getFileExt = (filename) => {
  const ext = /^.+\.([^.]+)$/.exec(filename)
  return ext == null ? "" : ext[1]
}
