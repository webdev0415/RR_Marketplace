export const initialState = {
  carState: {
    loading: true,
    internalLoad: false,
    error: undefined,
    car: {},
    property: {},
    selectedCar: null,
    currentCar: null,
  },
  modalState: {
    isOpen: false,
    type: null,
    step: null,
  },
  authState: {
    loading: true,
    error: undefined,
    user: {},
    isLoggedIn: false,
    isMetaMaskLoggedIn: false,
  },
  coingState: {
    loading: true,
    error: undefined,
    balances: {},
  },
  carsState: {
    loading: true,
    internalLoad: false,
    error: undefined,
    property: {},
    selectedCar: null,
    cars: {},
    currentCar: null,
  },
  activities: {
    loading: true,
    error: undefined,
    entities: [],
  },
  assets: {
    loading: true,
    error: undefined,
    stations: [],
  },
  shops: {
    loading: true,
    error: undefined,
    shops: [],
  },
  lands: {
    loading: true,
    error: undefined,
    lands: [],
  },
  marketPlaceState: {
    loading: false,
    buyLoading: false, // TODO: REMOVE buyloading
    addingToCart: {},
    payLoading: false,
    deleteLoading: false,
    paidStatus: {},
    assetStatus: {},
    error: undefined,
    cart: {},
  },
  settingsState: {
    loading: false,
    error: undefined,
    settings: {},
  },
}
