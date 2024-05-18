import './Medicines.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Medicines() {

  let navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3001', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Credentials" : true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      },
      body: JSON.stringify({
        query: `
          query {
              getMedicines{
                id
                name
                description
                productionDate
                expiryDate
                stored
                lastUpdate
                status
              }
          }
        `
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        return response;
      })
      .then(({ data }) => setMedicines(data.getMedicines));
  }, []);

 const goToAddMedicine = () => {
  console.log("goToAddMedicine");
    navigate("/AddMedicine");
  }

  const delteMedicine = (id) => {
    fetch('http://localhost:3001/medicines/'+id, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        setMedicines(medicines.filter((medicine) => medicine.id !== id));
      });
  }

  const updateMedicine = (id) => {

    navigate("/UpdateMedicine", {state: {id: id}});
  }

  return (
    <div >
        <h1>Medicine inventory manager</h1>
        <button onClick={goToAddMedicine}>Add Medicine</button>
        <hr></hr>
        <table>

          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Production date</th>
              <th scope="col">Expiry date</th>
              <th scope="col">Stored</th>
              <th scope="col">Last update</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine.id}>
                <th scope="row">{medicine.id}</th>
                <td>{medicine.name}</td>
                <td>{medicine.description}</td>
                <td>{medicine.productionDate}</td>
                <td>{medicine.expiryDate}</td>
                <td>{medicine.stored}</td>
                <td>{medicine.lastUpdate}</td>
                <td>{medicine.status}</td>
                <td>
                  <button onClick={updateMedicine}>Update</button>
                  <hr></hr>
                  <button onClick={delteMedicine}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

    </div>
  );
}

export default Medicines;