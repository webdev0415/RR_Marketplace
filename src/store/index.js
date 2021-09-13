import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
// import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension"
import reducer from "./reducers"
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

sagaMiddleware.run(rootSaga)

const rootStore = { store }
export default rootStore
