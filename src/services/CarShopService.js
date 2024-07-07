
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
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      let json = await response.json();
      return json;
  
    } catch (error) {
      console.error('Failed to update data:', error);
      throw error; // Re-throw the error if needed, or handle it as per your requirement
    }
  }




 

  async addCar() {
    let url = `${ this.url }`;
    //console.log(`Fetching details for car id ${ country }`);
    let response = await fetch(url);
    let json = await response.json();
    return json;
  }

   /**
   * Retrieves all cars listed.
   * @param {String} car The unique id of the country.
   */
   async getCars(id) {
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

