import ImagePreview from './components/ImagePreview';
import ImageEditor from './components/ImageEditor';
import Login from "./components/login/Login";
import SignUp from "./components/SignUp";
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Notes from './components/notes/Notes';
import Home from './components/home/Home';
import Top from './components/elements/Top';

function App() {

  const [selectedImage, setSelectedImage] = useState("")



  return (
    <>
      {/* {condition ? true : false} */}

      <Routes>

        <Route path='/' element={<Home />} />

        {/* <Route path='/images' element={
          selectedImage === "" ?
            <ImagePreview setSelectedImage={setSelectedImage} />
            : <ImageEditor selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        } /> */}

        <Route path="/images" element={<ImagePreview setSelectedImage={setSelectedImage} />} />
        <Route path="/imageEditor" element={<ImageEditor setSelectedImage={setSelectedImage} selectedImage={selectedImage} />} />

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/notes' element={<Notes />} />

      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
