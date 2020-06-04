import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import AccountService from "../../api/AccountService";
import { Modal } from "react-bootstrap";
import TourService from "../../api/TourService";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Tour details", "Payment details", "Confirm booking"];
}

export const BookTourComponent = (props) => {
  //placeholder
  const tour = {
    name: "James Big Bad Tour",
    tourDescription: "This tour is the tourist tour that ever toured",
    tourPrice: 45.0,
    capacity: 4,
    tourDates: ["Thurs 4 Jun", "Fri 5 Jun", "Mon 29 Jun"],
  };

  const currentUser = AccountService.getCurrentUser();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");
  const [tourDate, setTourDate] = useState(tour.tourDates[0]);
  const [guests, setGuests] = React.useState(1);
  const [cardNumber, setCardNumber] = React.useState();
  const [expiryMonth, setExpiryMonth] = React.useState("Jan");
  const [expiryYear, setExpiryYear] = React.useState(2021);
  const [ccv, setCcv] = React.useState();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];
  const totalGuestCapacity = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];
  const tourCapacity = totalGuestCapacity.slice(0, tour.capacity);

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleCardExpiryMonthChange = (event) => {
    setExpiryMonth(event.target.value);
  };

  const handleCardExpiryYearChange = (event) => {
    setExpiryYear(event.target.value);
  };

  const handleCardCCVChange = (event) => {
    setCcv(event.target.value);
  };

  const handleGuestsChange = (event) => {
    setGuests(event.target.value);
  };

  const handleTourDateChange = (event) => {
    setTourDate(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (tour) => {

    TourService.makeBooking(
      tour._id,
      currentUser._id,
      new Date().getTime(),
      currentUser,
      guests,
      tour,
      "",
      tour.basePrices.adult * guests
    ).then(
      (response) => {
        console.log(response);
        if (response.data.success) {
          //success message w confirmation number
        } else {
          //unable to book tour
        }
      },
      (error) => {
        //unable to book tour
      }
    );
  };

  return (
    <Modal show={props.open} onHide={props.onHide}>
      <Modal.Body style={{ padding: "30px" }}>
        <div className={classes.root}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  You are booked for {props.tour.name} on {tourDate}!
                  Confirmation number: 
                </Typography>
              </div>
            ) : (
              <div className={classes.instructions}>
                {activeStep === 0 && (
                  <div className="bookTourStep">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>Tour Details</strong>
                    </h3>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="First Name"
                          className="mt-3"
                          value={firstName}
                          onChange={handleFirstNameChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Last Name"
                          className="mt-3"
                          value={lastName}
                          onChange={handleLastNameChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          className="dates__textField"
                          id="standard-select-number"
                          select
                          label="Guests"
                          value={guests}
                          onChange={handleGuestsChange}
                        >
                          {tourCapacity.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          className="dates__textField"
                          id="standard-select"
                          select
                          label="Tour Date"
                          value={tourDate}
                          onChange={handleTourDateChange}
                        >
                          {tour.tourDates.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <Typography variant="subtitle1">
                          Total Cost: $ {props.tour.basePrices.adult * guests}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="bookTourStep">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>Payment Details</strong>
                    </h3>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <TextField
                          label="Card Number"
                          className="mt-3"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          className="dates__textField"
                          id="standard-select"
                          select
                          label="Exp Month"
                          value={expiryMonth}
                          onChange={handleCardExpiryMonthChange}
                        >
                          {months.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          className="dates__textField"
                          id="standard-select"
                          select
                          label="Exp Year"
                          value={expiryYear}
                          onChange={handleCardExpiryYearChange}
                        >
                          {years.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="CCV"
                          className="mt-3"
                          value={ccv}
                          onChange={handleCardCCVChange}
                        />
                      </Grid>
                    </Grid>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="bookTourStep">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>Confirm Booking Details</strong>
                    </h3>
                    <Grid container>
                      <Grid item xs={12} md={12}>
                        <Typography variant={"body1"}>
                          Tour Name: {props.tour.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <div>
                          <Typography variant={"body2"}>
                            Tourists: {guests}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography variant={"body2"}>
                          Date: {tourDate}
                        </Typography>
                        <Typography variant={"body1"}>
                          Total Cost: ${props.tour.basePrices.adult * guests}
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                )}

                <div>
                  {/*<Button onClick={props.onHide} className={classes.button}>*/}
                  {/*    Close*/}
                  {/*</Button>*/}
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit(props.tour)}
                      className={classes.button}
                    >
                      Book Now
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
