import './Like.scss';
import React, { useState, useEffect } from 'react';
import { addPh, delPh } from '../../Liked';
import { addPh_S,delPh_S } from '../../Sved';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Liked_Ph = () => {
    const [photos, setPhotos] = useState([]);
    const Ph = useSelector((state) => state.favorit);
    const Sv = useSelector(sv => sv.Save);
    const dispatch = useDispatch();

    const handleLike_Sup = (id) => {
        dispatch(delPh(id));
        toast.warning('Liked Photo deleted')
    }

    const handleSave = (id) => {
        const isIdExists = Sv.some((item) => item === id);
        if (!isIdExists) {
          dispatch(addPh_S(id));
          toast.success('You Saved an Picture');
          console.log("Sv :", Sv);
        }
      };

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const promises = Ph.map(async (photoId) => {
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
    }, [Ph]);

    console.log(photos)

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
            <h1 className='Like_titel'>Pictures Liked</h1>
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
                                <div class="favorites">
                                    <span class="material-symbols-outlined" onClick={()=> handleSave(item.id)}>bookmark</span>
                                    <span class="material-symbols-outlined" onClick={()=> handleLike_Sup(item.id)}>delete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

<ToastContainer />
            </div>
        </>
    );
};

export default Liked_Ph;
