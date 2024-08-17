import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  //get all Categories
  const getAllCategories = async (req, res) => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong In Getting Categories");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {categories.map((c) => (
                      <>
                      <td key={c._id}>{c.name}</td>
                      <td><button className="btn btn-primary">Edit</button>
                      <button className="btn btn-danger">Delete</button>
                      </td>
                      </>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
