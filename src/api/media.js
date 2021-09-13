import request from "./request"

export const uploadFileApi = (file) => {
  const formData = new FormData()
  formData.append("file", file)

  return request({
    path: "file",
    opts: {
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  })
}
