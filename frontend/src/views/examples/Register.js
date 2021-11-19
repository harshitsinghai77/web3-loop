import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	UncontrolledAlert,
	Container,
	Row,
	Col,
} from "reactstrap";

import HeroComponent from "../../components/Hero/hero";
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

import { Contract } from "../../smartContract";
import { getWalletProvider } from "../../utils/connectWallet";
import { uploadMetadataToIPFS } from "../../utils/ipfsConfig";
import { UploadImage } from "./RegisterUtils.js";
import { store } from "../../store/store";
import { SET_WEB3_PROVIDER } from "../../store/types";

const Register = () => {
	const globalState = useContext(store);
	const { dispatch } = globalState;
	const { web3Provider } = globalState.state;
	const [address, setAddress] = useState();
	const [showAlert, setShowAlert] = useState(false);
	const [userImage, setUserImage] = useState();

	const [socialMediaLinks, setSocialMediaLinks] = useState([]);

	const history = useHistory();

	useEffect(() => {
		document.scrollingElement.scrollTop = 0;
		document.documentElement.scrollTop = 0;

		setSocialMediaLinks((oldState) => [
			...oldState,
			<InputGroup className="input-group-alternative mb-3">
				<InputGroupAddon addonType="prepend">
					<InputGroupText>
						<i className="ni ni-single-02" />
					</InputGroupText>
				</InputGroupAddon>
				<Input placeholder="Username" type="text" />
			</InputGroup>,
		]);
	}, []);

	useEffect(() => {
		if (!web3Provider) return;
		const signer = web3Provider.getSigner();
		signer.getAddress().then((resp) => setAddress(resp));
	}, [web3Provider]);

	const onAddSocialLink = () => {
		setSocialMediaLinks((oldState) => [
			...oldState,
			<InputGroup className="input-group-alternative mb-3">
				<InputGroupAddon addonType="prepend">
					<InputGroupText>
						<i className="ni ni-single-02" />
					</InputGroupText>
				</InputGroupAddon>
				<Input placeholder="Add Social Link" type="text" />
			</InputGroup>,
		]);
	};

	const onImageUploadHandler = (bufferedImage) => {
		setUserImage(bufferedImage);
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault();
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

		if (!userImage) {
			setShowAlert((prevState) => !prevState);
			return;
		}
		setShowAlert(false);
		const jsonData = {
			username: event.target.username.value,
			fullName: event.target.full_name.value,
			description: event.target.description.value,
			creatorAddress: address,
		};

		const socialLinks = {
			twitterHandle: event.target.twitter.value,
			instagramHandle: event.target.instagram.value,
			youtubeChannel: event.target.youtube.value,
		};

		const hash = await uploadMetadataToIPFS(
			jsonData,
			socialLinks,
			userImage
		);

		const contract = new Contract(web3Provider.getSigner());
		contract.addCreator(hash).then((resp) => {
			history.push("/" + address);
		});
	};

	return (
		<>
			<DemoNavbar />
			<main>
				<section className="section landing-page section-lg">
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

					<Container className="pt-lg-7 register-overlay">
						<Row className="justify-content-center">
							<Col lg="5">
								<Card className="bg-secondary shadow border-0">
									<CardHeader className="bg-white">
										<div className="text-muted text-center">
											<small>Register Creator</small>
										</div>
									</CardHeader>
									<CardBody className="px-lg-5 py-lg-5">
										<Form
											role="form"
											onSubmit={onSubmitHandler}
										>
											<UploadImage
												onImageUploaded={
													onImageUploadHandler
												}
											/>
											<FormGroup>
												<InputGroup className="input-group-alternative mb-3">
													<InputGroupAddon addonType="prepend">
														<InputGroupText>
															<i className="ni ni-circle-08" />
														</InputGroupText>
													</InputGroupAddon>
													<Input
														placeholder="Full Name"
														name="full_name"
														type="text"
													/>
												</InputGroup>
												<InputGroup className="input-group-alternative mb-3">
													<InputGroupAddon addonType="prepend">
														<InputGroupText>
															<i className="ni ni-single-02" />
														</InputGroupText>
													</InputGroupAddon>
													<Input
														placeholder="Username"
														name="username"
														type="text"
													/>
												</InputGroup>
												<InputGroup className="input-group-alternative mb-3">
													<InputGroupAddon addonType="prepend">
														<InputGroupText>
															<i className="ni ni-single-copy-04" />
														</InputGroupText>
													</InputGroupAddon>
													<Input
														placeholder="Description"
														name="description"
														type="textarea"
													/>
												</InputGroup>

												<InputGroup className="input-group-alternative mb-3">
													<InputGroupAddon addonType="prepend">
														<InputGroupText>
															<i className="ni ni-single-copy-04" />
														</InputGroupText>
													</InputGroupAddon>
													<Input
														placeholder="Youtube"
														name="youtube"
														type="text"
													/>
												</InputGroup>

												<InputGroup className="input-group-alternative mb-3">
													<InputGroupAddon addonType="prepend">
														<InputGroupText>
															<i className="ni ni-single-copy-04" />
														</InputGroupText>
													</InputGroupAddon>
													<Input
														placeholder="Instagram"
														name="instagram"
														type="text"
													/>
												</InputGroup>

												<InputGroup className="input-group-alternative mb-3">
													<InputGroupAddon addonType="prepend">
														<InputGroupText>
															<i className="ni ni-single-copy-04" />
														</InputGroupText>
													</InputGroupAddon>
													<Input
														placeholder="Twitter"
														name="twitter"
														type="text"
													/>
												</InputGroup>

												{/* {socialMediaLinks.map((el) => el)} */}
												{/* <div className="text-right">
													<Button
														className="text-primary"
														color="link"
														size="sm"
														onClick={() =>
															onAddSocialLink()
														}
													>
														Add Social Link
													</Button>
												</div> */}
												{/* <div className="text-right">
													<Button
														className="text-primary"
														color="link"
														size="sm"
														onClick={() =>
															onAddSocialLink()
														}
													>
														Add Social Link
													</Button>
												</div> */}
											</FormGroup>

											<div className="text-muted font-italic">
												<small>
													Address &nbsp;
													{address ? (
														<span className="text-success font-weight-700">
															{address}
														</span>
													) : (
														<span className="text-warning font-weight-700">
															No Address Found
														</span>
													)}
												</small>
											</div>
											<Row className="my-4">
												<Col xs="12">
													<div className="custom-control custom-control-alternative custom-checkbox">
														<input
															className="custom-control-input"
															id="customCheckRegister"
															type="checkbox"
														/>
														<label
															className="custom-control-label"
															htmlFor="customCheckRegister"
														>
															<span>
																I agree with the{" "}
																<a
																	href="#pablo"
																	onClick={(
																		e
																	) =>
																		e.preventDefault()
																	}
																>
																	Privacy
																	Policy
																</a>
															</span>
														</label>
													</div>
												</Col>
											</Row>
											<UncontrolledAlert
												color="danger"
												fade={false}
												isOpen={showAlert}
												toggle={() =>
													setShowAlert(
														(prevState) =>
															!prevState
													)
												}
											>
												<span className="alert-inner--text ml-1">
													<strong>
														No Image Found
													</strong>{" "}
													Please upload your image to
													get started!
												</span>
											</UncontrolledAlert>
											<div className="text-center">
												<Button
													className="mt-4"
													color="primary"
													type="submit"
												>
													Get Started
												</Button>
											</div>
										</Form>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</Container>
				</section>
			</main>
			{/* <SimpleFooter /> */}
		</>
	);
};

export default Register;
