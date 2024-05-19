
import { useEffect, useState } from 'react';
import './AddMedicine.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function UpdateMedicineREST() {
    const location = useLocation();
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [newName, setNewName] = useState('');
    const [description, setDescription] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [productionDate, setProductionDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [medicine, setMedicine] = useState({});


    const handleName = (e) =>{
        setNewName(e.target.value);
    }

    const handleDescription = (e) => {
        setNewDescription(e.target.value);
    }

    const handleProductionDate = (e) => {
        setProductionDate(e.target.value);
    }

    const handleExpiryDate = (e) => {
        setExpiryDate(e.target.value);
    }

    // useEffect(() => {
    //     fetch('https://medicine-inventory-manager-api-gateway-dp55p9wv.ue.gateway.dev/'+ location.state.id , {
    //         method: 'GET',
    //         mode: 'cors',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json',
    //             "Access-Control-Allow-Credentials" : true,
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    //             "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    //         },
    // })
    //     .then(response => response.json())
    //     .then(response => {
    //         return response;
    //     })
    //     .then(({ data }) => {
    //         setName(data.name);
    //         setDescription(data.description);
    //     });


        
    // }, [location.state.id, name,description,productionDate,expiryDate]);

    const updateMedicine = () => {
        fetch('https://backend-update-medicine-olz2xjbmza-uc.a.run.app/' + location.state.id, {
            method: 'PUT',
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
                name: newName,
                description: newDescription,
                productionDate: productionDate,
                expiryDate: expiryDate
            })
          })
          .then(response => console.log(response.status))
          .then(response => {
            return response;
          })



        navigate("/medicinesREST");
    }

    return (
        <div className="AddMedicine">
            <h1>Add Medicine</h1>
            <table>
                <tbody>

                    <tr>
                        <th scope="col"><h2>Medicine Name</h2><input type="text" placeholder={name} onChange={handleName}/></th>
                    </tr>
                    <tr>
                        <h2>Description</h2>
                        <textarea rows="7" cols="50" placeholder={description} onChange={handleDescription}></textarea>
                    </tr>
                    <tr>
                        <td><h2>Production date</h2><input type="date" onChange={handleProductionDate}/></td>
                    </tr>
                    <tr>
                        <td><h2>Expiry date</h2><input type="date" onChange={handleExpiryDate}/></td>
                    </tr>
                </tbody>
            </table>
            <hr></hr>
            <button onClick={updateMedicine}>Submit</button>
        </div>
    )
}

export default UpdateMedicineREST;