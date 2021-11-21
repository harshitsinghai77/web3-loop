import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "reactstrap";

const CardsFooter = () => (
  <>
    <footer className="footer has-cards">
      <Container>
        <Row className="row-grid align-items-center my-md">
          <Col lg="6">
            <h4 className="mb-0 font-weight-light">
              Have you supported your favourite creator yet?
            </h4>
          </Col>
          <Col className="text-lg-center btn-wrapper" lg="6">
            <Button
              className="btn-icon-only rounded-circle"
              color="twitter"
              href="https://twitter.com/creativetim"
              target="_blank"
            >
              <span className="btn-inner--icon">
                <i className="fa fa-twitter" />
              </span>
            </Button>

            <Button
              className="btn-icon-only rounded-circle ml-1"
              color="facebook"
              href="https://www.facebook.com/creativetim"
              target="_blank"
            >
              <span className="btn-inner--icon">
                <i className="fa fa-facebook-square" />
              </span>
            </Button>

            <Button
              className="btn-icon-only rounded-circle ml-1"
              color="dribbble"
              href="https://dribbble.com/creativetim"
              target="_blank"
            >
              <span className="btn-inner--icon">
                <i className="fa fa-dribbble" />
              </span>
            </Button>

            <Button
              className="btn-icon-only rounded-circle ml-1"
              color="github"
              href="https://github.com/shreyaspapi/cautious-palm-tree"
              target="_blank"
            >
              <span className="btn-inner--icon">
                <i className="fa fa-github" />
              </span>
            </Button>
          </Col>
        </Row>
        <hr />
        <Row className="align-items-center justify-content-md-between">
          <Col md="6">
            <div className="copyright">
              © {new Date().getFullYear()} <Link to="/">Loop</Link>.
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  </>
);

export default CardsFooter;
