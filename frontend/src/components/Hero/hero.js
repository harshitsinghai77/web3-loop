import React from "react";
import { Container, Row, Col } from "reactstrap";

import BackgroundAnimation from "../BackgroundAnimation/BackgroundAnimation";

const HeroComponent = ({ isLanding, size }) => (
  <Container className="py-lg-md d-flex">
    <div className="col px-0">
      <Row>
        {isLanding && (
          <Col lg="6">
            <h1 className="display-3 padding-top text-white">
              Something just like this
              <span>completed with examples</span>
            </h1>
            <p className="lead text-white">
              The design system comes with four pre-built pages to help you get
              started faster. You can change the text and images and you're good
              to go.
            </p>
          </Col>
        )}
        <Col lg={size} className="background-animation">
          <BackgroundAnimation />
        </Col>
      </Row>
    </div>
  </Container>
);

export default HeroComponent;
