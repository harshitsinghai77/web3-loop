import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Container, Row, Col } from "reactstrap";
import { BigNumber } from "@ethersproject/bignumber";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";
import HeroComponent from "../../components/Hero/hero";
import { burnerContract, CreatorContract } from "../../smartContract";
import { retrieveDataFromIPFS, retrieveImageFromIPFS } from "../../utils/ipfsConfig";
import { getWalletProvider } from "../../utils/connectWallet";
import { store } from "../../store/store";
import { SET_WEB3_PROVIDER } from "../../store/types";

const Profile = (props) => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const { web3Provider } = globalState.state;

  const [userData, setUserData] = useState();
  const [creatorId, setCreatorId] = useState();
  const [creatorContractAddress, setCreatorContractAddress] = useState();
  const [creatorIpfsHash, SetCreatorIpfsHash] = useState();
  const [creatorImage, setCreatorImage] = useState();

  const [creatorExists, setCreatorExists] = useState();
  const [staked, setStaked] = useState();
  const creatorAddress = props.match.params.address;

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    const getCreatorId = async () => {
      let id = await burnerContract.getCreatorIdFromAddress(creatorAddress);
      
      id = parseInt(id.toString());
      const creatorHash = await burnerContract.getCreatorFromId(id);
      
      const burnerSigner = await burnerContract.contract.getSigner()
      // console.log(burnerContract.contract)
      const creatorContract = new CreatorContract(burnerContract.contract, creatorAddress)
      const creatorBalance = await creatorContract.creatorBalance(creatorAddress)
      
      if (creatorHash[0] == "Paradise Biryani") {
        setCreatorExists("Creator is not registered!")
        return;
      }
      const creatorContractAddress = await burnerContract.getContractFromId(id);
      let userData = await retrieveDataFromIPFS(creatorHash)
      userData = userData.data
      const userImageHash = userData['userImage']
      const userImageFromIpfs = await retrieveImageFromIPFS(userImageHash)
      
      getImage(userImageFromIpfs.data)
      setUserData(userData)
      setCreatorId(id);
      SetCreatorIpfsHash(creatorHash);
      setCreatorContractAddress(creatorContractAddress);
      setStaked(creatorBalance)
    };

    getCreatorId();

  }, []);

  const getImage = (rawImage) => {
    let reader = new FileReader();
    reader.readAsDataURL(rawImage)
    reader.onload = () => {
      setCreatorImage(reader.result);
    }
  }

  const checkWeb3Modal = () => {
    if (!web3Provider) {
      getWalletProvider().then((provider) => {
        if (provider) {
          dispatch({
            type: SET_WEB3_PROVIDER,
            value: provider,
          });
        }
      });
    }
  }

  const depositCreator = async (e) => {
     e.preventDefault()
     checkWeb3Modal()
    
    const contract = new CreatorContract(web3Provider.getSigner(), creatorContractAddress[0])
    await contract.depositFunds(BigNumber.from("42"));
  
  }

  const approveDeposit = async (e) => {
    e.preventDefault()
    checkWeb3Modal()
   const contract = new CreatorContract(web3Provider.getSigner(), creatorContractAddress[0])
 }

  const truncateString = (str, num) =>  (
      str.slice(0, num / 2) +
      "..." +
      str.slice(str.length - num / 2, str.length)
    );
  

  return (
    creatorExists ? (
      <div>{creatorExists}</div>
    ) : (
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
            {userData && <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <img
                          alt="..."
                          className="my-rounded-cirlce"
                          src={creatorImage ? creatorImage : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
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
                          onClick={depositCreator}
                          size="sm"
                        >
                          Go Live
                        </Button>

                        <Button
                          className="float-right"
                          color="default"
                          onClick={depositCreator}
                          size="sm"
                        >
                          Deposit Pool
                        </Button>

                        <Button
                          className="float-right"
                          color="default"
                          onClick={approveDeposit}
                          size="sm"
                        >
                          Approve
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
                          <span className="heading">{staked}</span>
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
                    <h3>{userData.username}</h3>
                    <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {truncateString(
                        userData.creatorAddress,
                        10
                      )}
                    </div>
                    <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {userData.fullName}
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
                          {userData.description}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Container>}
          </section>
        </main>
        <CardsFooter />
      </>

    )
  );

};

export default Profile;
