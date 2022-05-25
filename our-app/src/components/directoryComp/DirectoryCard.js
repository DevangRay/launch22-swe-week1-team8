import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import './directory.css';

function DirectoryCard(props) {
    return(
        <div>
            {/* <p>{last}, {first}</p>. */}
            <Card raised={true} className="profile" >
                <CardMedia 
                    component = "img"
                    image = {props.src}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.last}, {props.first}
                    </Typography>
                    {/* <Typography variant="body2">{props.author}</Typography> */}
                    <br></br>
                    <Typography variant="body1" color = "text.secondary">
                        {props.role}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" target="_blank">Read More</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default DirectoryCard;