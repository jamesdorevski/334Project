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
      {/* <Card className={classes.card}>
        <CardActionArea onClick={() => props.goToTour(props.tour._id)}>
          <img
            className="tour-img"
            alt={props.tour.name}
            src={props.tour.img}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.tour.name}
            </Typography>
            <Typography gutterBottom variant="body2" color="textSecondary">
              {props.tour.tags.join(", ")}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card> */}
      <Card className={classes.root}>
      <CardActionArea>
      <img
            alt={props.tour.name}
            src={props.tour.img}
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}
