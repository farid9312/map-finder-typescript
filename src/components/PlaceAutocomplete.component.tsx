import { Typography } from "antd";
import { CSSProperties, useEffect } from "react";
import Autocomplete from "react-google-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { MAP_FINDER } from "../constants/MapFinder.constants";
import { useAppDispatch } from "../redux/hooks";
import {
  getPlacesPredictionListAction,
  saveSelectedPlaceAction,
} from "../redux/sagas/MapFinder.saga";
import { PlaceModel } from "../redux/slice/MapFInder.reducer";

const { Text } = Typography;

const inputStyle: CSSProperties = {
  boxShadow: "inset 0 0 10px #eee !important",
  border: "2px solid #eee",
  width: "456px",
  height: "30px",
  marginLeft: "16px",
  borderRadius: "20px",
  fontWeight: "300 !important",
  outline: "none",
  padding: "10px 20px",
  marginBlock: "10px",
};

const PlaceAutocompleteInput = () => {
  const dispatch = useAppDispatch();

  const { placePredictions, getPlacePredictions } = usePlacesService({
    apiKey: MAP_FINDER.GOOGLE_MAP_API_KEY,
  });

  useEffect(() => {
    if (placePredictions.length) {
      let dataList: PlaceModel[] = [];

      placePredictions.map((place) => {
        dataList.push({
          description: place.description,
          place_id: place.place_id,
          reference: place.place_id,
          types: place.types,
        });
      });

      dispatch(getPlacesPredictionListAction(dataList));
    }
  }, [placePredictions]);

  const onPlaceSelected = (place: google.maps.places.PlaceResult) => {
    const placeData: PlaceModel = {
      description: place?.formatted_address ?? "",
      place_id: place?.place_id ?? "",
      reference: place?.place_id ?? "",
      types: place?.types ?? [],
      geoLocation: {
        lat: place.geometry?.location?.lat() ?? -33.867,
        lng: place.geometry?.location?.lng() ?? 151.195,
      },
    };

    dispatch(saveSelectedPlaceAction(placeData));
  };

  return (
    <div className="row mt-3">
      <div className="col-6 offset-3">
        <Text type="secondary">Enter Location</Text>
        <Autocomplete
          className={"Map-autocomplete"}
          apiKey={MAP_FINDER.GOOGLE_MAP_API_KEY}
          placeholder={"Search location..."}
          style={inputStyle}
          onPlaceSelected={(place) => onPlaceSelected(place)}
          onChange={(evt) =>
            getPlacePredictions({ input: evt.currentTarget.value })
          }
        />
      </div>
    </div>
  );
};

export default PlaceAutocompleteInput;
