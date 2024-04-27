import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Card, CardBody } from "reactstrap";

const Home = (props) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Retrieve items from localStorage
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(savedItems);
  }, []);

  const handleEditListClick = () => {
    navigate("/lists"); // Navigate to the '/lists' route
  };

  return (
    <div>
      <h2 className="App-header mb-3">Inventory List</h2>
      <div className="d-flex justify-content-center">
        <Card className="w-50">
          <CardBody>
            <Table striped className="">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <button className="btn btn-primary" onClick={handleEditListClick}>
              Edit List
            </button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export { Home };
