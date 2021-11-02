import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import './ImageGallery.css';

import { Button } from '..';
import { LoaderComponent } from '..';
import { ImageGalleryItem } from '..';
import { Modal } from '..';

// import { PixabayApi } from '../../services';
import { PexelsApi } from '../../services';

// const pixabayApi = new PixabayApi();
const pexelsApi = new PexelsApi();

// state machine
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export function ImageGallery({ searchQuery }) {
  const [status, setStatus] = useState(Status.IDLE);
  const [imageArray, setImageArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  // pexels
  const renderImages = useCallback(() => {
    try {
      pexelsApi.fetchImages().then(fetchedImages => {
        // alert on empty arrays
        if (fetchedImages.length === 0) {
          toast.error('Nothing found! Please enter the correct query!');
          return;
        }
        setImageArray(imageArray => [...imageArray, ...fetchedImages]);

        // smooth scrolling
        smoothScrolling();
      });
    } catch (error) {
      console.log(
        "Okay, Houston, we've got a problem in fetchImages: ",
        error.message,
      );
    }
  }, []);

  // XXX Pixabay - currently not available
  // const renderImages = useCallback(() => {
  //   try {
  //     pixabayApi.fetchImages().then(fetchedImages => {
  //       // alert on empty arrays
  //       if (fetchedImages?.hits?.length === 0) {
  //         toast.error('Nothing found! Please enter the correct query!');
  //         return;
  //       }

  //       setImageArray(imageArray => [...imageArray, ...fetchedImages?.hits]);
  //       // smooth scrolling
  //       smoothScrolling();
  //     });
  //   } catch (error) {
  //     console.log(
  //       "Okay, Houston, we've got a problem in fetchImages: ",
  //       error.message,
  //     );
  //   }
  // }, []);

  // function to handle clicks on image
  const imageClickHandler = (url, alt) => {
    setLargeImageUrl(url);
    setImageAlt(alt);

    toggleModal();
  };

  // function to toggle modal
  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  // function to handle clicks on load more
  const loadMoreBtnClickHandler = () => {
    try {
      pexelsApi.page += 1;
      renderImages();
    } catch (error) {
      setStatus(Status.REJECTED);
      console.log("Okay, Houston, we've got a problem here:", error.message);
    }
  };

  // smooth scrolling to the downloaded images
  const smoothScrolling = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  // useEffect to track changes on search query
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    console.log('обновился запрос');
    console.log(searchQuery);

    setStatus(Status.PENDING);
    try {
      setImageArray([]);
      pexelsApi.page = 1;
      pexelsApi.query = searchQuery;
      renderImages();
      setStatus(Status.RESOLVED);
    } catch (error) {
      setStatus(Status.REJECTED);
      console.log(
        "Okay, Houston, we've got a problem in useEffect",
        error.message,
      );
    }
  }, [renderImages, searchQuery]);

  switch (status) {
    case 'idle':
      return null;
    case 'pending':
      return (
        <div className="LoaderWrap">
          <LoaderComponent />
        </div>
      );
    case 'resolved':
      return (
        <>
          <ul className="ImageGallery">
            {imageArray.map(({ id, src: { large, medium }, photographer }) => {
              return (
                <li key={id} className="ImageGalleryItem">
                  <ImageGalleryItem
                    largeImageUrl={large}
                    smallImageUrl={medium}
                    imgDescription={photographer}
                    onImageClick={imageClickHandler}
                  />
                </li>
              );
            })}
          </ul>
          {showModal && (
            <Modal
              alt={imageAlt}
              url={largeImageUrl}
              onClose={toggleModal}
              imageArray={imageArray}
            />
          )}
          {imageArray.length !== 0 && (
            <div className="ButtonWrap">
              <Button onClick={loadMoreBtnClickHandler} />
            </div>
          )}
        </>
      );
    case 'rejected':
      return null;
    default:
      return;
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
