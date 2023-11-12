import React, { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios';

const ImageContext = createContext();

export const ImageContextProvider = ({ children }) => {

  // const [currentDate, setCurrentDate ] = useState(new Date());
  // const [images, setImages] = useState([]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const newDate = new Date();
  //     if (
  //       newDate.getFullYear() !== currentDate.getFullYear() ||
  //       newDate.getMonth() !== currentDate.getMonth() ||
  //       newDate.getDate() !== currentDate.getDate()
  //     ) {
  //       setCurrentDate(newDate);
  //     }
  //     console.log(`サイトDate: ${currentDate}`);
  //     console.log(`取得Date: ${newDate}`);
  //   }, 60000); //1分ごとに更新
  //   return () => clearInterval(intervalId);
  // },[]);
  

  // useEffect(() => {
  //   axios.get('http://localhost:3000/api/v1/top')
  //   .then(resp => {
  //     console.log(resp);
  //     setImages(resp.data.today_photos);
  //     console.log(images);
  //   }).catch(error => {
  //     console.log('エラー:', error);
  //     console.log('エラーコード:', error.code);
  //     console.log('エラーメッセージ:', error.message);
  //     // alert('エラーが発生しました: ' + error.message);
  //   })
  // }, [currentDate]);

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
      console.log(`サイトDate: ${currentDate}`);
      console.log(`取得Date: ${newDate}`);
    }, 600000); //1分ごとに更新
    return () => clearInterval(intervalId);
  },[currentDate]);


  const getPhotos = async () => {
    try {
      const resp = await axios.get('http://localhost:3000/api/v1/top', {
        headers: {'LastRequestDate': currentDate.toISOString(),},
        });
        setImages(resp.data.today_photos);
        console.log(images);
      }catch(error) {
        console.log('エラー:', error);
        console.log('エラーコード:', error.code);
        console.log('エラーメッセージ:', error.message);
        // alert('エラーが発生しました: ' + error.message);
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