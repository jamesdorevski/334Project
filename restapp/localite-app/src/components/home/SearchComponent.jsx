import React, {useState} from "react";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import qs from 'qs';
import Col from "react-bootstrap/Col";
import {withRouter} from 'react-router';
import Button from '@material-ui/core/Button';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import Popper from "@material-ui/core/Popper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "../../styles/_custom.css"

export const SearchComponent = (props) => {

    // guests state
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [adults, setAdults] = React.useState('1');
    const [childrenTourists, setChildren] = React.useState('0');
    const [infants, setInfants] = React.useState('0');

    const handleAdultsChange = (event) => {
        setAdults(event.target.value);
    };

    const handleChildrenChange = (event) => {
        setChildren(event.target.value);
    };

    const handleInfantsChange = (event) => {
        setInfants(event.target.value);
    };

    const range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'];
    const adultRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'];


    const showGuestSelector = () => (event) => {
        setOpen((prev) => !prev);
        setAnchorEl(event.currentTarget);
    };

    // dates state
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const handleDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    // location state
    const [location, setLocation] = React.useState("");
    const handleChange = event => {
        setLocation(event.target.value);
    };

    const searchClicked = () => {
        const params = {
            location: location,
            startDate: startDate,
            endDate: endDate,
            adults: Number(adults),
            children: Number(childrenTourists),
            infants: Number(infants)
        };
        props.history.push(`/search?${qs.stringify(params)}`);
    };

    return (
        <div className="container h-100" style={{paddingTop: "200px"}}>
            <div className="row h-100 align-items-center">
                <div className="col-12 text-center">
                    <div>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="location">
                                    <Form.Control placeholder="Where are you traveling?"
                                                  value={location}
                                                  onChange={handleChange}
                                                  />
                                </Form.Group>

                                <Form.Group as={Col} md="4" controlId="date">
                                    <div className="App" id="date-picker">
                                        <DateRangePicker
                                            startDate={startDate}
                                            startDateId="range-start-date"
                                            endDate={endDate}
                                            endDateId="range-end-date"
                                            onDatesChange={handleDatesChange}
                                            focusedInput={focusedInput}
                                            onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group as={Col} md="2" controlId="tourists">
                                    <Button
                                        className="buttonOverrides"
                                        variant="contained"
                                        color="default"
                                        size="small"
                                        onClick={showGuestSelector()}
                                        startIcon={<GroupAddIcon/>}
                                    >
                                        Select Guests
                                    </Button>
                                    <Popper open={open} placement="bottom-start" anchorEl={anchorEl} transition>
                                        {({TransitionProps}) => (
                                            <Fade {...TransitionProps} timeout={350}>
                                                <Paper className="guestGroup">
                                                    <TextField
                                                        id="standard-select-number"
                                                        className="textField"
                                                        select
                                                        label="Adults"
                                                        value={adults}
                                                        onChange={handleAdultsChange}
                                                    >
                                                        {adultRange.map((option) => (
                                                            <MenuItem key={option} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>

                                                    <TextField
                                                        id="standard-select-number"
                                                        className="textField"
                                                        select
                                                        label="Children"
                                                        value={childrenTourists}
                                                        onChange={handleChildrenChange}
                                                        helperText="from 4-15 years"
                                                    >
                                                        {range.map((option) => (
                                                            <MenuItem key={option} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>

                                                    <TextField
                                                        className="textField"
                                                        id="standard-select-number"
                                                        select
                                                        label="Infants"
                                                        value={infants}
                                                        onChange={handleInfantsChange}
                                                        helperText="from 0-3 years"
                                                    >
                                                        {range.map((option) => (
                                                            <MenuItem key={option} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>

                                                </Paper>
                                            </Fade>
                                        )}
                                    </Popper>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row className="justify-content-end">
                                <Button size="medium" variant="outlined" onClick={searchClicked}>
                                    Find a tour
                                </Button>
                            </Form.Row>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(SearchComponent);
