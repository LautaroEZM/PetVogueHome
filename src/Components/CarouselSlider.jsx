import Carousel from 'react-material-ui-carousel'
import CarouselItem from './CarouselItem';



function CarouselSlider() {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            image: "https://www.kivet.com/wp-content/uploads/2023/04/Beneficios-de-crecer-con-mascotas-min.jpg"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            image: "https://blog.lopido.com/wp-content/uploads/2022/11/shutterstock_1773612860-scaled.jpeg"
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            image: "https://i0.wp.com/cdn1.intriper.com/wp-content/uploads/2021/06/25075837/henar-langa-ZVdZw2p08y4-unsplash-1.jpg?resize=800%2C533&ssl=1"
        }
    ]

    return (
        <Carousel>
            {
                items.map((item, i) => <CarouselItem key={i} item={item} />)
            }
        </Carousel>
    )
};

export default CarouselSlider;