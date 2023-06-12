import { PayloadAction, createAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import {
  PlaceModel,
  setPlacePredictionList,
  setSelectedPlace,
} from "../slice/MapFInder.reducer";

export function* getPlacesPredictionList(action: PayloadAction<PlaceModel[]>) {
  try {
    yield put(setPlacePredictionList(action.payload));
  } catch (e) {
    // set error handling here
  }
}

export function* saveSelectedPlace(action: PayloadAction<PlaceModel>) {
  try {
    yield put(setSelectedPlace(action.payload));
  } catch (e) {
    // set error handling here
  } finally {
    // reset prediction list after place selected
    yield put(setPlacePredictionList([]));
  }
}

export function* MapFinderSaga() {
  yield takeEvery(getPlacesPredictionListAction.type, getPlacesPredictionList);
  yield takeEvery(saveSelectedPlaceAction.type, saveSelectedPlace);
}

export const getPlacesPredictionListAction = createAction<PlaceModel[]>(
  "getPlacesPredictionListAction"
);
export const saveSelectedPlaceAction = createAction<PlaceModel>(
  "saveSelectedPlaceAction"
);

export default MapFinderSaga;
