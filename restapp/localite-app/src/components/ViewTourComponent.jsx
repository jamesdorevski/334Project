import React, { Component, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import bluemountains_cropped from "../images/bluemountains_cropped.png";
import bluemountains2_cropped from "../images/bluemountains2_cropped.png";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import forest from "../images/forest.jpg";
import sterre from "../images/sterre.jpg";
import borealis from "../images/borealis.jpg";
import TourService from "../api/TourService";
import StarRatingComponent from "react-star-rating-component";
import Typography from "@material-ui/core/Typography";
import { BookTourComponent } from "./BookTour/BookTourComponent";
import { Button, Figure } from "react-bootstrap";
import ReviewComponent from "./ReviewComponent";
import LeaveReviewComponent from "./LeaveReviewComponent";
import MessageGuideComponent from "./MessageGuideComponent"
import AccountService from "../api/AccountService"

class ViewTourComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tour: null,
      open: false,
      reviewOpen: false,
      messageOpen: false,
      canLeaveReview: false
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    
    const id = this.props.match.params.id;
    const user = AccountService.getCurrentUser()

    TourService.getTour(id).then(
      (response) => {
        console.log(response);
        if (response.data.success) {
          this.setState({ tour: response.data.tour });
          console.log(response.data.tour)

          TourService.checkReview(user._id, this.state.tour._id).then(
            (response) => {
              if (response.data.success) {
                this.setState({ canLeaveReview: response.data.review });
                
              } 
            }
          );      
          
        } else {
          this.props.history.push("/");
        }
      },
      (error) => {
        this.props.history.push("/");
      }
    );

    
  }

  handleClose = () => this.setState({ open: false });
  handleShow = () => this.setState({ open: true });

  openReview = () => this.setState({ reviewOpen: true})
  closeReview = () => (
    this.setState({ reviewOpen: false})
  )

  handleMessageOpen = () => this.setState({ messageOpen: true });
  handleMessageClose = () => this.setState({ messageOpen: false });

  render() {
    const loggedIn = AccountService.getCurrentUser()

    return (
      <>
        {this.state.tour && (
          <div>
            <center>
              <Carousel>
              {this.state.tour.img.map((image) => {
                    return (
                      <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={image}
                    style={{ objectFit: "cover", height: "500px" }}
                    alt="First slide"
                  />
                </Carousel.Item>
                    );
                  })}
              </Carousel>
              <div style={{ paddingBottom: "10px" }}>
                <div className="container" align="left">
                  <div className="row">
                    {/* tour title */}
                    <h1 style={{ paddingTop: 30 }}>{this.state.tour.name}</h1>
                  </div>
                  <div className="row">
                    {/* tour location */}
                    <h2 style={{ paddingBottom: 30 }}>
                      {this.state.tour.location.city},{" "}
                      {this.state.tour.location.country}
                    </h2>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <p style={({ paddingTop: 20 }, { paddingBottom: 20 })}>
                        {this.state.tour.description}
                      </p>

                      {/* tour categories */}
                      {this.state.tour.tags.map((tag) => (
                        <div key={tag} className="tour-tag">
                          <Typography
                            className="text-uppercase"
                            style={{ fontSize: 12 }}
                          >
                            {tag}
                          </Typography>
                        </div>
                      ))}

                      {/* lists */}
                      <h4 style={{ paddingTop: 30 }}>What's Included</h4>
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
                    <center>
                      <h4>Meet Your Guide</h4>

                        <Figure.Image
                          roundedCircle
                          fluid
                          style={{
                            width: "200px",
                            height: "200px",
                            objectFit: "cover",
                          }}
                          onClick={() => this.props.history.push(`/account/show/${this.state.tour.tourGuide._id}`)}
                          src={this.state.tour.tourGuide.img}
                        />
                        <div className="rowC">
                          <h5>{this.state.tour.tourGuide.firstName}</h5>
                          <p style={{paddingLeft: "5px"}}>{this.state.tour.tourGuide.ratings}</p>
                          <StarRatingComponent
                            name="star"
                            editing={false}
                            starCount={1}
                            value={1}
                          />
                        </div>
                      </center>
                      {/* guide description/bio */}
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>

                      {/* <p>
                    Languages Spoken:{" "}
                    {this.state.user.languagesSpoken.join(", ")}
                  </p> */}

{this.state.tour.tourGuide._id !== loggedIn._id && <center>
                        <Button onClick={this.handleMessageOpen}>
                          Message {this.state.tour.tourGuide.firstName}
                        </Button>
                      </center>}
                    </div>
                  </div>

                  {this.state.tour.tourGuide._id !== loggedIn._id && <Button onClick={this.handleShow}>
                    Book From ${this.state.tour.basePrices.adult}
                  </Button>}

                  {/* REVIEW SECTION */}
                  <div className="container" align="left">
                    <div className="row">
                      <h2>Tourist Reviews</h2>
                    </div>
                    <div className="rowC" style={{ paddingBottom: 30 }}>
                    <h4><StarRatingComponent
                          name="star"
                          editing={false}
                          starCount={5}
                          value={Math.round(this.state.tour.ratings)}
                        /></h4>
                      <h4>
                    
                        {this.state.tour.ratings} (
                        {this.state.tour.allReviews.length})
              
                      </h4>
                      
                    </div>
                    {this.state.tour.tourGuide._id !== loggedIn._id && this.state.canLeaveReview && <Button onClick={() => this.openReview()}>Leave a Review</Button>}
                  </div>


                {this.state.reviewOpen && <div style={{marginLeft: "-320px"}}>
                <LeaveReviewComponent tourID={this.state.tour._id} userID={loggedIn._id} close={this.closeReview}/>
                </div>}
                  
                  {this.state.tour.allReviews.map((review) => {
                    return (
                      <div key={review._id} >
                        <ReviewComponent review={review} />
                      </div>
                    );
                  })}

                  {/* <button className="guide-msg-button" style={{ marginRight: 30 }}>
                See More Reviews
              </button> */}

                  <h2 style={({ paddingBottom: 20 }, { paddingTop: 100 })}>
                    Similar Tours
                  </h2>
                  <div className="container" style={{ paddingBottom: 150 }}>
                    <div className="row">
                      <CardDeck>
                        <Card>
                          <Card.Img
                            className="card-img-top2"
                            variant="top"
                            src={borealis}
                          />
                          <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                              This is a wider card with supporting text below as
                              a natural lead-in to additional content. This
                              content is a little bit longer.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                        <Card>
                          <Card.Img
                            className="card-img-top2"
                            variant="top"
                            src={forest}
                          />
                          <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                              This card has supporting text below as a natural
                              lead-in to additional content.{" "}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                        <Card>
                          <Card.Img
                            className="card-img-top2"
                            variant="top"
                            src={sterre}
                          />
                          <Card.Body>
                            <Card.Title>Card title</Card.Title>
                            <Card.Text>
                              This is a wider card with supporting text below as
                              a natural lead-in to additional content. This card
                              has even longer content than the first to show
                              that equal height action.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </CardDeck>
                    </div>
                  </div>
                </div>
              </div>
              <BookTourComponent
                open={this.state.open}
                onHide={this.handleClose}
                tour={this.state.tour}
              />
              <MessageGuideComponent
              open={this.state.messageOpen}
              close={this.handleMessageClose}
              name={this.state.tour.tourGuide.firstName}
              guideID={this.state.tour.tourGuide._id}
              loggedInID={loggedIn._id}
              />
              
              }
            </center>
          </div>
        )}
      </>
    );
  }
}

export default ViewTourComponent;

// const ViewTour = (props) => {

//     const defaultComponentProps = {
//         tour: {
//             tourName: 'Default',
//             tourDescription: 'Default desc',
//             tourLocation: 'Sydney, Australia',
//             tourCategories: ['Hiking', 'Fishing', 'Camping'],
//             tourReviews: ['Great hike', 'Joe is a great guide']
//         },
//         tourGuide: {
//             guideName: 'Joey Joe Joe Shabadoo',
//             guideRating: 4.5,
//             guideBio: 'This guide really knows how to guide. The guidiest guide that ever did guide.',
//             languages: ['English', 'Spanish', '日本語']
//         }
//     }
//     const [open, setOpen] = useState(false);

//     const handleClose = () => setOpen(false);
//     const handleShow = () => setOpen(true);

//     return (
//         <>
//             <div>
//                 <center>
//                     <Carousel>
//                         <Carousel.Item>
//                             <img
//                                 className="d-block w-75"
//                                 src={bluemountains_cropped}
//                                 alt="First slide"
//                             />
//                         </Carousel.Item>
//                         <Carousel.Item>
//                             <img
//                                 className="d-block w-75"
//                                 src={bluemountains2_cropped}
//                                 alt="Second slide"
//                             />
//                         </Carousel.Item>
//                     </Carousel>
//                 </center>
//             </div>

//             {/* tour info */}
//             <div style={{paddingBottom: "10px"}}>
//                 <div className="container" align="left">
//                     <div className="row">
//                         {/* tour title */}
//                         <h1 style={{paddingTop: 30}}>
//                             {defaultComponentProps.tour.tourName || props?.tourName}
//                         </h1>
//                     </div>
//                     <div className="row">
//                         <h2 style={{paddingBottom: 30}}>
//                             {defaultComponentProps.tour.tourLocation || props?.tourLocation}
//                         </h2>
//                     </div>
//                     <div className="row">
//                         <div className="col-8">
//                             <p style={({paddingTop: 20, paddingBottom: 20})}>
//                                 {defaultComponentProps.tour.tourDescription || props?.tourDescription}
//                             </p>

//                             {defaultComponentProps.tour.tourCategories.map(category => (
//                                 <text className="tour-tag">{category}</text>
//                             ))}

//                             {/* lists */}
//                             <h4 style={{paddingTop: 30}}>What's Included</h4>
//                             <ul>
//                                 <li>Complimentary lunch</li>
//                                 <li>"Blue Mountains" t-shirt</li>
//                                 <li>"Blue Mountains" fridge magnet</li>
//                             </ul>

//                             <h4>What to Bring</h4>
//                             <ul>
//                                 <li>Water</li>
//                                 <li>Small snacks</li>
//                                 <li>Camera</li>
//                                 <li>A willingness to explore</li>
//                             </ul>
//                         </div>

//                         {/* tour guide information */}
//                         <div className="col">
//                             <h4>Meet Your Guide</h4>
//                             <center>
//                                 {/* profile pic */}
//                                 <img className="guide-avatar" src={""}/>
//                                 <h5>
//                                     {defaultComponentProps.tourGuide.guideName || props?.guideName}
//                                 </h5>
//                                 <p>
//                                     {defaultComponentProps.tourGuide.guideRating || props?.guideRating} ★</p>
//                             </center>
//                             {/* guide description/bio */}
//                             <p>
//                                 {defaultComponentProps.tourGuide.guideBio || props?.guideBio}

//                             </p>

//                             <p>
//                                 <strong>Languages Spoken: </strong>
//                                 {defaultComponentProps.tourGuide.languages.map(language => (
//                                     <span>{language} </span>
//                                 ))}
//                             </p>

//                             <center>
//                                 <button
//                                     className="guide-msg-button">Message {defaultComponentProps.tourGuide.guideName || props?.guideName}</button>
//                             </center>
//                         </div>
//                     </div>
//                 </div>

//                 <button className="bookTourButton" onClick={handleShow}>BOOK FOR $90</button>

//                 {/* REVIEW SECTION */}
//                 <center>
//                     <div className="container" >
//                         <div className="row">
//                             <h2>Traveler Reviews</h2>
//                         </div>
//                         <div className="row" style={{paddingBottom: 30}}>
//                             <h4>★ ★ ★ ★ ★ 4.86 (20)</h4>
//                         </div>
//                     </div>

//                     <div className="container" align="left" style={{width: 800}}>
//                         <img className="user-review" src={brittney}/>
//                         <h5 className="review-title">Amazing trip!</h5>
//                         ★ ★ ★ ★ ★<br/>
//                         <b>Brittney</b> • February 8, 2020
//                         <br/>
//                         <p className="user-review-txt">
//                             We had a great time with Joe. My wife and two kids lorem ipsum
//                             dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
//                             incididunt ut labore et dolore magna aliqua. Ut enim ad minim
//                             veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
//                             ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
//                             voluptate velit esse cillum dolore eu fugiat nulla pariatur.
//                             Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
//                             officia deserunt mollit anim id est laborum.
//                         </p>
//                     </div>

//                     <div className="container" align="left" style={{width: 800}}>
//                         <img className="user-review" src={corndog}/>
//                         <h5 className="review-title">Cool mountains but no corndogs</h5>
//                         ★ ★ ★ ★ ☆<br/>
//                         <b>Hank</b> • February 8, 2020
//                         <br/>
//                         <p className="user-review-txt">
//                             Joe was cool but there were no corndogs so that made me lorem
//                             ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//                             tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
//                             minim veniam, quis nostrud exercitation ullamco laboris nisi ut
//                             aliquip ex ea commodo consequat. Duis aute irure dolor in
//                             reprehenderit in voluptate velit esse cillum dolore eu fugiat
//                             nulla pariatur. Excepteur sint occaecat cupidatat non proident,
//                             sunt in culpa qui officia deserunt mollit anim id est laborum.
//                         </p>
//                     </div>
//                 </center>
//             </div>

//             <button className="guide-msg-button" style={{marginRight: 30}}>
//                 See More Reviews
//             </button>
//             <button className="guide-msg-button">
//                 Leave a Review
//             </button>

//             <h2 style={({paddingBottom: 20}, {paddingTop: 100})}>
//                 Similar Tours
//             </h2>
//             <div className="container" style={{paddingBottom: 150}}>
//                 <div className="row">
//                     <CardDeck>
//                         <Card>
//                             <Card.Img className="card-img-top2" variant="top" src={borealis}/>
//                             <Card.Body>
//                                 <Card.Title>Card title</Card.Title>
//                                 <Card.Text>
//                                     This is a wider card with supporting text below as a natural
//                                     lead-in to additional content. This content is a little bit
//                                     longer.
//                                 </Card.Text>
//                             </Card.Body>
//                         </Card>
//                         <Card>
//                             <Card.Img className="card-img-top2" variant="top" src={forest}/>
//                             <Card.Body>
//                                 <Card.Title>Card title</Card.Title>
//                                 <Card.Text>
//                                     This card has supporting text below as a natural lead-in to
//                                     additional content.{" "}
//                                 </Card.Text>
//                             </Card.Body>
//                         </Card>
//                         <Card>
//                             <Card.Img className="card-img-top2" variant="top" src={sterre}/>
//                             <Card.Body>
//                                 <Card.Title>Card title</Card.Title>
//                                 <Card.Text>
//                                     This is a wider card with supporting text below as a natural
//                                     lead-in to additional content. This card has even longer
//                                     content than the first to show that equal height action.
//                                 </Card.Text>
//                             </Card.Body>
//                         </Card>
//                     </CardDeck>
//                 </div>
//             </div>

//             <BookTourComponent open={open} onHide={handleClose} tour={props.tour}/>
//         </>
//     );
// }

// export default ViewTour;
