import React from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import { loginForm } from './LoginTypes';
import {
    Container, Row, Col, Form,
    FormGroup, Label, Input,
    Button, Card, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import logo from './../../../contents/images/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import { POST } from './../../../core/services/apiHelper';
import { CheckAuthentication } from './../../../core/services/apiURLHelper';

const Login = () => {
    const { register, handleSubmit, errors } = useForm<loginForm>({
        defaultValues: {
            emailId: '',
            password: ''
        }
    });

    const history = useHistory();

    const submitLoginForm = async (loginFormData: loginForm) => {
        try {
            let response = await POST(CheckAuthentication(), loginFormData);
            if (response.status === 200) {
                localStorage.setItem('FrameMyDayToken', '1234567890'); //token will be implemented in future;
                history.push("/dashboard");
            } else {
                toast.error("Invalid email or password");
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
                                <h4>Log In</h4>
                                <Form className="form" onSubmit={handleSubmit(submitLoginForm)}>
                                    <FormGroup>
                                        <Label className="required" for="emailId">Email</Label>
                                        <Input
                                            type="email"
                                            name="emailId"
                                            innerRef={register({ required: true })}
                                        />
                                        {errors.emailId && errors.emailId.type === "required" && <span className="errorMsg">Please enter a valid email</span>}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label className="required" for="password">Password</Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            innerRef={register({ required: true })}
                                        />
                                        {errors.password && errors.password.type === "required" && <span className="errorMsg">Please enter password</span>}
                                    </FormGroup>
                                    <Button type="submit" color="primary">Login</Button>
                                </Form>
                                <div>Not registered yet! <Link to='/registration'>Register Now!</Link></div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Login;