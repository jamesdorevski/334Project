import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
    margin: "20px",
    alignItems: "center",
    maxWidth: 600,
  },
}));

export default function CondensedTourComponent(props) {
  const classes = useStyles();

  return (
    <div key={props.tour._id} className={classes.root}>
      { props.tour &&
      <Card className={classes.root}>
      <CardActionArea>
      <img
            alt={props.tour.name}
            src={props.tour.img[0]}
            style={{height: "250px", objectFit: "cover"}}
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
      {props.tour.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.tour.description.substring(0, 150)}...
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>}
    </div>
  );
}
