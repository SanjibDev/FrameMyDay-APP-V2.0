import React from 'react';
import './Dashboard.css';
import {
    Container
} from 'reactstrap';
import Header from './../../../shared/components/Header/Header';
import Footer from './../../../shared/components/Footer/Footer';

const Dashboard = () => {
    return (
        <React.Fragment>
            <Header/>
            <Container fluid>
                <h4>This is dashboard</h4>
            </Container>
            <Footer/>
        </React.Fragment>
    )
}

export default Dashboard;