import './photos.scss';
import React, { useState, useEffect } from 'react';
import { addPh, delPh } from '../../Liked';
import { addPh_S, delPh_S } from '../../Sved';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TopH = ({ keyword,User }) => {
  console.log(keyword);

  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const dispatch = useDispatch();
  const Ph = useSelector(ph => ph.favorit);
  const Sv = useSelector(sv => sv.Save);

  const handleLike = (id) => {
    const isIdExists = Ph.some((item) => item === id);
    if (!isIdExists) {
      dispatch(addPh(id));
      toast.success('You liked the picture');
      console.log(Ph);
    }
  };

  const handleSave = (id) => {
    const isIdExists = Sv.some((item) => item === id);
    if (!isIdExists) {
      dispatch(addPh_S(id));
      toast.success('You Saved a Picture');
      console.log("Sv :", Sv);
    }
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${keyword}&page=${currentPage}&client_id=bW6MP1c4Q3UQGMybEHcOhRfSkshhchs4Hn-0xLew3pE`
        );
        const data = await response.json();
        setPhotos(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    fetchPhotos();
  }, [keyword, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const downloadFile = (path) => {
    const url = path; 
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = 'filename'; 
        a.click();
        URL.revokeObjectURL(downloadUrl);
      });
  }

  return (
    <>
      {keyword ? (
        <>
          <div className='btns'>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <span class="material-symbols-outlined">arrow_back_ios_new</span>
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              <span class="material-symbols-outlined">arrow_forward_ios</span>
            </button>
            <span className='cur'>{currentPage}</span>
          </div>
          <div class="container">
            {photos.map((item, index) => (
              <div class="card">
                <div class="photo">
                  {User
                   ? 
                   <button class="download" onClick={() => downloadFile(item.urls.raw)}>
                   <span class="material-symbols-outlined">
                     download
                   </span>
                 </button>
                 :
                 <></>
                  }
                    
                  <img src={item.urls.regular} alt={item.description} />
                </div>
                <div class="content">
                  <div class="user">
                    <img src={item.user.profile_image.medium} alt={item.user.name} class="user_img" />
                    <span class="user_name">{item.user.username}</span>
                  </div>
                  <div class="details">
                    <div class="likes">
                      <span class="material-symbols-outlined">thumb_up</span>
                      {item.likes}
                    </div>
                    <div class="favorites">
                      <span class="material-symbols-outlined" onClick={() => handleLike(item.id)}>favorite</span>
                      <span class="material-symbols-outlined" onClick={()=> handleSave(item.id) }>bookmark</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
          <ToastContainer />
        </>
      ) : (
        <>
          <div className="loadin">
            <div class="hexagon" aria-label="Animated hexagonal ripples">
              <div class="hexagon__group">
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
              </div>
              <div class="hexagon__group">
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
              </div>
              <div class="hexagon__group">
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
              </div>
              <div class="hexagon__group">
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
              </div>
              <div class="hexagon__group">
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
              </div>
              <div class="hexagon__group">
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
                <div class="hexagon__sector"></div>
              </div>
            </div>
            <h1>Find the Perfect Image, Every Time</h1>
          </div>
        </>
      )}
    </>
  );
};

export default TopH;