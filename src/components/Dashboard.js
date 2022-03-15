import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import AddItem from "./AddItem";
import { AllItems } from "./AllItems";
import Orders from "./Orders";
const itemReq_URL = "/item-requests";
const orderReq_URL = "/orders";

const Dashboard = ({ accessToken }) => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);
  const [showAllOrder, setShowAllOrder] = useState(false);

  useEffect(() => {
    console.log("inside useEffect")
    const getItemsandOrder = async () => {
      const itemsFromserver = await fetchItems();
      const ordersFromServer = await fetchOrders();
      setItems(itemsFromserver);
      setOrders(ordersFromServer);
    };
    getItemsandOrder();
  }, []);
  const authAxios = axios.create({
    baseURL: "http://dev-api.trysedalia.com",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const fetchOrders = async () => {
    return authAxios
      .get(orderReq_URL, {
        params: { includeCount: true, _start: 0, _limit: 10 },
      })
      .then((res) => {
        console.log("order:: " + res.data);
        return res.data;
      });
  };

  const fetchItems = async () => {
    try {
      return authAxios.get(itemReq_URL).then((res) => {
        console.log(res.data);
        return res.data;
      });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  console.log("accessToken:: " + accessToken);

  const addItem = async (item) => {
    try {
      console.log(JSON.stringify(item));
      const response = await authAxios.post(
        itemReq_URL,
        JSON.stringify({
          item,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
      console.log(response);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed!");
      }
    }
  };

  return (
    <>
      <div className="container">
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <button
          onClick={() => setShowAddItem(!showAddItem)}
          style={{ backgroundColor: "red" }}
          className="btn"
        >
          Add
        </button>
        <button
          onClick={() => setShowAllItems(!showAllItems)}
          style={{ backgroundColor: "green" }}
          className="btn"
        >
          Show All Items
        </button>
        <button
          onClick={() => setShowAllOrder(!showAllOrder)}
          style={{ backgroundColor: "orange" }}
          className="btn"
        >
          Show All Orders
        </button>
        {showAddItem && <AddItem addItem={addItem} />}
        {showAllItems && <AllItems items={items}></AllItems>}
        {showAllOrder && <Orders orders={orders}></Orders>}
      </div>
    </>
  );
};

export default Dashboard;
