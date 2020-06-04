import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Figure } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "20px",
    alignItems: "center",
    maxWidth: 600,
  },
}));

export default function ReviewComponent(props) {
  const classes = useStyles();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(props.review.dateCreated);

  return (
    <div key={props.review._id} className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase>
              <Figure.Image
                roundedCircle
                fluid
                style={{ objectFit: "cover", width: "80px", height: "80px" }}
                src={props.review.reviewer.img}
                onClick={() => props.goToReviewer(props.review.reviewer._id)}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <div className="rowC">
                  <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
                    {props.review.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    style={{ paddingLeft: "5px", fontWeight: 300 }}
                  >
                    {props.review.ratings.toFixed(1)}
                  </Typography>
                  <StarRatingComponent
                    name="star"
                    editing={false}
                    starCount={5}
                    value={Math.round(props.review.ratings)}
                  />
                </div>

                {props.showTourInfo && (
                  <Typography>Tour: {props.review.tour.name}</Typography>
                )}

                <Typography variant="subtitle2">
                  {props.review.reviewer.firstName} ∙{" "}
                  {monthNames[date.getMonth()] +
                    " " +
                    date.getDate().toString() +
                    ", " +
                    date.getFullYear().toString()}
                </Typography>
                <Typography zerominwidth="true" variant="body2" gutterBottom>
                  {props.review.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
