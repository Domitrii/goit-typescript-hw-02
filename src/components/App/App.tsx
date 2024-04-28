import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { Image, fetchPhotosResponse } from "./App.types";
import ApiService from "../APIServices/photos";
import Error from "../ErrorMessage/ErrorMessage";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorName, setErrorName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalUrl, setModalUrl] = useState<string>("");
  const [modalAlt, setModalAlt] = useState<string>("");

  const onSetQueryValue = (queryValue: string) => {
    if (queryValue === query) {
      return;
    }
    setQuery(queryValue);
    setImages([]);
    setPage(1);
    setIsError(false);
    setIsVisible(false);
  };

  useEffect(() => {
    if (query === null) {
      return;
    }
    const getPhotosByQuery = async () => {
      setIsLoading(true);
      try {
        const { results, total_pages } = await ApiService<fetchPhotosResponse>(
          query,
          page
        );
        if (results.length === 0) {
          return;
        }
        setImages((prevState) => [...prevState, ...results]);
        setIsVisible(page < total_pages);
      } catch (error: any) {
        setIsError(true);
        setErrorName(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getPhotosByQuery();
  }, [query, page]);

  const loadMore = () => {
    setPage((prevState) => prevState + 1);
  };

  const handleOpen = (url: string, alt: string) => {
    setShowModal(true);
    setModalUrl(url);
    setModalAlt(alt);
  };
  const handleClose = () => {
    setShowModal(false);
    setModalUrl("");
    setModalAlt("");
  };

  return (
    <>
      <SearchBar onSubmit={onSetQueryValue} />
      {isError && <Error errorName={errorName} />}
      {images.length > 0 && (
        <ImageGallery items={images} onSelect={handleOpen} />
      )}
      {isVisible && <LoadMoreBtn onClick={loadMore} isLoading={isLoading} />}
      {isLoading && <Loader />}
      <ImageModal
        modalIsOpen={showModal}
        closeModal={handleClose}
        src={modalUrl}
        alt={modalAlt}
      />
    </>
  );
}

export default App;