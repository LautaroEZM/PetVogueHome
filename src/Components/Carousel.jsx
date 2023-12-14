import Carousel from 'react-bootstrap/Carousel';

function Carousel () {

    return (
        <Carousel>
        <Carousel.Item>
          <ExampleCarouselImage text="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage text="Second slide" />
        </Carousel.Item>
        <Carousel.Item>
          <ExampleCarouselImage text="Third slide" />
        </Carousel.Item>
      </Carousel>
    )
};

export default Carousel; 