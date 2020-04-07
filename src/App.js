import React, {Component} from 'react';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      year: '2016',
      data: [],
      chosenCountries: [],
      availableCountries: [],
      counter: 0
    }
  };

  //fetch the data
  componentDidMount() {
    fetch('./data2.json')
    .then(response => response.json())
    .then (
      (result, value) => {
        this.setState({
          data: result,
          availableCountries: result,
          year: value
        });
        console.log('Available Countries: ', result)
      }
      
    )
  }


  onChooseCountry = (country) => {
    //duplicate the two arrays
    const chosenCountries = this.state.chosenCountries.slice();
    const availableCountries = this.state.availableCountries.slice();

    //retrieve country of choice
    const chosenCountry = availableCountries[country];

    //add to chosen list
    chosenCountries.push(chosenCountry);
    availableCountries.splice(country, 1);

    //sort countries in alphabetical order
    chosenCountries.sort((a, b) => (a.country > b.country) ? 1: -1);

    console.log('Chosen Countries: ', chosenCountries)

    this.setState ({
      chosenCountries: chosenCountries,
      availableCountries: availableCountries,
      counter: this.state.counter + 1
    })
  }



render() {
  return (
    <div className="App">
     <div className="TitleBar">
          <div className="Main-Title">
            <h1>Percentage of Forest Land in <br/>South American Countries: </h1>
             <span className="output">  </span>  
          </div>
              <div className="drop-down">
                  <select id="select" className="YearChooser-select">
                      <option value="">Select Year</option>
                      <option value="2016">2016</option>
                      <option value="2015">2015</option>
                      <option value="2014">2014</option>
                      <option value="2013">2013</option>
                      <option value="2012">2012</option>
                      <option value="2011">2011</option>
                      <option value="2010">2010</option> -->
                  </select>
                  <button className="Input">Go</button>
             </div> 
           
    </div> 
  
      
  
      <div className="MainContainer">
        <div className="Country-Checkbox">
          {/* <btn className="Country-Button"></btn> 
          {
          this.state.data.map((data, index) => (
            <button key={index}className="button-primary" onClick={() => {this.onChooseCountry(index);
            }}><span className="btn-content" tabindex="-1">
        </span>{data.label}</button>
           ))
          }   */}
        </div>
    


        
        <div className="BarChart" id="results">
          
             {/* original toggle js not being used. saving for reference */}
            {/* {
              this.state.data.map(data => (
              data.visible === true ? (
                
              <div key={data} className="bar--show bar" id={data.label} style={{height: data.percentage + "px"}}> 
                {data.label} = 
                {data.percentage} %
                {console.log('label: ',data.label, 'percentage: ', data.percentage)}
              </div>
              ) : (
                  null
                )
              ))
            } */}
  
           {/* generate divs with remove button */}
            {/* {
              this.state.chosenCountries.map((chosenCountry, index) => (
                <div className="bar--show bar" style={{height: chosenCountry.percentage + "%"}}>
                    
                  <h3>{chosenCountry.label}</h3>
                  <h4>{chosenCountry.percentage} %</h4>
                  <button className="remove-btn" onClick={() => this.removeCountry(index)}>remove</button>
  
                </div>
              ))
            }  */}
        
        {/* </section>        */}
      </div>
    </div>



    </div>

  );

}
}


export default App;
