import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  height: "400px",
  width: "100%",
};

const center = {
  lat: 42.793444,
  lng: 142.877983,
};

const markerPosition = {
  lat: 42.793444,
  lng: 142.877983,
};

const Map = () => {
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);
  const [size, setSize] = useState(undefined);

  const onMarkerClick = () => {
    setInfoWindowOpen(!infoWindowOpen);
  };

  const infoWindowOptions = {
    pixelOffset: size,
  };
  const createOffsetSize = () => {
    // return setSize(new window.google.maps.Size(0, -45));
    return setSize(new window.google.maps.Size(0, -45));
  };


  return (
    <LoadScript googleMapsApiKey="" onLoad={() => createOffsetSize()}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={markerPosition} onClick={onMarkerClick} />

        {infoWindowOpen && (
          <InfoWindow
            position={markerPosition}
            options={infoWindowOptions}
            onCloseClick={() => setInfoWindowOpen(false)}
          >
            <div>
              <p>42°47'36.4"N 142°52'41.5"E</p>
              <p>〒082-0383 北海道河西郡芽室町伏美２６線</p>
              <p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=42.793444,142.877983"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ルート検索
                </a>
              </p>
              <p>
                <a
                  href={`https://www.google.com/maps?q=${markerPosition.lat},${markerPosition.lng}&ll=${markerPosition.lat},${markerPosition.lng}&z=15`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  拡大地図を表示
                </a>
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;



