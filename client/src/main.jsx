import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from './app/store'
import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Upload from './components/Upload'
import SecureUpload from './components/SecureUpload'
import AudioUpload from './components/UploadAudio.jsx'
import EditAudio from './components/EditAudio.jsx'
import DisplayAudio from './components/DisplayAudio.jsx'
import MainLayout from './components/MainLayout.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Home from './components/Home.jsx'
import About from './components/About.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>  
        <Route path="upload" element={<Upload />}> </Route>
        <Route path="secure-upload" element={<SecureUpload />}> </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" index element={<Home/>}/>
        <Route path="/about" index element={<About/>}/>

        {/* PROTECTED ROUTES */}
        <Route path="" element={<PrivateRoute/>}> 
            <Route path="audio-upload" element={<AudioUpload/>}></Route>
            <Route path="/update/:id" element={<EditAudio />} />
            <Route index element={<DisplayAudio/>}/>  
        </Route>
      
      </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <Provider store={store}>  
          <RouterProvider router={router} />
    </Provider>
  </StrictMode>
 
);








// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { Provider } from 'react-redux'
// import {store} from './app/store'
// import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
// import Upload from './components/Upload'
// import SecureUpload from './components/SecureUpload'
// import AudioUpload from './components/UploadAudio.jsx'
// import EditAudio from './components/EditAudio.jsx'


// const router = createBrowserRouter(
//   createRoutesFromElements(
//       <Route path="/" element={<App />}>  
//         <Route path="upload" element={<Upload />}> </Route>
//         <Route path="secure-upload" element={<SecureUpload />}> </Route>
//         <Route path="audio-upload" element={<AudioUpload/>}></Route>
//         <Route path="/update/:id" element={<EditAudio />} />

//       </Route>
//   )
// )

// createRoot(document.getElementById('root')).render(
//   <StrictMode> 
//     <Provider store={store}>  
//           <RouterProvider router={router} />
//     </Provider>
//   </StrictMode>
 
// );