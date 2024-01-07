import { useEffect, useState } from 'react';
import { Hourglass } from 'react-loader-spinner';

import * as ImageService from 'service/image-service';
import {
  Button,
  SearchForm,
  Text,
  GalleryList,
  Modal,
  Wrapper,
} from 'components';

import React from 'react';

export const Gallery = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [randomId, setRandomId] = useState(0);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [alt, setAlt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function addGallery() {
      try {
        setShowLoader(true);
        const { photos, total_results } = await ImageService.getImages(
          query,
          page
        );
        if (photos.length === 0) {
          setIsEmpty(true);
          return;
        }
        setPhotos(prevPhotos => [...prevPhotos, ...photos]);
        setIsLoadMore(page < Math.ceil(total_results / 15));
      } catch (error) {
        setError(error.message);
        return;
      } finally {
        setShowLoader(false);
      }
    }
    addGallery();
  }, [query, page, randomId]);

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setPhotos([]);
    setIsLoadMore(false);
    setRandomId(Math.random());
    setIsEmpty(false);
  };
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = (largeImageURL, alt) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setAlt(alt);
  };

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      {photos.length > 0 && (
        <GalleryList photos={photos} onModalClick={openModal} />
      )}
      {isLoadMore && (
        <Button type="button" onClick={handleLoadMore}>
          Load more
        </Button>
      )}
      {showLoader && (
        <Wrapper>
          <Hourglass
            visible={true}
            height="50"
            width="50"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#49a09d', '#fff']}
          />
        </Wrapper>
      )}
      {showModal && (
        <Modal src={largeImageURL} alt={alt} onCloseModal={closeModal} />
      )}
      {error && <Text textAlign="center">Sorry. {error} 😭</Text>}
      {isEmpty && (
        <Text textAlign="center">Sorry. There are no images... 😭</Text>
      )}
    </>
  );
};
