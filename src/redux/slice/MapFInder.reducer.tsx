import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlaceModel {
  description: string;
  place_id: string;
  reference: string;
  types: string[];
  geoLocation?: {
    lat: number;
    lng: number;
  };
}

interface MapFinderReducerModel {
  placePredictionList: PlaceModel[];
  selectedPlace: PlaceModel | null;
}

const initialState: MapFinderReducerModel = {
  placePredictionList: [],
  selectedPlace: null,
};

const mapFinder = createSlice({
  name: "mapFinder",
  initialState: initialState,
  reducers: {
    setPlacePredictionList: (state, action: PayloadAction<PlaceModel[]>) => {
      state.placePredictionList = action.payload;
    },
    setSelectedPlace: (state, action: PayloadAction<PlaceModel>) => {
      state.selectedPlace = action.payload;
    },
  },
});

export const mapFinderReducer = mapFinder.reducer;

export const { setPlacePredictionList, setSelectedPlace } = mapFinder.actions;
