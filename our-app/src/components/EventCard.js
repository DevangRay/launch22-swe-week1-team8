import Card from '@mui/material/Card';
import './calendar.css';
// import Button from '@mui/material/Button';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { CardActions, CardContent, CardMedia, Typography, Divider, Chip } from '@mui/material';

function EventCard(props) {
    return (
        <div>
            <Card raised={true} className="card" >
                <CardContent>
                    <div className='cardBody'>
                    <Typography gutterBottom variant="h4" component="div" className='title'>
                        {props.title}
                    </Typography>
                    <Typography variant="h5" className='menu'>
                        {props.date && <div>
                            <CalendarMonthIcon/>
                            {props.date}
                        </div>}
                        {props.location && <div>
                            <FmdGoodIcon/>
                            {props.location}
                        </div> }
                    </Typography>
                    <br></br>
                    <br></br>
                    <br></br>
                    </div>
                    <Divider>
                        {/* <Chip label="" /> */}
                    </Divider>
                    <br></br>
                    <Typography variant="body1" color = "text.secondary">
                        {props.description}
                    </Typography>
                </CardContent>
                <CardMedia 
                    component = "img"
                    image = {props.src}
                    // alt = {newsAlt}
                />
                {/* <CardActions>
                    <Button size="small" href={props.link} target="_blank">Read More</Button>
                </CardActions> */}
            </Card>
        </div>
    );
}

export default EventCard;