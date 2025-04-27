import { useEffect, useRef, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { addSongRequest, fetchSongsRequest, playSong } from './features/musicSlice'
import Demo from './Demo';
import Dan from './Dan';
import {Outlet, Link} from 'react-router-dom'
import Navbar from './Navbar';
function App() {

  return (
    <div className="flex flex-col h-screen">
    {/* Top Navbar */}
    <Navbar />

    {/* Main layout with sidebar + page content */}
    <div className="flex flex-1">
      {/* Sidebar width is handled inside Navbar (if it's included there) */}
      {/* You can move Sidebar here if it's not inside Navbar */}

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <Outlet />
        </div>
      </div>
    </div>
  </div>

  )
}

export default App













// import { useEffect, useRef, useState } from 'react'
// import './App.css'
// import { useDispatch, useSelector } from 'react-redux'
// import { addSongRequest, fetchSongsRequest, playSong } from './features/musicSlice'
// import Demo from './Demo';
// import Dan from './Dan';
// import {Outlet, Link} from 'react-router-dom'
// function App() {
// // ( const {currDemo} = useSelector(state=>state.demo)
// //   const dispatch = useDispatch();
// //   const {songs,isLoading,error,currentSong}  = useSelector((state)=> state.music)
// //   const audioRef = useRef(null);

// //   const [songData, setSongData] = useState({
// //     title: "",
// //     artist: "",
// //     url: "",
// //   });

// //   useEffect(()=>{
// //     dispatch(fetchSongsRequest());
// //   },[dispatch])  


// //   useEffect(() => {
// //     if (currentSong && audioRef.current) {
// //       audioRef.current.play();
// //     }
// //   }, [currentSong]);

// //   const handleInputChange = (e) => {
// //     setSongData({ ...songData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     dispatch(addSongRequest(songData));
// //     setSongData({ title: "", artist: "", url: "" });
// //   };)

//   return (
// //   <div className="">
// //     <div>
// //     <h1>Music Player</h1>
// //     <form onSubmit={handleSubmit}>
// //         <input type="text" name="title" placeholder="Song Title" value={songData.title} onChange={handleInputChange} required />
// //         <input type="text" name="artist" placeholder="Artist" value={songData.artist} onChange={handleInputChange} required />
// //         <input type="text" name="url" placeholder="Song URL" value={songData.url} onChange={handleInputChange} required />
// //         <button type="submit">Add Song</button>
// //       </form>

// //       {isLoading && <p>Loading...</p>}
// //       {error && <p>Error: {error}</p>}

// //       <ul>
// //         {songs.length > 0 ? (
// //           songs.map((song) => (
// //             <li key={song._id}>
// //               {song.title} - {song.artist}
// //               <button onClick={() => dispatch(playSong(song))}>▶ Play</button>
// //             </li>
// //           ))
// //         ) : (
// //           <p>No songs available</p>
// //         )}
// //       </ul>

// //       {currentSong && (
// //         <audio ref={audioRef} controls src={currentSong.url}>
// //           Your browser does not support the audio tag.
// //         </audio>
// //       )}
// //   </div>

// //   <div className=''> 

// // <h2>this is from our app.jsx {currDemo}</h2>
    
// //         <Dan></Dan>
// //   </div>

      
// //   </div>
// <div className="App"> 
//   <h1>upload files cloudinary </h1>
//   <Link to="/">  
//       Home
//   </Link>
//   <Link to="/upload">  
//       Upload
//   </Link>
//   <Link to="secure-upload">  
//       Secure Upload
//   </Link>
//   <Link to="/audio-upload"> 
//       Audio Upload
//   </Link>

  

//   <br />
//   <br />
//   <Outlet/>
// </div>
//   )
// }

// export default App
