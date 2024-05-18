
import { useEffect, useState } from 'react';
import './AddMedicine.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function UpdateMedicine() {
    const location = useLocation();
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [productionDate, setProductionDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleProductionDate = (e) => {
        setProductionDate(e.target.value);
    }

    const handleExpiryDate = (e) => {
        setExpiryDate(e.target.value);
    }

    useEffect(() => {
        fetch('http://localhost:3001/medicines/' + location.state.id)
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setDescription(data.description);
                setProductionDate(data.productionDate);
                setExpiryDate(data.expiryDate);
            });
    }, [location.state.id]);

    const updateMedicine = () => {
        fetch('http://localhost:3001/medicines/' + location.state.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                description: description,
                productionDate: productionDate,
                expiryDate: expiryDate,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });

        navigate("/medicines");
    }

    return (
        <div className="AddMedicine">
            <h1>Add Medicine</h1>
            <table>
                <tbody>

                    <tr>
                        <th scope="col"><h2>Medicine Name</h2><input type="text" placeholder="Name" onChange={handleName}/></th>
                    </tr>
                    <tr>
                        <h2>Description</h2>
                        <textarea placeholder="Description" rows="7" cols="50" onChange={handleDescription}></textarea>
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

export default UpdateMedicine;