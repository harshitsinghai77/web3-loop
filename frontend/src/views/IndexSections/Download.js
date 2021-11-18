import React from "react";
import { Container, Row, Col } from "reactstrap";

const Download = () => (
  <>
    <section className="section section-lg">
      <Container>
        <Row className="row-grid justify-content-center">
          <Col className="text-center" lg="8">
            <h2 className="display-3">
              Do you love this awesome{" "}
              <span className="text-success">
                Design System for Bootstrap 4?
              </span>
            </h2>
          </Col>
        </Row>
      </Container>
    </section>
  </>
);

export default Download;
