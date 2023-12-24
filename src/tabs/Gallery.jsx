import { Component } from 'react';
import { Hourglass } from 'react-loader-spinner'

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Text, GalleryList, Modal, Wrapper } from 'components';


export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    isLoadMore: false,
    randomId: 0,
    error: null,
    isEmpty: false,
    largeImageURL: null,
    alt: '',
    showModal: false,
    showLoader: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, randomId } = this.state;
    if (
      prevState.query !== query ||
      prevState.page !== page ||
      prevState.randomId !== randomId
    ) {
      try {
        this.setState({ showLoader: true });
        const { photos, total_results } = await ImageService.getImages(
          query,
          page
        );
        if (photos.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }
        this.setState(prevState => ({
          photos: [...prevState.photos, ...photos],
          isLoadMore: page < Math.ceil(total_results / 15),
        }));
      } catch (error) {
        this.setState({ error: error.message });
        return;
      } finally {this.setState({ showLoader: false,  });

      }
    }
  }

  onSubmit = query => {
    this.setState({
      query,
      page: 1,
      photos: [],
      isLoadMore: false,
      randomId: Math.random(),
      isEmpty: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = (largeImageURL, alt) => {
    this.setState({ showModal: true, largeImageURL, alt });
  };
  backdropCloseModal = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { photos, isLoadMore, error, isEmpty, largeImageURL, alt, showModal, showLoader } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        {photos.length > 0 && <GalleryList photos={photos} onModalClick={this.openModal}/>}
        {isLoadMore && (
          <Button type="button" onClick={this.handleLoadMore}>
            Load more
          </Button>
        )}
       { showLoader && <Wrapper><Hourglass
  visible={true}
  height="50"
  width="50"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['#49a09d', '#fff']}
  
  /></Wrapper>}
       {showModal && <Modal src={largeImageURL} alt={alt} onCloseModal={this.closeModal}/>}
        {error && <Text textAlign="center">Sorry. {error} 😭</Text>}
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images... 😭</Text>
        )}
      </>
    );
  }
}
