import './save.scss';
import React, { useState, useEffect } from 'react';
import { delPh_S } from '../../Sved';
import { addPh } from '../../Liked';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Save_Ph = ({User}) => {
    const [photos, setPhotos] = useState([]);
    const Sv = useSelector(sv => sv.Save);
    const Ph = useSelector((state) => state.favorit);

    const dispatch = useDispatch();

    const handlesave_sup = (id) => {
        dispatch(delPh_S(id));
        toast.warning('saved Photo deleted')
    }

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const promises = Sv.map(async (photoId) => {
                    const response = await fetch(
                        `https://api.unsplash.com/photos/${photoId}?client_id=bW6MP1c4Q3UQGMybEHcOhRfSkshhchs4Hn-0xLew3pE`
                    );
                    const data = await response.json();
                    return data;
                });

                const photosData = await Promise.all(promises);
                setPhotos(photosData);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, [Sv]);

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

      const handleLike = (id) => {
        const isIdExists = Ph.some((item) => item === id);
        if (!isIdExists) {
          dispatch(addPh(id));
          toast.success('You liked the picture');
          console.log(Ph);
        }
      };

    return (
        <>
            <h1 className='Like_titel'>Pictures Saved</h1>
            <div class="container">
                {photos.map((item, index) => (
                    <div class="card">
                        <div class="photo">
                            <button className='download' onClick={() => downloadFile(item.urls.raw)}>
                                <span class="material-symbols-outlined" >
                                    download
                                </span>
                            </button>
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
                                {User ? <>
                                <div class="favorites">
                                    <span class="material-symbols-outlined" onClick={() => handleLike(item.id)}>favorite</span>
                                    <span class="material-symbols-outlined" onClick={() => handlesave_sup(item.id)}>delete</span>
                                </div></> :<></> }
                            </div>
                        </div>
                    </div>
                ))}

                <ToastContainer />
            </div>
        </>
    )
}
export default Save_Ph;