import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authreducer from "./reducers/AuthReducer";
import thunk from "redux-thunk";
import advisorReducer from "./reducers/AdvisorReducer"
import nurseReducer from "./reducers/NurseReducer";
import beneficialReducer from "./reducers/BeneficialReducer"
import ubudeheReducer from "./reducers/UbudeheReducer";
import userReducer from './reducers/UserReducer'
import takeUpReducer from "./reducers/TakingUpReducer";
import productReducer from "./reducers/productReducer";
import notificationReducer from "./reducers/NotificationReducer";
import passwordResetReducer from "./reducers/PasswordResetReducer"
import stockInReducer from "./reducers/StockInReducer";
import AppointmentReducer from './reducers/AppointmentReducer'
import statisticsReducer from './reducers/statisticsReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authState: authreducer,
  advisorState: advisorReducer,
  nurseState: nurseReducer,
  beneficialState: beneficialReducer,
  ubudeheState: ubudeheReducer,
  userState: userReducer,
  takeUpState: takeUpReducer,
  productState: productReducer,
  notifications: notificationReducer,
  passwordReset: passwordResetReducer,
  stock: stockInReducer,
  appointments: AppointmentReducer,
  statistics: statisticsReducer,

});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
