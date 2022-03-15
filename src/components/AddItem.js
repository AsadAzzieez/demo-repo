import React from 'react'
import { useState } from 'react';

const AddItem = ({addItem}) => {
    const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [pharmacySKU, setPharmacySku] = useState("");
  const [logo, setLogo] = useState("");
  const [pharmacyCompany, setPharmacyCompany] = useState("");
  const [size, setSize] = useState("");
  const [UPC, setUpc] = useState("");
  

  const onSubmit = (e) => {
    e.preventDefault();
    addItem({ name, brand, pharmacyCompany, pharmacySKU, size, logo, UPC });
    setName('');
    setBrand('');
    setUpc('');
    setLogo('');
    setSize('');
    setPharmacyCompany('');
    setPharmacySku('');
  };
  
  return (
    <div>
      <h1>Add Item</h1>
        <form className="add-form" onSubmit={onSubmit}>
          <div>
            <div className="form-control">
              <label>Name</label><br />
              <input
                type="text"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Brand</label><br />
              <input
                type="text"
                placeholder=""
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>size</label><br />
              <input
                type="text"
                placeholder=""
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>UPC</label><br />
              <input
                type="text"
                placeholder=""
                value={UPC}
                onChange={(e) => setUpc(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>logo</label><br />
              <input
                type="text"
                placeholder=""
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label>Pharmacy SKU</label><br />
              <input
                type="text"
                placeholder=""
                value={pharmacySKU}
                onChange={(e) => setPharmacySku(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label>Pharmacy Company</label><br />
              <input
                type="text"
                placeholder=""
                value={pharmacyCompany}
                onChange={(e) => setPharmacyCompany(e.target.value)}
              />
            </div>

            <input type="submit" value="Save Item" className="btn btn-block" />
          </div>
        </form>
    </div>
  )
}

export default AddItem