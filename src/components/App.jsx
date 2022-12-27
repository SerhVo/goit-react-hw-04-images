import React, { useState, useEffect } from 'react';
import { Loader } from "./Loader/Loader";
import { fetchImages } from 'API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
import css from './App.module.css';
import { useToggle } from "../hooks/useToggle";

export const App = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [request, setRequest] = useState('');
    const { isOpen, open, close } = useToggle();
    const [largeImageURL, setLargeImageURL] = useState('');


    useEffect(() => {
        if (!request) {
            return;
        }

        setLoading(true);

        fetchImages(request, page)
            .then(data =>
                setItems((items) => {
                    return [...items, ...data.hits]

                }))
            .catch(error => {
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [page, request]);


    const loadMore = () => {
        setPage(prev => page + 1);
    }


    const handleFormSubmit = request => {
        setPage(1);
        setRequest(request);
        setItems([]);
    };


    const goLargeImg = img => {
        setLargeImageURL(img);
        open();
    };
    // const isItems = Boolean(items.length);
    // console.log(isItems)
    // { items, loading, error, modalOpen, largeImageURL } = isItems;
    const isItems = Boolean(items.length)
    // const { loadMore, handleFormSubmit, modalClose } = [];
    return (

        < div className={css.App} >
            <Searchbar onSubmit={handleFormSubmit} />
            {loading && <Loader />}
            {error && <p>Restart page or modify the request</p>}
            {isItems && <ImageGallery items={items} goLargeImg={goLargeImg} />}
            {isItems && <Button onClick={loadMore} />}
            {isOpen && <Modal largeImageURL={largeImageURL} modalClose={close} />}
        </ div >
    )

};
