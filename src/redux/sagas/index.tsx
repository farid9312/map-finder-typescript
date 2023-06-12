import { all } from "redux-saga/effects";
import MapFinderSaga from "./MapFinder.saga";

function* rootSaga() {
  yield all([MapFinderSaga()]);
}

export default rootSaga;
