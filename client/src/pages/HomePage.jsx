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
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //Get All Categories
  const getAllCategories = async () => {
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
      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

    //getTotal Count 
    const getTotal= async()=>{
      try {
        const {data} = await axios.get('/api/v1/product/product-count')
        setTotal(data?.total)
      } catch (error) {
        console.log(error)
      }
    }


    useEffect(()=>{
      if(page === 1) return;
      loadMore();
    },[page])
    
    //loadmore products
    const loadMore =async()=>{
      try {
        setLoading(true)
        const {data} = await axios.get(`/api/v1/product/product-list/${page}`)
        setProducts([...products,...data?.products])
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

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
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  //Get Filtered Products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      console.log(data)
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

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
          <div className="d-flex m-3">
            <button className="btn btn-danger" onClick={()=> window.location.reload()}>Reset Filters</button>
          </div>
        </div>
        <div className="col-md-9">
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
                  <p className="card-text">
                    {product.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {product.price}</p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-2">
              {products && products.length < total && (
                <button className="btn btn-warning" onClick={(e)=>{
                  e.preventDefault();
                  setPage(page+1);
                }}>
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
