import React, {Component} from "react"
import qs from 'qs';
import axios from "axios";
import Tour from "./TourComponent"
import Loader from 'react-loader-spinner'
import FilterModalComponent from './FilterModalComponent'

class TourResultsComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            loaded: false,
            error: false,
            tours: [],
            modalOpen: false
        };
    }

    handleClose = () => {
        this.setState({ modalOpen: false });
    };

    handleShow = () => {
        this.setState({ modalOpen: true });
    };

    componentDidMount = () => {

        const defaultTours = [
            {
                tourName: "Backpacking in the Blue Mountains",
                _id: 0,
                tourGuide: {
                    firstName: "James",
                    img: require("../images/james.jpg"),
                    rating: 4.7,
                },
                description: "Description of Backpacking in the Blue Mountains lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                basePrice: 90,
                img: require("../images/mountains.jpg"),
                tags: ["Outdoors", "Day Trip"],
            },
            {
                tourName: "Food Tour of Sydney",
                _id: 1,
                tourGuide: {
                    firstName: "Josh",
                    img: require("../images/josh.jpg"),
                    rating: 4.5,
                },
                description: "Description of Food Tour of Sydney lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                basePrice: 85,
                img: require("../images/foodtour.jpg"),
                tags: ["Food", "Kid-friendly", "Private Tours Available"],
            },
            {
                tourName: "Day Hike - Sydney Harbour National Park",
                _id: 2,
                tourGuide: {
                    firstName: "Andrea",
                    img: require("../images/andrea.jpg"),
                    rating: 4.8,
                },
                description: "Description of Day Hike - Sydney Harbour National Park lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
                basePrice: 50,
                img: require("../images/sydney-harbour.jpg"),
                tags: ["Outdoors", "Day Trip"],
            },
        ];
        this.setState({
            tours: defaultTours,
            loaded: true,
            loading: false
        });

        const params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        console.log("params " + JSON.stringify(params))
        axios.post("http://localhost:8080/tour/search", params)
            .then(res => {
            console.log("RESULT " + JSON.stringify(res))
            const {data: json} = res
            console.log("RESULT " + JSON.stringify(json))
            this.setState({
                tours: json.tours,
                loaded: true,
                loading: false
            });
        })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading: false,
                    error: 'Something went wrong loading search results.'
                })
            })
    };

    render() {
        const {error, loading, loaded} = this.state;
        // This will render a given number of tours returned by the backend function.
        // If the user wants more tours, it will make another call to the backend and return more tours
        // We could have a set number and they can click next for the next set of tours
        return (
            <>
                {loading && (
                    <div
                        style={{
                            width: "100%",
                            height: "100",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <h2>Fetching tours</h2>
                        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100"/>
                    </div>)}

                <hr
                    style={{
                        margin: "-2px",
                    }}
                />
                <div
                    className= "rowC"
                    style={{textAlign: "left", paddingLeft: "20px", paddingTop: "20px"}}
                >
                    <h4>{this.state.tours?.length || 0} tours are available for your dates!</h4>
                    <button
                        type="button"
                        className="btn btn-link"
                        style={{ textDecoration: "none" }}
                        onClick={this.handleShow}
                    >
                        FILTERS
                    </button>
                </div>
                {error && (
                    <p className="text-danger">{error}</p>
                )}

                {this.state.tours && (
                    <div>
                        {this.state.tours.map(tour => (
                            <div key={tour.id}>
                                <Tour tour={tour}/>
                                <hr/>
                            </div>
                        ))}
                    </div>
                )}



                <FilterModalComponent
                    open={this.state.modalOpen}
                    handleClose={this.handleClose}
                    handleShow={this.handleShow}
                />
            </>
        );
    }
}

export default TourResultsComponent;
