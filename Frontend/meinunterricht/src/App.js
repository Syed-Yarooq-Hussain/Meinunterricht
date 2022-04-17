import Navbar from './components/Navbar'
import NotFound from './components/NotFound'
import SearchMovie from './components/SearchMovie'
import MovieDetail from './components/MovieDetail'
import AddMovies from './components/AddMovies'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
       <Navbar/>
    {/*<SearchMovie/> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<SearchMovie/>}/>
          <Route exact path="/detail/:id" element={<MovieDetail/>}/>
          <Route exact path="/add-movies" element={<AddMovies/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </Router>
    </>
  );
}

export default App;
