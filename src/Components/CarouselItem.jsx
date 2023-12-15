import { Paper, Button } from '@mui/material';

function CarouselItem({item})
{
    return (
        <Paper>
            <img src={item.image} alt="mascotas" style={{width:"100%"}}/>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <Button>
                ¡Quiero saber más!
            </Button>
        </Paper>
    )
};

export default CarouselItem; 
