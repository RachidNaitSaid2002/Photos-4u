import React, { useState } from 'react';
import './navbar.scss';
import { auth } from '../firebase';
import { signgoogle } from '../firebase';
import { Link } from 'react-router-dom';

const Nav = ({ User, chngeKey }) => {
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState('');

  const handleShow = () => {
    setShow(!show);
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    chngeKey(keyword);
  };

  return (
    <>
      <div className="navbar">
        <div className="brand">Photos-4U</div>
        <div className="midle">
          <div className="input">
            <input
              type="text"
              onChange={handleChange}
              placeholder="Enter Keyword ..."
            />
            <button onClick={handleSearch }>
              {' '}
              <span
                className="material-symbols-outlined"
                style={{ color: '#fff' }}
              >
                search
              </span>
            </button>
          </div>
          <div className="fav">
            <div className="fav_cont">
              <Link to='/'><span class="material-symbols-outlined">home</span></Link> 
              <Link to='/Saved'><span className="material-symbols-outlined">bookmark</span></Link>
              <Link to='/Liked'><span className="material-symbols-outlined">favorite</span></Link> 
            </div>
          </div>
        </div>
        <div className="right">
          <div className="profile">
            {User ? (
              <>
                <span className="profile-email">{User.email} </span>
                <img
                  src={User.photoURL}
                  alt="Profile"
                  className="profile-img"
                  onClick={handleShow}
                />
                {show ? (
                  <div className="dropdown">
                    <button onClick={() => auth.signOut()}>
                      Logout
                      <span className="material-symbols-outlined">logout</span>
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <span
                  className="material-symbols-outlined login"
                  onClick={handleShow}
                >
                  person_add
                </span>
                {show ? (
                  <div className="dropdown">
                    <button onClick={signgoogle}>
                      SignIn with Google{' '}
                      <img
                        src="https://imagepng.org/wp-content/uploads/2019/08/google-icon.png"
                        alt="google"
                      />{' '}
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;