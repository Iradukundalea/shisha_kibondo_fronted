import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import authreducer from "./reducers/AuthReducer";
import thunk from "redux-thunk";
import advisorReducer from "./reducers/AdvisorReducer"
import nurseReducer from "./reducers/NurseReducer";
import beneficialReducer from "./reducers/BeneficialReducer"
import ubudeheReducer from "./reducers/UbudeheReducer";
import userReducer from './reducers/UserReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authState: authreducer,
  advisorState: advisorReducer,
  nurseState: nurseReducer,
  beneficialState: beneficialReducer,
  ubudeheState: ubudeheReducer,
  userState: userReducer,

});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
