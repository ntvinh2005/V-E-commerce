import React from "react";
import NavbarElement from "../Element/NavbarElement";
import Shop from "../Shop/Shop";
import RecipientPlace from "./RecipientPlace";
import { Container } from "react-bootstrap";

const Dashboard = () => {
  return (
    <div>
      <NavbarElement></NavbarElement>
      <Container fluid>
        <h2 className="ms-3 mt-3">Dashboard</h2>
        <hr />
        <Shop></Shop>
        <hr />
        <h3 className="ms-3">Customer's recipients</h3>
        <RecipientPlace />
      </Container>
    </div>
  );
};

export default Dashboard;
