import React, {Component, useState} from "react";
import Carousel from "react-bootstrap/Carousel";
import bluemountains_cropped from "../../images/bluemountains_cropped.png";
import bluemountains2_cropped from "../../images/bluemountains2_cropped.png";
import joe from "../../images/joe.jpg";
import brittney from "../../images/brittney.jpg";
import corndog from "../../images/corndog.PNG";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import forest from "../../images/forest.jpg";
import sterre from "../../images/sterre.jpg";
import borealis from "../../images/borealis.jpg";
import {BookTourComponent} from "../BookTour/BookTourComponent";

const ViewTour = (props) => {

    const defaultComponentProps = {
        tour: {
            tourName: 'Default',
            tourDescription: 'Default desc',
            tourLocation: 'Sydney, Australia',
            tourCategories: ['Hiking', 'Fishing', 'Camping'],
            tourReviews: ['Great hike', 'Joe is a great guide']
        },
        tourGuide: {
            guideName: 'Joey Joe Joe Shabadoo',
            guideRating: 4.5,
            guideBio: 'This guide really knows how to guide. The guidiest guide that ever did guide.',
            languages: ['English', 'Spanish', '日本語']
        }
    }
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const handleShow = () => setOpen(true);

    return (
        <>
            <div>
                <center>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-75"
                                src={bluemountains_cropped}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-75"
                                src={bluemountains2_cropped}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </center>
            </div>

            {/* tour info */}
            <div style={{paddingBottom: "10px"}}>
                <div className="container" align="left">
                    <div className="row">
                        {/* tour title */}
                        <h1 style={{paddingTop: 30}}>
                            {defaultComponentProps.tour.tourName || props?.tourName}
                        </h1>
                    </div>
                    <div className="row">
                        <h2 style={{paddingBottom: 30}}>
                            {defaultComponentProps.tour.tourLocation || props?.tourLocation}
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <p style={({paddingTop: 20, paddingBottom: 20})}>
                                {defaultComponentProps.tour.tourDescription || props?.tourDescription}
                            </p>

                            {defaultComponentProps.tour.tourCategories.map(category => (
                                <text className="tour-tag">{category}</text>
                            ))}


                            {/* lists */}
                            <h4 style={{paddingTop: 30}}>What's Included</h4>
                            <ul>
                                <li>Complimentary lunch</li>
                                <li>"Blue Mountains" t-shirt</li>
                                <li>"Blue Mountains" fridge magnet</li>
                            </ul>

                            <h4>What to Bring</h4>
                            <ul>
                                <li>Water</li>
                                <li>Small snacks</li>
                                <li>Camera</li>
                                <li>A willingness to explore</li>
                            </ul>
                        </div>

                        {/* tour guide information */}
                        <div className="col">
                            <h4>Meet Your Guide</h4>
                            <center>
                                {/* profile pic */}
                                <img className="guide-avatar" src={joe}/>
                                <h5>
                                    {defaultComponentProps.tourGuide.guideName || props?.guideName}
                                </h5>
                                <p>
                                    {defaultComponentProps.tourGuide.guideRating || props?.guideRating} ★</p>
                            </center>
                            {/* guide description/bio */}
                            <p>
                                {defaultComponentProps.tourGuide.guideBio || props?.guideBio}

                            </p>

                            <p>
                                <strong>Languages Spoken: </strong>
                                {defaultComponentProps.tourGuide.languages.map(language => (
                                    <span>{language} </span>
                                ))}
                            </p>

                            <center>
                                <button
                                    className="guide-msg-button">Message {defaultComponentProps.tourGuide.guideName || props?.guideName}</button>
                            </center>
                        </div>
                    </div>
                </div>

                <button className="bookTourButton" onClick={handleShow}>BOOK FOR $90</button>

                {/* REVIEW SECTION */}
                <center>
                    <div className="container" >
                        <div className="row">
                            <h2>Traveler Reviews</h2>
                        </div>
                        <div className="row" style={{paddingBottom: 30}}>
                            <h4>★ ★ ★ ★ ★ 4.86 (20)</h4>
                        </div>
                    </div>

                    <div className="container" align="left" style={{width: 800}}>
                        <img className="user-review" src={brittney}/>
                        <h5 className="review-title">Amazing trip!</h5>
                        ★ ★ ★ ★ ★<br/>
                        <b>Brittney</b> • February 8, 2020
                        <br/>
                        <p className="user-review-txt">
                            We had a great time with Joe. My wife and two kids lorem ipsum
                            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                            officia deserunt mollit anim id est laborum.
                        </p>
                    </div>

                    <div className="container" align="left" style={{width: 800}}>
                        <img className="user-review" src={corndog}/>
                        <h5 className="review-title">Cool mountains but no corndogs</h5>
                        ★ ★ ★ ★ ☆<br/>
                        <b>Hank</b> • February 8, 2020
                        <br/>
                        <p className="user-review-txt">
                            Joe was cool but there were no corndogs so that made me lorem
                            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </center>
            </div>

            <button className="guide-msg-button" style={{marginRight: 30}}>
                See More Reviews
            </button>
            <button className="guide-msg-button">
                Leave a Review
            </button>

            <h2 style={({paddingBottom: 20}, {paddingTop: 100})}>
                Similar Tours
            </h2>
            <div className="container" style={{paddingBottom: 150}}>
                <div className="row">
                    <CardDeck>
                        <Card>
                            <Card.Img className="card-img-top2" variant="top" src={borealis}/>
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit
                                    longer.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img className="card-img-top2" variant="top" src={forest}/>
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This card has supporting text below as a natural lead-in to
                                    additional content.{" "}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Img className="card-img-top2" variant="top" src={sterre}/>
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This card has even longer
                                    content than the first to show that equal height action.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </div>
            </div>

            <BookTourComponent open={open} onHide={handleClose} tour={props.tour}/>
        </>
    );
}

export default ViewTour;
