import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  //Get All Categories
  const getAllCategories = async (req, res) => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Get All Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  //Filter by Category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((category) => category !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <Layout title={"All Product - Best Offer"}>
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories.map((category) => (
              <Checkbox
                key={category._id}
                onChange={(e) => handleFilter(e.target.checked, category._id)}
              >
                {category.name}
              </Checkbox>
            ))}
          </div>

        <h4 className="mt-3">Filter By Price</h4>
        <div className="d-flex flex-column">
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Prices?.map((price) => (
              <div className="">
                <Radio value={price.array}>{price.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
      </div>
            </div>
      <div className="col-md-11">
        <h1 className="text-center">All Products</h1>
        <div className="d-flex flex-wrap">
          {products?.map((product) => (
            <div className="card  m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <button class="btn btn-primary ms-1">More Details</button>
                <button class="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
