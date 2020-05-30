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
            <ButtonBase className={classes.image}>
              <img className="tour-img" alt="complex" src={props.tour.img} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid
              item
              xs
              container
              direction="column"
              spacing={2}
            >
              <Grid item xs style={{ width: "330px" }}>
                <Typography
                  style={{ fontWeight: 600 }}
                  gutterBottom
                  variant="subtitle1"
                >
                  {props.tour.tourName}
                </Typography>
                <Typography
                  noWrap={true}
                  zerominwidth="true"
                  variant="body2"
                  gutterBottom
                >
                  {props.tour.description}
                </Typography>
                {props.tour.tags.map((tag) => (
                  <div
                    key={tag}
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
                  fluid
                  width={100}
                  height={100}
                  src={props.tour.tourGuide.img}
                />
              </ButtonBase>
              <Typography
                variant="subtitle1"
                className="rowC"
                style={{ marginBottom: "-10px", paddingLeft: "5px" }}
              >
                {props.tour.tourGuide.firstName} {props.tour.tourGuide.rating}
                <StarRatingComponent name="star" editing={false} starCount={1} value={1} />
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Starting at ${props.tour.basePrice}.
              </Typography>

              <Button style={{ margin: "5px", marginTop: "30px" }}>Book</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
