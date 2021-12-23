import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authReducer from "./auth";
import assignmentReducer from "./assignment";
import quizReducer from "./quiz";
import courseReducer from "./course";
import { persistStore, persistReducer } from "redux-persist";

// const rootReducer = combineReducers({
//   auth: authReducer,
//   assignment: assignmentReducer
// });

const persistConfig = {
  key: "root",
  storage: AsyncStorage
  // whitelist: ["bookmarks"]
};

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  assignment: persistReducer(persistConfig, assignmentReducer),
  quiz: persistReducer(persistConfig, quizReducer),
  course: persistReducer(persistConfig, courseReducer)
});

export default rootReducer;
