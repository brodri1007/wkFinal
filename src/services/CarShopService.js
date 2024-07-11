
const baseUrl = "https://6659cc10de346625136df8bb.mockapi.io/car";



export default class CarShopService {

  constructor(url) {
    this.url = url || baseUrl;
  }

  async allCars() {
    let url = `${ this.url }`;
   // console.log(`Fetching all cars from ${ url }...`);
    let response = await fetch(url);
    let json = await response.json();
    //console.log(json)
    return json;
  }


  async updateCar(id, data) {
    try {
      let url = `${this.url}/${id}`;
      //console.log(`Updating details for car id ${id}`);
  
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }); 
  
      let json = await response.json();
      return json;
  
    } catch (error) {
      console.error('Failed to update data:', error);
      throw error; // Re-throw the error if needed, or handle it as per your requirement
    }
  }


   /**
   * Adds a car to be listed for sale.
   * @param {object} car The car to be added.
   */

  async addCar(car) {

    let url = `${ this.url }`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });

    
  }

   /**
   * Retrieves car with the specidied id.
   * @param {String} id The unique id of the car.
   */
   async getCar(id) {
    let url = `${ this.url }/${ id }`;
    console.log(`Fetching details for car id ${ id }`);

    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([])
    };

    let response = await fetch(url, requestOptions);
    let json = await response.json();
    return json;
  }
   /**
   * Deletes the car requested.
   * @param {String} id The id of the car to be deleted.
   */

  async deleteCar(id) {

    const requestOptions = {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },

    };

    fetch(this.url  + '/' + id, requestOptions)
      .then(async response => {
        if (!response.ok) {
          console.log("An Error Occurred");
          return;
        }
        console.log("deleting", response)
      })
      .catch(error => {
        console.error("There was an error!", error);
      });

      this.allCars();
  }

  
}

