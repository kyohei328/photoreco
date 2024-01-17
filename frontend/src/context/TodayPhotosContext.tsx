import { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios';

const ImageContext = createContext();

export const ImageContextProvider = ({ children }) => {

  const [currentDate, setCurrentDate ] = useState(new Date());
  const [images, setImages] = useState([]);

  useEffect(() => {
    getPhotos();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = new Date();
      if (
        newDate.getFullYear() !== currentDate.getFullYear() ||
        newDate.getMonth() !== currentDate.getMonth() ||
        // newDate.getDate() !== currentDate.getDate() ||
        newDate.getDate() !== currentDate.getDate() 
        // newDate.getMinutes() !== currentDate.getMinutes()
      ) {
        setCurrentDate(newDate);

        getPhotos();
      }
    }, 600000); //1分ごとに更新
    return () => clearInterval(intervalId);
  },[currentDate]);


  const getPhotos = async () => {
    try {
      const resp = await axios.get(`${import.meta.env.VITE_BASE_URL}/top`, {
        headers: {'LastRequestDate': currentDate.toISOString(),},
        });
        setImages(resp.data.today_photos);
      }catch(error) {
        console.log('エラー:', error);
        console.log('エラーコード:', (error as any).code);
        console.log('エラーメッセージ:', (error as any).message);
      }
  };

  return (
    <ImageContext.Provider value={{ images }}>
      {children}
    </ImageContext.Provider>
  )
};

export const useImage = () => {
  return useContext(ImageContext);
};