import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

import React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import InfiniteScroll from "react-infinite-scroll-component";

class UnsplashGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
      error: null,
      currentPage: 0,
    };

    this.updateImages = this.updateImages.bind(this);
  }

  updateImages() {
    if (this.currentTerm !== "") {
      this.setState({ currentPage: this.state.currentPage + 1 });
      console.log(this.state.currentPage);
      fetch(
        `https://api.unsplash.com/search/photos?query=${this.props.currentTerm}&per_page=30&page=${this.state.currentPage}`,
        {
          headers: {
            "Accept-Version": "v1",
            Authorization:
              "Client-ID kZ1G5VTbFrSZPA7uuFV-BjgVeJBBTypn_lxUYJpnPZM",
          },
        }
      )
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: [...this.state.items, ...result.results],
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
    }
  }

  componentDidMount() {
    this.updateImages();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentTerm !== prevProps.currentTerm) {
      this.updateImages();
    }
  }

  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.items.length}
        next={this.updateImages}
        hasMore={true}
      >
        <div className="gallery">
          <Gallery shareButton={false} fullscreenButton={false}>
            {this.state.items.map((item) => {
              return (
                <div className="image" key={item.id}>
                  <Item
                    original={item.urls.raw}
                    thumbnail={item.urls.small}
                    width={item.width}
                    height={item.height}
                  >
                    {({ ref, open }) => (
                      <img
                        ref={ref}
                        onClick={open}
                        src={item.urls.small}
                        alt={item.alt_description}
                      />
                    )}
                  </Item>
                </div>
              );
            })}
          </Gallery>
        </div>
      </InfiniteScroll>
    );
  }
}

export default UnsplashGallery;
