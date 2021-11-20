import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "reactstrap";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";

import Download from "../IndexSections/Download.js";
import HeroComponent from "../../components/Hero/hero";
import { burnerContract } from "../../smartContract";
import { retrieveDataFromIPFS, retrieveImageFromIPFS } from "../../utils/ipfsConfig"
// import SpinnerComponent from "../../components/Spinner";

const Creators = () => {

  const [creators, setCreators] = useState()


  const changeIpfsData = () => {

  }

  useEffect(() => {
    const getCreatorsFromContract = async () => {
      const getCount = await burnerContract.getCreatorCount()
      const totalCount = parseInt(getCount.toString())
      const getAllCreator = await burnerContract.getCreators(1, totalCount)
	  console.log("getAllCreator[0]", getAllCreator[0])
      const creators = await Promise.all(getAllCreator[0].map(async (element) => {
        let creator = await retrieveDataFromIPFS(element)
        creator = creator.data
        const creatorImg = await retrieveImageFromIPFS(creator["userImage"])
        let reader = new FileReader();
        reader.readAsDataURL(creatorImg.data);
        reader.onload = () => {
          creator['imgSrc'] = reader.result;
        };
        return creator
      }))
	  console.log("creators", creators)
      setCreators(creators)
    }
    getCreatorsFromContract()
  }, [])

  return (
    <>
      <DemoNavbar />
      <main >
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
              {creators && creators.map(el =>
                <Col className="mb-5 mb-lg-0" lg="3" md="6" key={el.creatorAddress}>
					<Link to={`/profile/${el.creatorAddress}`}>
                  <div className="px-4 creator-box">
                    <img
                      alt="..."
                      className="img-center img-fluid shadow shadow-lg--hover"
                      src={el.imgSrc}
                      
                      style={{
                        width: "200px",
                        height: "100px",
                      }}
                    />
                    <div className="pt-4 text-center">
                      <h5 className="title">
                        <span className="d-block mb-1">{el.fullName}</span>
                        <small className="h6 text-muted">{el.username}</small>
                      </h5>
                      <div className="mt-3">
                        <Button
                          className="btn-icon-only rounded-circle"
                          color="warning"
                          href={el.socialMedia.twitterHandle}
                          target="_blank"
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="warning"
                          href={el.socialMedia.instagramHandle}
                          target="_blank"
                        >
                          <i className="fa fa-instagram" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle ml-1"
                          color="warning"
                          href="el.socialMedia.youtubeHandle"
                          target="_blank"
                        >
                          <i className="fa fa-youtube" />
                        </Button>
                      </div>
                    </div>
                  </div>
					</Link>

                </Col>
              )}
            </Row>
          </Container>
        </section>

        <Download />
      </main>
      <CardsFooter />
    </>
  );
}

export default Creators;
