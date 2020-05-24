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
    alignItems: "center",
    maxWidth: 600,
  },
}));

export default function ReviewComponent(props) {
  const classes = useStyles();

  return (
    <div key={props.review._id} className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
          <ButtonBase>
                <Figure.Image
                  roundedCircle
                  fluid
                  width={80}
                  height={80}
                  src={props.review.reviewer.img}
                />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="subtitle1">
                  {props.review.title}
                </Typography>
                <Typography variant="subtitle2">
                  {props.review.reviewer.firstName} ∙ {props.review.dateCreated}
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
