import React from "react";

const CategoryForm = ({handleSubmit,setValue,value}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input className="form-control w-75" placeholder="Enter new Category" value={value} onChange={(e)=> setValue(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
