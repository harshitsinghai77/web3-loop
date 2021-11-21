import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Container, Row, Col } from "reactstrap";
import { BigNumber } from "@ethersproject/bignumber";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";
import HeroComponent from "../../components/Hero/hero";
import SpinnerComponent from "../../components/Spinner";
import { burnerContract, CreatorContract } from "../../smartContract";
import {
  retrieveDataFromIPFS,
  retrieveImageFromIPFS,
} from "../../utils/ipfsConfig";
import { getLocalProvider } from "../../utils/connectWallet";
import { store } from "../../store/store";

const defaultImage =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

const Profile = (props) => {
  const globalState = useContext(store);
  const { web3Provider } = globalState.state;

  const [userData, setUserData] = useState();
  const [creatorId, setCreatorId] = useState();
  const [creatorContractAddress, setCreatorContractAddress] = useState();
  const [creatorIpfsHash, SetCreatorIpfsHash] = useState();

  const [creatorExists, setCreatorExists] = useState();
  const [stats, setStats] = useState({});
  const creatorAddress = props.match.params.address;

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    const getCreatorId = async () => {
      let id = await burnerContract.getCreatorIdFromAddress(creatorAddress);
      id = parseInt(id.toString());
      const creatorHash = await burnerContract.getCreatorFromId(id);

      if (creatorHash[0] === "Paradise Biryani") {
        setCreatorExists("Creator is not registered!");
        return;
      }
      const creatorContractAddress = await burnerContract.getContractFromId(id);

      const localProvider = await getLocalProvider().getSigner();
      const creatorContract = new CreatorContract(
        localProvider,
        creatorContractAddress[0]
      );
      const creatorBalance = await creatorContract.creatorBalance();
      const fanCount = await creatorContract.totalFanCount();
      const fanDepositAmount = 0
      //await creatorContract.fanDepositAmount();

      let userData = await retrieveDataFromIPFS(creatorHash);
      userData = userData.data;
      const userImageHash = userData["userImage"];
      const userImageFromIpfs = await retrieveImageFromIPFS(userImageHash);
      const imgSrc = URL.createObjectURL(userImageFromIpfs.data);
      userData["imgSrc"] = imgSrc;

      setUserData(userData);
      setCreatorId(id);
      SetCreatorIpfsHash(creatorHash);
      setCreatorContractAddress(creatorContractAddress);
      setStats({
        creatorBalance: creatorBalance.toString(),
        fanCount: fanCount.toString(),
        fanDepositAmount: fanDepositAmount.toString(),
      });
    };

    getCreatorId();
  }, [creatorAddress]);

  const depositCreator = async (e) => {
    e.preventDefault();
    if (!web3Provider) {
      console.log("web3Provider is not defined");
      return;
    }
    const contract = new CreatorContract(
      web3Provider.getSigner(),
      creatorContractAddress[0]
    );
    await contract.depositFunds(BigNumber.from("42"));
  };

  const withdrawPool = async (e) => {
    e.preventDefault();
    if (!web3Provider) {
      console.log("web3Provider is not defined");
      return;
    }

    const contract = new CreatorContract(
      web3Provider.getSigner(),
      creatorContractAddress[0]
    );
    await contract.withdrawFundsFan();
  };

  const approveDeposit = async (e) => {
    e.preventDefault();
    if (!web3Provider) {
      console.log("Web3Model not found");
      return;
    }
    const contract = new CreatorContract(
      web3Provider.getSigner(),
      creatorContractAddress[0]
    );
    contract.approveWETH();
  };

  const truncateString = (str, num) =>
    str.slice(0, num / 2) + "..." + str.slice(str.length - num / 2, str.length);

  return creatorExists ? (
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
          <Container>
            <Card className="card-profile shadow mt--300">
              <div className="px-4">
                {userData ? (
                  <>
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                          <img
                            alt="..."
                            className="my-rounded-cirlce"
                            src={
                              userData["imgSrc"]
                                ? userData["imgSrc"]
                                : defaultImage
                            }
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
                            className="mr-4"
                            color="info"
                            onClick={withdrawPool}
                            size="sm"
                          >
                            Withdraw Pool
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
                            <span className="heading">{stats.fanCount}</span>
                            <span className="description">Stakers</span>
                          </div>
                          <div>
                            <span className="heading">{stats.creatorBalance}</span>
                            <span className="description">Staked</span>
                          </div>
                          <div>
                            <span className="heading">{stats.fanDepositAmount}</span>
                            <span className="description">Earned</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="text-center mt-5">
                      <h3>{userData.username}</h3>
                      <div className="h6 font-weight-300">
                        {truncateString(userData.creatorAddress, 10)}
                      </div>

                      <div className="h6 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />
                        {userData.fullName}
                      </div>
                      <div>
                        <Button
                          className="btn-icon-only rounded-circle mr-2"
                          href={userData.socialMedia.twitterHandle}
                          target="_blank"
                        >
                          <i className="fa fa-twitter" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle mr-2"
                          href={userData.socialMedia.instagramHandle}
                          target="_blank"
                        >
                          <i className="fa fa-instagram" />
                        </Button>
                        <Button
                          className="btn-icon-only rounded-circle mr-2"
                          href={userData.socialMedia.youtubeChannel}
                          target="_blank"
                        >
                          <i className="fa fa-youtube" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-5 py-5 border-top text-center">
                      <Row className="justify-content-center">
                        <Col lg="9">
                          <p>{userData.description}</p>
                        </Col>
                      </Row>
                    </div>
                  </>
                ) : (
                  <SpinnerComponent />
                )}
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
