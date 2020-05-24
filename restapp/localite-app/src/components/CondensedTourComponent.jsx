import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Figure, Button } from "react-bootstrap";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

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
      <Card className={classes.card}>
        <CardActionArea>
          <img className="tour-img" alt="complex" src={props.tour.img} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.tour.tourName}
            </Typography>
            <Typography gutterBottom variant="body2" color="textSecondary">
              {props.tour.tags.join(", ")}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
