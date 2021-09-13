import { all } from "redux-saga/effects"

import auth from "./redux/auth/sagas"
import cars from "./redux/cars/sagas"
import car from "./redux/car/sagas"
import assets from "./redux/assets/sagas"
import lands from "./redux/lands/sagas"
import shops from "./redux/shops/sagas"
import marketplace from "./redux/marketplace/sagas"
import settings from "./redux/settings/sagas"
import property from "./redux/property/sagas"
import { activitiesSaga } from "./ducks/activities"

export default function* rootSaga() {
  const sagas = [
    ...auth,
    ...cars,
    ...car,
    ...assets,
    ...lands,
    ...shops,
    ...marketplace,
    ...settings,
    ...activitiesSaga,
    ...property,
  ]
  yield all(sagas)
}
