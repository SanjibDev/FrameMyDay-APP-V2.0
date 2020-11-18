import React from 'react';
import { useHistory } from 'react-router-dom';
import './Registration.css';
import { registrationForm } from './RegistrationTypes';
import {
    Container, Row, Col, Form,
    FormGroup, Label, Input,
    Button, Card, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import logo from './../../../contents/images/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { GET, POST } from './../../../core/services/apiHelper';
import { CheckEmailIdExistOrNot, CreateRegistration } from './../../../core/services/apiURLHelper';

const Registration = () => {
    const { register, handleSubmit, errors } = useForm<registrationForm>({
        defaultValues: {
            name: '',
            emailId: '',
            contactNo: '',
            role: '0'
        }
    });

    const history = useHistory();

    const isEmailExists = async (email: string) => {
        try {
            let response = await GET(CheckEmailIdExistOrNot(email));
            if (response.status === 200) {
                let IsEmailexists = await response.json();
                return !IsEmailexists;
            } else {
                return false;
            }
        } catch (err) {
            console.log('err', err);
            toast.error("Some error has occured!");
        }
    };

    const submitRegistrationForm = async (registrationFormData: registrationForm) => {
        let finalData = {
            name: registrationFormData.name,
            emailId: registrationFormData.emailId,
            contactNo: '+91'+registrationFormData.contactNo,
            role: registrationFormData.role
        }
        try {
            let response = await POST(CreateRegistration(), finalData);
            if (response.status === 201) {
                Swal.fire({
                    title: 'Registration Successful!',
                    text: 'A temporary password has been sent to your email. Please change the password as soon as possible. Enjoy!',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result) {
                        history.push("/login");
                    }
                });
            } else {
                toast.error("Some error has occured!");
            }

        } catch (err) {
            console.log('err', err);
            toast.error("Some error has occured!");
        }
    }

    return (
        <React.Fragment>
            <ToastContainer />
            <Container fluid className="fullHeight publicBackground">
                <Row className="fullHeight">
                    <Col sm="12" md={{ size: 6, offset: 3 }} className="my-auto">
                        <Card className="loginRegistrationcardShadow">
                            <CardBody>
                                <img src={logo} alt="Not found" className="publicLogo" />
                                <h4>Registration</h4>
                                <Form className="form" onSubmit={handleSubmit(submitRegistrationForm)}>
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
                                            innerRef={register({ required: true, validate: isEmailExists })}
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
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="role" value="0" innerRef={register({ required: true })} />{' '}
                                                I am a service provider
                                        </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="role" value="1" innerRef={register({ required: true })} />{' '}
                                                I am a service seeker
                                        </Label>
                                        </FormGroup>
                                    </FormGroup>

                                    <Button type="submit" color="primary">Register</Button>
                                </Form>
                                <div>Already have an account! <Link to='/login'>Login Now!</Link></div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Registration;