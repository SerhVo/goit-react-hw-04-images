import { Component } from "react";
import { Loader } from "./Loader/Loader";
import { fetchImages } from 'API';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
import css from './App.module.css';

export class App extends Component {
    state = {
        items: [],
        loading: false,
        error: null,
        page: 1,
        request: '',
        modalOpen: false,
        largeImageURL: '',
    }

    componentDidUpdate(_, prevState) {
        const { page, request } = this.state;
        if (prevState.page !== page || prevState.request !== request) {
            this.setState({ loading: true });
            fetchImages(request, page)
            .then(data =>
                this.setState(({items}) => {
                    return {
                        items: [...items, ...data.hits]
                    }
                }))
            .catch(error => {
                this.setState({ error })
            })
            .finally(() => this.setState({ loading: false }))
        }
    }

    loadMore = () => {
        this.setState(({ page }) => {
            return { page: page + 1 }
        })
    };
    
    handleFormSubmit = request => {
        if (this.state.request !== request) {
            this.setState({ request, page: 1, items: [] });
        }
    };

    modalOpen = () => this.setState({ modalOpen: true });
    modalClose = () => this.setState({ modalOpen: false });

    goLargeImg = img => {
        this.setState({ largeImageURL: img });
        this.modalOpen();
    };
    
    render() {
        const { items, loading, error, modalOpen, largeImageURL } = this.state;
        const isItems = Boolean(items.length);
        const { loadMore, handleFormSubmit, modalClose } = this;
        return (
            <div className={css.App}>
                <Searchbar onSubmit={handleFormSubmit} />
                {loading && <Loader />}
                {error && <p>Restart page or modify the request</p>}
                {isItems && <ImageGallery items={items} goLargeImg={this.goLargeImg} />}
                {isItems && <Button onClick={loadMore} />}
                {modalOpen && <Modal largeImageURL={largeImageURL} modalClose={modalClose} />}
            </div>
      )
  }
}
