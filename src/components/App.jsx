import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
// import { Modal } from './Modal/Modal';
import axios from 'axios';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
  };

  handleFormSubmit = input => {
    this.setState({
      page: 1,
      query: input.name,
      loading: true,
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

    try {
      const response = await axios.get(`${URL}`);
      if (this.state.images !== response.data.hits) {
        this.setState({
          images: response.data.hits,
          loading: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  handleClick = () => {
    this.setState(prevState => {
      return { ...this.state, page: prevState.page + 1, loading: true };
    });
  };

  render() {
    const { images, loading } = this.state;
    return (
      <div className="main">
        <Searchbar onFormSubmit={this.handleFormSubmit} />
        {loading ? (
          <Loader />
        ) : images.length > 0 ? (
          <ImageGallery images={images} />
        ) : null}
        {images.length >= 12 ? <Button onLoadMore={this.handleClick} /> : null}
        {/* <Modal images={this.state.images} /> */}
      </div>
    );
  }
}
