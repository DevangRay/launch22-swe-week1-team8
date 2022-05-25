import Card from '@mui/material/Card';
import './calendar.css';
// import Button from '@mui/material/Button';
import { CardActions, CardContent, CardMedia, Typography } from '@mui/material';

function EventCard(props) {
    return (
        <div>
            <Card raised={true} className="article" >
                <CardMedia 
                    component = "img"
                    image = {props.src}
                    // alt = {newsAlt}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="body2">{props.date}</Typography>
                    <Typography variant="body2">{props.location}</Typography>
                    <br></br>
                    <Typography variant="body1" color = "text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
                {/* <CardActions>
                    <Button size="small" href={props.link} target="_blank">Read More</Button>
                </CardActions> */}
            </Card>
        </div>
    );
}

export default EventCard;