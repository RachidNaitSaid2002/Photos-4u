import Nav from './compenents/navbar_compenent/navbar';
import './App.css';
import { useState, useEffect } from 'react';
import { auth } from './compenents/firebase';
import TopH from './compenents/result_compenent/photos';
import Liked_Ph from './compenents/Liked_compenents/Like';
import Save_Ph from './compenents/Sved_compenent/save';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onChangeKeyword = (keyW) => {
    setKeyword(keyW);
  };

  return (
    <>
      <Router>
        {showLoader ? (
          <div className="App">
            <span className="loader"></span>
            <h1>Photos-4U</h1>
          </div>
        ) : null}
        <Nav User={user} chngeKey={onChangeKeyword} />
        <Routes>
          <Route path="/" element={<TopH keyword={keyword} User={user} />} />
          {user ?(
            <>
              <Route path={`/Liked/${user.uid}`} element={<Liked_Ph User={user}/>} />
              <Route path={`/Saved/${user.uid}`} element={<Save_Ph User={user}/>} />
            </>
          )
        :<></>}
        </Routes>
      </Router>
    </>
  );
}

export default App;