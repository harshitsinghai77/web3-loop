import React from "react";

import { Button, Container, Row, Col } from "reactstrap";

class Icons extends React.Component {
	render() {
		return (
			<>
				<section className="section section-lg section-nucleo-icons pb-250">
					<Container>
						<Row className="justify-content-center">
							<Col className="text-center" lg="8">
								<h2 className="display-3">Nucleo Icons</h2>
								<p className="lead">
									The official package contains over 21.000
									icons which are looking great in combination
									with Argon Design System. Make sure you
									check all of them and use those that you
									like the most.
								</p>
								<div className="btn-wrapper">
									<Button
										color="primary"
										href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/icons?ref=adsr-landing-page"
									>
										View demo icons
									</Button>
									<Button
										className="mt-3 mt-md-0"
										color="default"
										href="https://nucleoapp.com/?ref=1712"
										target="_blank"
									>
										View all icons
									</Button>
								</div>
							</Col>
						</Row>
						<div className="blur--hover">
							<a href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/icons?ref=adsr-landing-page">
								<div className="icons-container blur-item mt-5 on-screen">
									<i className="icon ni ni-diamond" />
									<i className="icon icon-sm ni single-02" />
									<i className="icon icon-sm ni single-02" />
									<i className="icon icon-sm ni single-02" />
									<i className="icon ni single-02" />
									<i className="icon ni single-02" />
									<i className="icon ni single-02" />
									<i className="icon icon-sm ni single-02" />
									<i className="icon icon-sm ni single-02" />
									<i className="icon icon-sm ni single-02" />
									<i className="icon ni single-02" />
									<i className="icon ni ni-camera-compact" />
									<i className="icon ni single-02" />
								</div>
								<span className="blur-hidden h5 text-success">
									Explore all the 21,000+ creators
								</span>
							</a>
						</div>
					</Container>
				</section>
			</>
		);
	}
}

export default Icons;
