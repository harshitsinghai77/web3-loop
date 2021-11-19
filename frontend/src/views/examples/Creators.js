import React from "react";
import { Button, Card, Container, Row, Col } from "reactstrap";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";

import Download from "../IndexSections/Download.js";
import HeroComponent from "../../components/Hero/hero";

class Creators extends React.Component {
	state = {};
	// componentDidMount() {
	//   document.documentElement.scrollTop = 0;
	//   document.scrollingElement.scrollTop = 0;
	//   this.refs.main.scrollTop = 0;
	// }
	render() {
		return (
			<>
				<DemoNavbar />
				<main ref="main">
					<div className="position-relative">
						{/* shape Hero */}
						<section className="section section-lg landing-page">
							<div className="shape shape-style-1 shape-default"></div>
							{/* SVG separator */}
							<div className="separator separator-bottom separator-skew">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									preserveAspectRatio="none"
									version="1.1"
									viewBox="0 0 2560 100"
									x="0"
									y="0"
								>
									<polygon
										className="fill-white"
										points="2560 0 2560 100 0 100"
									/>
								</svg>
							</div>
						</section>
					</div>
					<section className="section section-lg">
						<Container>
							<Row>
								<Col className="mb-5 mb-lg-0" lg="3" md="6">
									<div className="px-4 creator-box">
										<img
											alt="..."
											className="img-center img-fluid shadow shadow-lg--hover"
											src="https://images.unsplash.com/photo-1613294326794-e7c74fe886e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
											style={{
												width: "200px",
												height: "100px",
											}}
										/>
										<div className="pt-4 text-center">
											<h5 className="title">
												<span className="d-block mb-1">
													Ryan Tompson
												</span>
												<small className="h6 text-muted">
													Tech Youtuber
												</small>
											</h5>
											<div className="mt-3">
												<Button
													className="btn-icon-only rounded-circle"
													color="warning"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-twitter" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="warning"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-facebook" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="warning"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-dribbble" />
												</Button>
											</div>
										</div>
									</div>
								</Col>
								<Col className="mb-5 mb-lg-0" lg="3" md="6">
									<div className="px-4">
										<img
											alt="..."
											className="img-center img-fluid shadow shadow-lg--hover"
											src="https://www.brandingmag.com/wp-content/uploads/2020/08/Jennifer_Quigley-Jones_001_COVER.jpg"
											style={{
												width: "200px",
												height: "100px",
											}}
										/>
										<div className="pt-4 text-center">
											<h5 className="title">
												<span className="d-block mb-1">
													Romina Hadid
												</span>
												<small className="h6 text-muted">
													Tiktoker
												</small>
											</h5>
											<div className="mt-3">
												<Button
													className="btn-icon-only rounded-circle"
													color="primary"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-twitter" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="primary"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-facebook" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="primary"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-dribbble" />
												</Button>
											</div>
										</div>
									</div>
								</Col>
								<Col className="mb-5 mb-lg-0" lg="3" md="6">
									<div className="px-4">
										<img
											alt="..."
											className="img-center img-fluid shadow shadow-lg--hover"
											src="https://www.timeshighereducation.com/sites/default/files/styles/the_breaking_news_image_style/public/istock-1069995244.jpg?itok=RVd1xsST"
											style={{
												width: "200px",
												height: "100px",
											}}
										/>
										<div className="pt-4 text-center">
											<h5 className="title">
												<span className="d-block mb-1">
													Alexander Smith
												</span>
												<small className="h6 text-muted">
													Motivational Speaker
												</small>
											</h5>
											<div className="mt-3">
												<Button
													className="btn-icon-only rounded-circle"
													color="info"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-twitter" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="info"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-facebook" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="info"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-dribbble" />
												</Button>
											</div>
										</div>
									</div>
								</Col>
								<Col className="mb-5 mb-lg-0" lg="3" md="6">
									<div className="px-4">
										<img
											alt="..."
											className="img-center img-fluid shadow shadow-lg--hover"
											src="https://images.financialexpress.com/2020/08/Sumedh.jpeg?w=1200&h=800&imflag=true"
											style={{
												width: "200px",
												height: "100px",
											}}
										/>
										<div className="pt-4 text-center">
											<h5 className="title">
												<span className="d-block mb-1">
													John Doe
												</span>
												<small className="h6 text-muted">
													Gamer
												</small>
											</h5>
											<div className="mt-3">
												<Button
													className="btn-icon-only rounded-circle"
													color="success"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-twitter" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="success"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-facebook" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="success"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-dribbble" />
												</Button>
											</div>
										</div>
									</div>
								</Col>
							</Row>
							<Row>
								<Col className="mb-5 mb-lg-0" lg="3" md="6">
									<div className="px-4 creator-box">
										<img
											alt="..."
											className="img-center img-fluid shadow shadow-lg--hover"
											src="https://images.unsplash.com/photo-1613294326794-e7c74fe886e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
											style={{
												width: "200px",
												height: "100px",
											}}
										/>
										<div className="pt-4 text-center">
											<h5 className="title">
												<span className="d-block mb-1">
													Ryan Tompson
												</span>
												<small className="h6 text-muted">
													Tech Youtuber
												</small>
											</h5>
											<div className="mt-3">
												<Button
													className="btn-icon-only rounded-circle"
													color="warning"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-twitter" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="warning"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-facebook" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="warning"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-dribbble" />
												</Button>
											</div>
										</div>
									</div>
								</Col>
								<Col className="mb-5 mb-lg-0" lg="3" md="6">
									<div className="px-4">
										<img
											alt="..."
											className="img-center img-fluid shadow shadow-lg--hover"
											src="https://www.brandingmag.com/wp-content/uploads/2020/08/Jennifer_Quigley-Jones_001_COVER.jpg"
											style={{
												width: "200px",
												height: "100px",
											}}
										/>
										<div className="pt-4 text-center">
											<h5 className="title">
												<span className="d-block mb-1">
													Romina Hadid
												</span>
												<small className="h6 text-muted">
													Tiktoker
												</small>
											</h5>
											<div className="mt-3">
												<Button
													className="btn-icon-only rounded-circle"
													color="primary"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-twitter" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="primary"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-facebook" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="primary"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-dribbble" />
												</Button>
											</div>
										</div>
									</div>
								</Col>
								<Col className="mb-5 mb-lg-0" lg="3" md="6">
									<div className="px-4">
										<img
											alt="..."
											className="img-center img-fluid shadow shadow-lg--hover"
											src="https://www.timeshighereducation.com/sites/default/files/styles/the_breaking_news_image_style/public/istock-1069995244.jpg?itok=RVd1xsST"
											style={{
												width: "200px",
												height: "100px",
											}}
										/>
										<div className="pt-4 text-center">
											<h5 className="title">
												<span className="d-block mb-1">
													Alexander Smith
												</span>
												<small className="h6 text-muted">
													Motivational Speaker
												</small>
											</h5>
											<div className="mt-3">
												<Button
													className="btn-icon-only rounded-circle"
													color="info"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-twitter" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="info"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-facebook" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="info"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-dribbble" />
												</Button>
											</div>
										</div>
									</div>
								</Col>
								<Col className="mb-5 mb-lg-0" lg="3" md="6">
									<div className="px-4">
										<img
											alt="..."
											className="img-center img-fluid shadow shadow-lg--hover"
											src="https://images.financialexpress.com/2020/08/Sumedh.jpeg?w=1200&h=800&imflag=true"
											style={{
												width: "200px",
												height: "100px",
											}}
										/>
										<div className="pt-4 text-center">
											<h5 className="title">
												<span className="d-block mb-1">
													John Doe
												</span>
												<small className="h6 text-muted">
													Gamer
												</small>
											</h5>
											<div className="mt-3">
												<Button
													className="btn-icon-only rounded-circle"
													color="success"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-twitter" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="success"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-facebook" />
												</Button>
												<Button
													className="btn-icon-only rounded-circle ml-1"
													color="success"
													href="#pablo"
													onClick={(e) =>
														e.preventDefault()
													}
												>
													<i className="fa fa-dribbble" />
												</Button>
											</div>
										</div>
									</div>
								</Col>
							</Row>
						</Container>
					</section>

					<Download />
				</main>
				<CardsFooter />
			</>
		);
	}
}

export default Creators;
