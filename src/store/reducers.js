import { combineReducers } from "redux"
import carsReducer from "./redux/cars/reducers"
import carReducer from "./redux/car/reducers"
import modalReducer from "./redux/modal/reducers"
import coinReducer from "./redux/coin/reducers"
import assetsReducer from "./redux/assets/reducers"
import randsReducer from "./redux/lands/reducers"
import shopsReducer from "./redux/shops/reducers"
import auth from "./redux/auth/reducers"
import marketplaceReducer from "./redux/marketplace/reducers"
import settingsReducer from "./redux/settings/reducers"
import propertyReducer from "./redux/property/reducers"
import activitiesReducer from "./ducks/activities"

const rootReducer = combineReducers({
  cars: carsReducer,
  car: carReducer,
  modal: modalReducer,
  coin: coinReducer,
  activities: activitiesReducer,
  assets: assetsReducer,
  lands: randsReducer,
  shops: shopsReducer,
  auth,
  marketplace: marketplaceReducer,
  settings: settingsReducer,
  property: propertyReducer,
})

export default rootReducer
