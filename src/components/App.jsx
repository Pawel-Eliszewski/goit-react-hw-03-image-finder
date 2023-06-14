import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import axios from 'axios';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalPages: 1,
    isLoading: false,
    modalUrl: '',
    modalAlt: '',
    isModalOpen: false,
  };

  handleFormSubmit = input => {
    this.setState({
      page: 1,
      query: input.name,
      isLoading: true,
    });
  };

  async componentDidUpdate() {
    const API_KEY = '34700780-6518b738595d403a93012b466';
    const URL =
      'https://pixabay.com/api/?key=' +
      API_KEY +
      '&q=' +
      encodeURIComponent(this.state.query.trim()) +
      '&image_type=photo&orientation=horizontal&safesearch=true&per_page=12' +
      '&page=' +
      `${this.state.page}`;

    if (this.state.isLoading !== true) {
    } else
      try {
        const response = await axios.get(`${URL}`);
        const totalPages = Math.ceil(response.data.totalHits / 12);
        if (this.state.page === 1) {
          this.setState({
            images: response.data.hits,
            isLoading: false,
            totalPages: totalPages,
          });
          Notiflix.Notify.success(
            `Hooray! We found ${response.data.totalHits} images.`
          );
        } else if (this.state.page !== 1) {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.data.hits],
            isLoading: false,
          }));
        }
      } catch (error) {
        console.error(error);
      }
  }

  handleBtnClick = e => {
    e.preventDefault();
    this.setState(prevState => {
      return { page: prevState.page + 1, isLoading: true };
    });
  };

  handleImgClick = e => {
    e.preventDefault();
    const chosenImgLargeUrl = e.target.dataset['src'];
    const chosenImgAlt = e.target['alt'];
    this.setState({
      isModalOpen: true,
      modalUrl: chosenImgLargeUrl,
      modalALt: chosenImgAlt,
    });
  };

  handleModalClick = e => {
    if (e.target.name === undefined) {
      this.setState({ isModalOpen: false });
    }
  };

  handleModalEsc = e => {
    if (e.key === 'Escape') {
      this.setState({ isModalOpen: false });
    }
  };

  render() {
    const {
      images,
      page,
      totalPages,
      isLoading,
      isModalOpen,
      modalUrl,
      modalAlt,
    } = this.state;
    return (
      <div className="main">
        <Searchbar onFormSubmit={this.handleFormSubmit} />
        {images.length > 0 ? (
          <ImageGallery images={images} onClick={this.handleImgClick} />
        ) : null}
        {isLoading ? <Loader /> : null}
        {page !== totalPages ? <Button onClick={this.handleBtnClick} /> : null}
        {isModalOpen === true ? (
          <Modal
            onClick={this.handleModalClick}
            onEsc={this.handleModalEsc}
            modalUrl={modalUrl}
            modalAlt={modalAlt}
          />
        ) : null}
      </div>
    );
  }
}
