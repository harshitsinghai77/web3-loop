import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col } from "reactstrap";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";
import HeroComponent from "../../components/Hero/hero";
import { burnerContract } from "../../smartContract";
import { retrieveDataFromIPFS } from "../../utils/ipfsConfig";

const Profile = (props) => {
  const [creatorId, setCreatorId] = useState();
  const [creatorContractAddress, setCreatorContractAddress] = useState();
  const [creatorIpfsHash, SetCreatorIpfsHash] = useState();

  const paramsAddress = props.match.params.address;

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    const getCreatorId = async () => {
      let id = await burnerContract.getCreatorIdFromAddress(paramsAddress);
      id = parseInt(id.toString());
      const creatorHash = await burnerContract.getCreatorFromId(id);
      const creatorContractAddress = await burnerContract.getContractFromId(id);

      console.log("creatorHash: ", creatorHash);
      retrieveDataFromIPFS(creatorHash).then((resp) => console.log(resp));

      setCreatorId(id);
      SetCreatorIpfsHash(creatorHash);
      setCreatorContractAddress(creatorContractAddress);
    };

    getCreatorId();
  }, []);

  const truncateString = (str, num) => {
    return (
      str.slice(0, num / 2) +
      "..." +
      str.slice(str.length - num / 2, str.length)
    );
  };

  return (
    <>
      <DemoNavbar />
      <main className="profile-page">
        <section className="section section-lg landing-page pb-250">
          <div className="shape shape-style-1 shape-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
          <HeroComponent size="4" />
        </section>
        <section className="section">
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <img
                        alt="..."
                        className="my-rounded-cirlce"
                        src="https://dragonball.guru/wp-content/uploads/2021/01/goku-dragon-ball-guru.jpg"
                      />
                    </div>
                  </Col>
                  <Col
                    className="order-lg-3 text-lg-right align-self-lg-center"
                    lg="4"
                  >
                    <div className="card-profile-actions py-4 mt-lg-0">
                      <Button
                        className="mr-4"
                        color="info"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Connect
                      </Button>
                      <Button
                        className="float-right"
                        color="default"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Message
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Stakers</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Staked</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Earned</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h3>Goku</h3>
                  <div className="h6 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {truncateString(
                      "0xdcd0527cc1D33411C63171c4F9488e3E0be88858",
                      10
                    )}
                  </div>
                  <div className="h6 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Super Saiyan
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    B.tech Computer Science Bennett University
                  </div>
                </div>
                <div className="mt-5 py-5 border-top text-center">
                  <Row className="justify-content-center">
                    <Col lg="9">
                      <p>
                        An artist of considerable range, Ryan — the name taken
                        by Melbourne-raised, Brooklyn-based Nick Murphy —
                        writes, performs and records all of his own music,
                        giving it a warm, intimate feel with a solid groove
                        structure. An artist of considerable range.
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </main>
      <CardsFooter />
    </>
  );
};

export default Profile;
