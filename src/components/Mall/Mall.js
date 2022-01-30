import React from "react";
import NavbarElement from "../Element/NavbarElement";
import SearchBar from "../Element/SearchBar";
import { useMall } from "../../contexts/MallContext";
import { Container } from "react-bootstrap";
import ShopItem from "../Shop/ShopItem";
import ChatbotBox from "../Element/Chat/ChatbotBox";
import ChatBox from "../Element/Chat/ChatBox";

const Mall = () => {
  const {
    MallState: { allItems },
  } = useMall();

  let fallItems = [];
  let i = 0;

  while (i < allItems.length) {
    if (!fallItems.includes(allItems[i].name)) fallItems.push(allItems[i].name);
    i += 1;
  }

  console.log(fallItems);

  return (
    <div>
      <NavbarElement />
      <Container fluid className="mall-container">
        <br />
        <br /> <br />
        <SearchBar className="mt-5" datalist={fallItems}/>
        <hr />
        {allItems.length > 0 && (
          <div className="d-flex flex-wrap text-center align-items-center justify-content-center">
            {allItems.map((childitem) => (
              <div
                key={childitem.id}
                style={{ maxWidth: "400px" }}
                className="p-2"
              >
                {childitem.url !== "" && <ShopItem item={childitem}></ShopItem>}
              </div>
            ))}
          </div>
        )}
        <ChatbotBox />
        <ChatBox />
        <br />
        <br />
        <br />
      </Container>
    </div>
  );
};

export default Mall;
