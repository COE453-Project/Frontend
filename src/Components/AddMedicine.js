import { useState } from "react";
import "./AddMedicine.css";
import { useNavigate } from "react-router-dom";

function AddMedicine() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [productionDate, setProductionDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");


  let query = `mutation addMedicine($name: String, $description: String, $productionDate: String, $expiryDate: String){
    addMedicine(name: $name, description: $description, productionDate: $productionDate, expiryDate: $expiryDate){
        name
        description
        productionDate
        expiryDate
      }
  }`;


  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleProductionDate = (e) => {
    setProductionDate(e.target.value);
  };

  const handleExpiryDate = (e) => {
    setExpiryDate(e.target.value);
  };

  const addMedicine = () => {
    fetch("http://localhost:3001", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers":
          "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      },
      body: JSON.stringify({
        query,
        variables: { name: name, description: description, productionDate: productionDate, expiryDate: expiryDate },
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return response;
      })
      .then(({ data }) => console.log(data.addMedicine));
    navigate("/medicines");
  };

  return (
    <div className="AddMedicine">
      <h1>Add Medicine</h1>
      <table>
        <tbody>
          <tr>
            <th scope="col">
              <h2>Medicine Name</h2>
              <input type="text" placeholder="Name" onChange={handleName} />
            </th>
          </tr>
          <tr>
            <h2>Description</h2>
            <textarea
              placeholder="Description"
              rows="7"
              cols="50"
              onChange={handleDescription}
            ></textarea>
          </tr>
          <tr>
            <td>
              <h2>Production date</h2>
              <input type="date" onChange={handleProductionDate} />
            </td>
          </tr>
          <tr>
            <td>
              <h2>Expiry date</h2>
              <input type="date" onChange={handleExpiryDate} />
            </td>
          </tr>
        </tbody>
      </table>
      <hr></hr>
      <button onClick={addMedicine}>Submit</button>
    </div>
  );
}

export default AddMedicine;
