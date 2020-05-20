import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { Figure, Button } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "20px",
    maxWidth: 800,
  },
}));

export default function TourComponent(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className="tour-img" alt="complex" src={props.tour.img} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {props.tour.tourName}
                </Typography>
                <Typography zeroMinWidth variant="body2" gutterBottom>
                  {props.tour.description}
                </Typography>
                {props.tour.tags.map((tag) => (
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="textSecondary"
                  >
                    {tag}
                  </Typography>
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
              <Typography variant="subtitle1">
                {props.tour.tourGuide.firstName} {props.tour.tourGuide.rating}
                <img
                  style={{
                    width: "18px",
                    height: "18px",
                    marginBottom: "5px",
                    marginLeft: "5px",
                  }}
                  src={require("../images/star.png")}
                />
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Starting at ${props.tour.basePrice}.
              </Typography>

              <Button>Book</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
