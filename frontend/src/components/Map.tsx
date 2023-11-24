import { useState, useEffect, useMemo } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  height: "400px",
  width: "100%",
};

// const markerPosition = {
//   lat: 42.793444,
//   lng: 142.877983,
// };

const Map = (props) => {

  const { photo } = props;
  const [infoWindowOpen, setInfoWindowOpen] = useState(true);
  const [size, setSize] = useState(undefined);
  const [address, setAddress] = useState("");

  console.log(photo)

  const markerPosition = useMemo(() => {
    return {
      lat: photo.gps_latitude,
      lng: photo.gps_longitude,
    };
  }, [photo.gps_latitude, photo.gps_longitude]);

  const onMarkerClick = () => {
    setInfoWindowOpen(!infoWindowOpen);
  };

  const infoWindowOptions = {
    pixelOffset: size,
  };
  // const createOffsetSize = () => {
  //   // return setSize(new window.google.maps.Size(0, -45));
  //   return setSize(new window.google.maps.Size(0, -45));
  // };

  const createOffsetSize = () => {
    if (window.google && window.google.maps) {
      // 正常に読み込まれている場合の処理
      return setSize(new window.google.maps.Size(0, -45));
    } else {
      // APIがまだ読み込まれていない場合の処理
      console.error('Google Maps API is not loaded.');
    }
  };
  const geocoding = () => {
  // 逆ジオコーディングの実行
  if (window.google && window.google.maps) {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = new window.google.maps.LatLng(markerPosition.lat, markerPosition.lng);

    geocoder.geocode({ 'location': latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const formattedAddress = results[0].formatted_address;

          // 「日本、」を含む場合、取り除く
          const cleanedAddress = formattedAddress.replace(/^日本、/, '');

          // 住所を設定
          setAddress(cleanedAddress);
        } else {
          console.error('No results found');
        }
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });
  } else {
    console.error('Google Maps API is not loaded.');
  }
};


  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} onLoad={() => {createOffsetSize(), geocoding() }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
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
              <p>{address}</p>
              <p>
                <a
                  // href="https://www.google.com/maps/dir/?api=1&destination=42.793444,142.877983"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${markerPosition.lat},${markerPosition.lng}`}
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



