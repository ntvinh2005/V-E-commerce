import React from "react";
import NavbarElement from "../Element/NavbarElement";
import SearchBar from "../Element/SearchBar";
import { useMall } from "../../contexts/MallContext";
import { Container } from "react-bootstrap";
import ShopItem from "../Shop/ShopItem";

const Mall = () => {
  const {
    MallState: { allItems },
  } = useMall();

  return (
    <div>
      <NavbarElement />
      <Container fluid>
        <br />
        <br /> <br />
        <SearchBar className="mt-5" />
        <hr />
        {allItems.length > 0 && (
          <div className="d-flex flex-wrap text-center align-items-center justify-content-center">
            {allItems.map((childitem) => (
              <div
                key={childitem.id}
                style={{ maxWidth: "400px" }}
                className="p-2"
              >
                {childitem.url != "" && (
                <ShopItem item={childitem}></ShopItem>
              )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Mall;
