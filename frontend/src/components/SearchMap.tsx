import { useState, useEffect, useMemo } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from 'axios'
import { Text } from '@mantine/core';
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'

const containerStyle = {
  height: "90vh",
  width: "100%",
};

const SearchMap = () => {

  const Styles = ({
    SelectStyles: css({
      '&:hover': {
        fontWeight: 'bold',
      }
    }),
  })

  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [size, setSize] = useState(undefined);
  const [address, setAddress] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [infoWindowIndex, setInfoWindowIndex] = useState(null);

  const markers = images
  .filter(image => image.lat && image.lng)
  .map((image) => ({
    position: {
      lat: image.lat,
      lng: image.lng,
    }
  }));

  const mapCenter = useMemo(() => {
    return {
      lat: 35.681401752872596,
      lng: 139.76714625551327,
    };
  }, []);

  const onMarkerClick = (index) => {
    setInfoWindowIndex(index);
    setInfoWindowOpen(!infoWindowOpen);
  };

  const infoWindowOptions = {
    pixelOffset: size,
  };

  const createOffsetSize = () => {
    if (window.google && window.google.maps) {
      // 正常に読み込まれている場合の処理
      return setSize(new window.google.maps.Size(0, -45));
    } else {
      // APIがまだ読み込まれていない場合の処理
      console.error('Google Maps API is not loaded.');
    }
  };

  useEffect (() => {
    // axios.get('http://localhost:3000/api/v1/photos')
    axios.get(`${import.meta.env.VITE_BASE_URL}/photos`)
    .then(resp => {
      setImages(resp.data.photos);
      console.log(resp.data)
    }).catch(error => {
    console.log('エラー:', error);
    console.log('エラーコード:', error.code);
    console.log('エラーメッセージ:', error.message);
    // alert('エラーが発生しました: ' + error.message);
  })
  },[]);

  console.log(markers)

  return (
    // <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} onLoad={() => {createOffsetSize(), geocoding() }}>
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} onLoad={() => {createOffsetSize() }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={6}
      >
      {markers.map((marker, index) => (
        <div key={index}>
          <Marker position={marker.position} icon={'https://maps.google.com/mapfiles/ms/micons/red-dot.png'} onClick={() => onMarkerClick(index)} />
          {infoWindowOpen && infoWindowIndex === index && (
            <InfoWindow
              position={marker.position}
              options={infoWindowOptions}
              onCloseClick={() => setInfoWindowOpen(false)}
            >
              <Link to={`/photos/${images[infoWindowIndex].id}`} >
                <div className="flex">
                  <img src={images[infoWindowIndex].image_url} alt="Photo" className="h-16"/>
                  <div className="pt-2" >
                    <Text size="sm" className="ml-4">
                      作品名： {images[infoWindowIndex].title}
                    </Text>
                    <Text size="sm" className="ml-4">
                      撮影者： {images[infoWindowIndex].user_name}
                    </Text>
                  </div>
                </div>
              </Link>
            </InfoWindow>
          )}
        </div>
      ))}



      </GoogleMap>
    </LoadScript>
  );
};

export default SearchMap



