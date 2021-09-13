import request from "api/request"

const updateCarName = async (carId, carName, cb) => {
  const result = await request({
    path: `cars/c/${carId}`,
    opts: {
      method: "PUT",
      data: {
        id: carId,
        name: carName,
      },
    },
  })

  cb(result)
}

export default updateCarName
