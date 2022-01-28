import React from "react";
import NavbarElement from "../Element/NavbarElement";
import Shop from "../Shop/Shop";
import RecipientPlace from "./RecipientPlace";
import { Container } from "react-bootstrap";
import ChatBox from "../Element/Chat/ChatBox"
import ChatbotBox from "../Element/Chat/ChatbotBox"

const Dashboard = () => {
  return (
    <div>
      <NavbarElement></NavbarElement>
      <Container fluid className="mall-container">
        <h2 className="ms-3 mt-3">Dashboard</h2>
        <hr />
        <Shop></Shop>
        <hr />
        <h3 className="ms-3">Customer's recipients</h3>
        <RecipientPlace/>
        <ChatbotBox />
        <ChatBox />
      </Container>
    </div>
  );
};

export default Dashboard;
