import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import MyCarsForSale from './MyCarsForSale';
import CarShopService from '../services/CarShopService';

const API_URL = "https://6659cc10de346625136df8bb.mockapi.io/cars/car";


function SellACar ({carList, setCarList}) {
//set state for formValues

const [id, setId] = useState("")
const [brand, setBrand] = useState("")
const [model, setModel] = useState("")
const [miles, setMiles] = useState("")
const [year, setYear] = useState("")
const [price, setPrice] = useState("")

const [myCarList, setmyCarList] = useState([
  {model: "Honda",
  brand: "Accord",
  year :"2017",
  price: "23000",
  miles: "25654",
  id: "1"}
]);

const service = new CarShopService();

const [formValues, setFormValues] = useState({
    id: '', 
    brand: '',
    model: '',
    miles: '',
    year: '',               
    price: ''
  });


  //Set values in the formValues array based on form field's names
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };



  const handleSubmit = (event) => {

    event.preventDefault();
    // let updatedList = [];
    //  updatedList = [...formValues]

    setmyCarList(...myCarList, formValues); 


        setFormValues({  
          id:'',    
          brand: '',
          model: '',
          miles: '',
          year: '',               
          price: ''
        }) 


  
//Need to be able to not submit if there is no car data in the form  -----  if(!formValues.brand === null) {
// FINISH OUT OBJECT BELOW AFTER MAKING EACH STATE

  

   //Declare request options for API fetch


    // }else {
    //     alert("Please enter the car's infomation to continue.")
    }

  
    return (
        <div className="App">   

                <Container>
                    <h1>Sell your car with us</h1>
                    <p>There Carshop will find a buyer for your car in less than 24 hours, Guarantee!</p>
                    <span>Enter your car's infomation below and let our super smart engine find a buyer.</span>
                <div className='row'>
                    <div className='col'>
                    <form onSubmit={handleSubmit}>
                    <div>
                    <input
                            type="hidden"
                            id="id"
                            name="id"
                            value={formValues.id}
                            onChange={(e) => setId(e.target.value)}
                        />
                        <label htmlFor="brand"></label>
                        <input
                        placeholder='Enter the brand'
                            type="text"
                            id="brand"
                            name="brand"
                            value={formValues.brand}
                            onChange={handleChange}
                        />
                    
                        <label htmlFor="model"></label>
                        <input
                        placeholder='Enter the model'
                            type="text"
                            id="model"
                            name="model"
                            value={formValues.model}
                            onChange={handleChange}
                        />
                    
                        
                        <input
                        placeholder='How many miles'
                            type="text"
                            id="miles"
                            name="miles"
                            value={formValues.miles}
                            onChange={handleChange}
                        />
                    
                        
                        <input
                        placeholder='Enter the Year'
                            type="text"
                            id="year"
                            name="year"
                            value={formValues.year}
                            onChange={handleChange}
                        />
                    
                        
                        <input
                        placeholder='Enter a price'
                            type="text"
                            id="price"
                            name="price"
                            value={formValues.price}
                            onChange={handleChange}
                        />
                        </div>
                        <button type="submit">Add a Car</button>
                    </form>

             

                    </div>
                </div>
                </Container><br></br><br></br>
                <MyCarsForSale myCarList={myCarList}/>
            
        </div>
            )   
    
        
};

export default SellACar;

