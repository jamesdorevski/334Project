import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Figure, Button } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "20px",
    alignItems: "center",
    maxWidth: 800,
  },
}));

export default function TourComponent(props) {
  const classes = useStyles();

  return (
    <div key={props.tour._id} className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase onClick={() => props.goToTour(props.tour._id)}>
              <img
                className="tour-img"
                alt={props.tour.name}
                src={props.tour.img[0]}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs style={{ width: "330px" }}>
                <Typography
                  style={{ fontWeight: 600 }}
                  gutterBottom
                  variant="subtitle1"
                >
                  {props.tour.tourName}
                </Typography>
                <Typography variant="body2" style={{ textAlign: "left" }}>
                  {props.tour.description.substring(0, 300)}...
                </Typography>
                {props.tour.tags.map((tag) => (
                  <div
                    key={tag}
                    style={{ marginTop: "30px", float: "left" }}
                    className="tour-tag"
                  >
                    <Typography
                      className="text-uppercase"
                      style={{ fontSize: 12 }}
                    >
                      {tag}
                    </Typography>
                  </div>
                ))}
              </Grid>
            </Grid>
            <Grid item>
              <ButtonBase>
                <Figure.Image
                  roundedCircle
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                  src={props.tour.tourGuide.img}
                  onClick={() => props.goToProfile(props.tour.tourGuide._id)}
                />
              </ButtonBase>
              <Typography
                variant="subtitle1"
                className="rowC"
                style={{ marginBottom: "-10px", paddingLeft: "5px" }}
              >
                {props.tour.tourGuide.firstName} {props.tour.tourGuide.ratings}
                <StarRatingComponent
                  name="star"
                  editing={false}
                  starCount={1}
                  value={1}
                />
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Starting at ${props.tour.basePrices.adult}.
              </Typography>

              <Button
                onClick={() => props.goToTour(props.tour._id)}
                style={{ margin: "5px", marginTop: "30px" }}
              >
                Book
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
