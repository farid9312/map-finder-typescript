import { Divider } from "antd";
import "./App.css";
import MapView from "./components/MapView.component";
import PlaceAutocompleteInput from "./components/PlaceAutocomplete.component";

function App() {
  return (
    <div className="App">
      <PlaceAutocompleteInput />
      <Divider plain>Map view</Divider>
      <MapView />
    </div>
  );
}

export default App;
