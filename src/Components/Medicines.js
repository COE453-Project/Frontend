import './Medicines.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Medicines() {

  let navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");

  let query = `query getMedicines($status: String){
    getMedicines(status: $status){
      id
      name
      description
      productionDate
      expiryDate
      storedAtTimestamp
      lastUpdatedTimestamp
      expiryStatus
      }
  }`;

  let deleteQuery = `mutation deleteMedicine($id: Int){
    deleteMedicine(id: $id)
  }`;


  useEffect(() => {

    fetch('https://api-gateway-olz2xjbmza-uc.a.run.app', {
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
        query,
        variables: {status: selectedStatus}
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        return response;
      })
      .then(({ data }) => setMedicines(data.getMedicines));
  }, [selectedStatus]);

 const goToAddMedicine = () => {
  console.log("goToAddMedicine");
    navigate("/AddMedicine");
  }

  const delteMedicine =  (id) => {
    console.log(id);
    fetch('https://api-gateway-olz2xjbmza-uc.a.run.app', {
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
        query: deleteQuery,
        variables: {id:id}
      })
    })
    .then(response => console.log(response.status))
    .then(response => {
      window.location.reload();
    })

    
  }

  const updateMedicine = (id) => {
    navigate("/UpdateMedicine", {state: {id: id}});
  }

  const getMedicinesByStatus = (e) => {
    console.log(e);
    setSelectedStatus(e);
    fetch('https://api-gateway-olz2xjbmza-uc.a.run.app', {
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
        query: query,
        variables: {status: e}
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      return response;
    })
    .then(({ data }) => setMedicines(data.getMedicines));
  }

  return (
    <div >
        <h1>Medicine Inventory Manager</h1>
        <div className='topBar'>
          <button onClick={goToAddMedicine}>Add Medicine</button>
          <select onChange={(event) => getMedicinesByStatus(event.target.value)}>
            <option value="all">All</option>
            <option value="expired">Expired</option>
            <option value="will-expire-soon">Will expire soon</option>
            <option value="not-expired">Not expired</option>
          </select>
        </div>
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
                <td>{medicine.storedAtTimestamp}</td>
                <td>{medicine.lastUpdatedTimestamp}</td>
                <td>{medicine.expiryStatus}</td>
                <td>
                  <button onClick={() => updateMedicine(medicine.id)}>Update</button>
                  <hr></hr>
                  <button onClick={() => delteMedicine(medicine.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

    </div>
  );
}

export default Medicines;