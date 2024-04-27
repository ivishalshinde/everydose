import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Row,
  Col,
  InputGroup,
  Table,
  FormGroup,
  Label,
  Form,
} from "reactstrap";
import { RxCross2 } from "react-icons/rx";

const Lists = (props) => {
  const [items, setItems] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);
  const [switchStatus, setSwitchStatus] = useState(true);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    const savedDeletedItems =
      JSON.parse(localStorage.getItem("deletedItems")) || [];
    // console.log("Saved items first:", savedItems);
    setItems((prev) => {
      return [...prev, ...savedItems];
    });

    setDeletedItems((prev) => {
      return [...prev, ...savedDeletedItems];
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("deletedItems", JSON.stringify(deletedItems));
  }, [deletedItems]);

  const addItem = () => {
    if (itemName.trim() !== "" && itemQuantity.trim() !== "") {
      const newItem = { name: itemName, quantity: itemQuantity };
      setItems([...items, newItem]);
      setItemName("");
      setItemQuantity("");
    }
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    const deletedItem = updatedItems.splice(index, 1)[0];
    setItems(updatedItems);
    setDeletedItems([...deletedItems, deletedItem]);
  };

  const clearAllItems = () => {
    setDeletedItems([...deletedItems, ...items]);
    setItems([]);
  };

  return (
    <div>
      <h2 className="App-header">Edit List</h2>
      <div className="d-flex justify-content-center">
        <Card className="w-50">
          <CardBody>
            <Row className="">
              <Col xs={8}>
                <FormGroup className="text-start">
                  <Label className="text-red" for="exampleEmail">
                    <b>Item Name *</b>
                  </Label>

                  <Input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    // placeholder="Enter item name"
                    className="bg-gray"
                  />
                </FormGroup>
              </Col>
              <Col xs={4}>
                <FormGroup className="text-start">
                  <Label className="text-red" for="exampleEmail">
                    <b>Quantity *</b>
                  </Label>
                  <InputGroup>
                    <Input
                      type="number"
                      value={itemQuantity}
                      onChange={(e) => setItemQuantity(e.target.value)}
                      // placeholder="Quantity"
                      className="bg-gray"
                    />
                    <Button color="primary" onClick={addItem}>
                      Add
                    </Button>
                  </InputGroup>
                </FormGroup>
              </Col>
              <span className="text-start lable-text-sm">
                To get started, add 1 more items
              </span>
            </Row>
            {/* <span className="text-start">To get started, add 1 more items</span> */}
            <Table className="mt-4">
              <thead>
                <tr className="table-light">
                  <th colSpan={3}>Inventory List</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Button color="" onClick={() => deleteItem(index)}>
                        <RxCross2 color="red" size={25} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Row>
              <Col sm={4}></Col>
              <Col sm={4}></Col>
              <Col sm={4}>
                <div className="text-right">
                  <Button outline color="secondary" onClick={clearAllItems}>
                    Clear All
                  </Button>
                </div>
              </Col>
            </Row>

            <Form>
              <FormGroup switch className="mt-3">
                <Input
                  type="switch"
                  id="deletedItemsSwitch"
                  checked={switchStatus}
                  onChange={() => setSwitchStatus(!switchStatus)}
                />
                <Label className="text-start" for="deletedItemsSwitch" check>
                  View Deleted Items
                </Label>
              </FormGroup>
            </Form>
            {switchStatus && deletedItems.length > 0 && (
              <Table className="mt-4">
                <thead>
                  <tr className="table-light">
                    <th>Deleted Item Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export { Lists };
