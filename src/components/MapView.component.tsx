import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";

const mapStyle: CSSProperties = {
  height: "500px",
  width: "80%",
  alignItems: "center",
  justifyContent: "center",
  marginInline: 100,
};

const MapView = () => {
  const DEFAULT_ZOOM = 5;
  const DEFAULT_LOCATION = {
    lat: -33.867,
    lng: 151.195,
  };

  const geoLocation = useAppSelector(
    (state) => state.placeState.selectedPlace?.geoLocation ?? DEFAULT_LOCATION
  );

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(geoLocation);

  useEffect(() => setMarkerPosition(geoLocation), []);

  const onLoad = useCallback(
    (map: any) => {
      setTimeout(() => {
        map.setZoom(DEFAULT_ZOOM);
      }, 300);
      setMap(map);
    },
    [geoLocation]
  );

  const onLoadMarker = useCallback(
    () => setTimeout(() => setMarkerPosition(geoLocation), 300),
    [geoLocation]
  );

  const onUnmount = useCallback(() => {
    setMap(map);
  }, []);

  const handelClickOnMap = () => {};
  return (
    <div>
      <GoogleMap
        onLoad={onLoad}
        center={geoLocation}
        zoom={DEFAULT_ZOOM}
        mapContainerStyle={mapStyle}
        onClick={handelClickOnMap}
        onUnmount={onUnmount}
      >
        <MarkerF position={markerPosition} onPositionChanged={onLoadMarker} />
      </GoogleMap>
    </div>
  );
};

export default MapView;
