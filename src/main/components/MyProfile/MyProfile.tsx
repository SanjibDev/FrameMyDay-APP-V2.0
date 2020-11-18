import React, { useEffect, useState } from 'react';
import './MyProfile.css';
import { myprofileForm } from './MyProfileTypes';
import {
    Container, Row, Col, Form,
    FormGroup, Label, Input,
    Button, TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';
import classnames from 'classnames';
import { useForm } from "react-hook-form";
import Header from './../../../shared/components/Header/Header';
import Footer from './../../../shared/components/Footer/Footer';
import avatar from './../../../contents/images/avatar.png';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import { GET } from './../../../core/services/apiHelper';
import { GetUserProfile } from './../../../core/services/apiURLHelper';


const scaryAnimals = [
    { label: "Alligators", value: 1 },
    { label: "Crocodiles", value: 2 },
    { label: "Sharks", value: 3 },
    { label: "Small crocodiles", value: 4 },
    { label: "Smallest crocodiles", value: 5 },
    { label: "Snakes", value: 6 },
];

const MyProfile = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab: any) => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const { register, handleSubmit, errors } = useForm<myprofileForm>({
        defaultValues: {
            name: '',
            emailId: '',
            contactNo: '',
            role: '0'
        }
    });

    const GetUserProfileData = async () => {
        try {
            let userId = 'dbcf2cc0-343b-416a-88da-3ae4fe99184d';
            let response = await GET(GetUserProfile(userId));
            console.log('response', response);
            if (response.status === 200) {
                let userProfileData = await response.json();
                console.log('userProfileData', userProfileData);
            } else {
                toast.error("Some error has occured!")
            }
        } catch (err) {
            console.log('err', err);
            toast.error("Some error has occured!");
        }
    }
    useEffect(() => { GetUserProfileData() });

    const submitMyProfileForm = async (myprofileFormData: myprofileForm) => {
        let finalData = {
            name: myprofileFormData.name,
            emailId: myprofileFormData.emailId,
            contactNo: '+91' + myprofileFormData.contactNo,
            role: myprofileFormData.role
        }
        console.log('finalData', finalData);
        // try {
        //     let response = await POST(CreateRegistration(), finalData);
        //     if (response.status === 201) {
        //         Swal.fire({
        //             title: 'Registration Successful!',
        //             text: 'A temporary password has been sent to your email. Please change the password as soon as possible. Enjoy!',
        //             icon: 'success',
        //             confirmButtonText: 'Ok'
        //         }).then((result) => {
        //             if (result) {
        //                 history.push("/login");
        //             }
        //         });
        //     } else {
        //         toast.error("Some error has occured!");
        //     }

        // } catch (err) {
        //     console.log('err', err);
        //     toast.error("Some error has occured!");
        // }
    }

    return (
        <React.Fragment>
            <ToastContainer />
            <Header />
            <Container fluid>
                <h4>My Profile</h4>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Personal Details
                            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Work Profile and Presence
                            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}
                        >
                            Bank details and KYC
                            </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row className="fullHeight">
                            <Col sm="12" md={{ size: 6 }} >
                                <Form className="form" onSubmit={handleSubmit(submitMyProfileForm)}>
                                    <img src={avatar} alt="Not found" className="profilePicture" />
                                    <FormGroup>
                                        <Input type="file" name="file" id="profilePic" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="required" for="name">Name</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            innerRef={register({ required: true, maxLength: 35 })}
                                        />
                                        {errors.name && errors.name.type === "required" && <span className="errorMsg">Please enter your name</span>}
                                        {errors.name && errors.name.type === "maxLength" && <span className="errorMsg">Name can not be more than 35 characters</span>}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="required" for="emailId">Email</Label>
                                        <Input
                                            type="email"
                                            name="emailId"
                                            innerRef={register({ required: true })}
                                            disabled={true}
                                        />
                                        {errors.emailId && errors.emailId.type === "required" && <span className="errorMsg">Please enter a valid email</span>}
                                        {errors.emailId && errors.emailId.type === "validate" && <span className="errorMsg">Email already exists</span>}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="required" for="contactNo">Contact No</Label>
                                        <Input
                                            type="number"
                                            name="contactNo"
                                            innerRef={register({ required: true, maxLength: 10 })}
                                        />
                                        {errors.contactNo && errors.contactNo.type === "required" && <span className="errorMsg">Please enter your contact no</span>}
                                        {errors.contactNo && errors.contactNo.type === "maxLength" && <span className="errorMsg">Please enter valid contact no</span>}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="aboutme">About Me</Label>
                                        <Input type="textarea" name="text" id="aboutme" />
                                    </FormGroup>

                                    <Button type="submit" color="primary">Update</Button>
                                </Form>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row className="fullHeight">
                            <Col sm="12" md={{ size: 6 }} >
                                <Form className="form" onSubmit={handleSubmit(submitMyProfileForm)}>
                                    <FormGroup>
                                        <Label for="aboutme">Skill tags</Label>
                                        <Select options={scaryAnimals}
                                            isMulti={true}
                                            onChange={opt => console.log(opt)} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="fbprofile">FB profile/page link</Label>
                                        <Input
                                            type="text"
                                            name="fbprofile"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="fbprofile">Instragram profile link</Label>
                                        <Input
                                            type="text"
                                            name="fbprofile"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="fbprofile">Twitter profile link</Label>
                                        <Input
                                            type="text"
                                            name="fbprofile"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="fbprofile">Flicker profile link</Label>
                                        <Input
                                            type="text"
                                            name="fbprofile"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="fbprofile">Youtube Chanel link</Label>
                                        <Input
                                            type="text"
                                            name="fbprofile"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="fbprofile">Website/Portfolio link</Label>
                                        <Input
                                            type="text"
                                            name="fbprofile"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="aboutme">Any special mentions</Label>
                                        <Input type="textarea" name="text" id="aboutme" placeholder="Anything special about you and your work, can be any achievement you have made or any award you have received" />
                                    </FormGroup>
                                    <Button type="submit" color="primary">Update</Button>
                                </Form>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row className="fullHeight">
                            <Col sm="12" md={{ size: 6 }} >
                                Comming Shortly
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>

            </Container>
            <Footer />
        </React.Fragment>
    )
}

export default MyProfile;