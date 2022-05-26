import ClassesTable from "./ClassesTable";
import EditClasses from "./EditClasses";
import "./classes.css"
import { makeStyles } from '@material-ui/core/styles';
import { ClassNames } from "@emotion/react";

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '15vh',
      fontFamily: 'Nunito',
      background: '#fafafa',
      color: '#dc7027'
    }, 
    body: {
      background: '#fafafa',
      justifyContent: 'center'
    },
    emphasisText: {
      color: '#f4d8ae',
    }
  }));

const Classes = (props) =>{
    const classes = useStyles();
    return (<>
    <div className={classes.body}>
        <h1 className={classes.root}>Classes</h1>
        <EditClasses />
    </div>
    </>)
}

export default Classes