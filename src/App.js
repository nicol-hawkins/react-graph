import React, {Component} from 'react';
import './App.css';

import CountryButtons from './components/CountryButtons/CountryButtons.js';
import BarChart from './components/BarChart/BarChart.js';
import TitleBar from './components/TitleBar/TitleBar.js';
import RemoveButton from './components/RemoveButton/RemoveButton.js';
import SelectYear from './components/SelectYear/SelectYear.js';


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

  onUpdateYear = (ev) => {
    let year = ev.target.value;
    this.setState({
      year: year,
    })
  }


  onChooseCountry = (info, index) => {
    //duplicate the two arrays
    const chosenCountries = this.state.chosenCountries.slice();
    const availableCountries = this.state.availableCountries.slice();

    //retrieve country of choice
    const chosenCountry = availableCountries[index];

    //add to chosen list
    chosenCountries.push(chosenCountry);
    availableCountries.splice(index, 1);

    //sort countries in alphabetical order
    chosenCountries.sort((a, b) => (a.country > b.country) ? 1: -1);

    console.log('Chosen Countries: ', chosenCountries)

    this.setState ({
      chosenCountries: chosenCountries,
      availableCountries: availableCountries,
      counter: this.state.counter + 1
    })
  }

  removeCountry = (index) => {
    const chosenCountries = this.state.chosenCountries.slice();
    const availableCountries = this.state.availableCountries.slice();
    const chosenCountry = chosenCountries[index];

    availableCountries.push(chosenCountry);
    chosenCountries.splice(index, 1);
    availableCountries.sort((a, b) => (a.label > b.label) ? 1: -1);

    this.setState({
      availableCountries: availableCountries,
      chosenCountries: chosenCountries
    });
  };



render() {
  return (
    <div className="App">
     <div className="TitleBar">
     <TitleBar
        onChange={this.onUpdateYear}
        currentYear={this.state.year}
        year={this.state.year}>
          <SelectYear
            onChange={this.onUpdateYear}
            currentYear={this.state.year}
            value={this.state.year}>
          </SelectYear>
        </TitleBar>
           
    </div> 
  
      
  
      <div className="MainContainer">
        <div className="Country-Checkbox">
        {this.state.data[this.state.year] ?
          this.state.data[this.state.year].map((info, index)) (
            <CountryButtons
              onClick={() => this.onChooseCountry(info, index)}
              text={info.Country}>
                {info.Country}
            </CountryButtons>
          ): "NO DATA"
        }
        </div>
    


        
        <div className="BarChart" id="results">
        {this.state.chosenCountries.map((info, index) => (
              <BarChart 
                className="BarChart-Bar" 
                info={info}>
                  <RemoveButton
                    onClick={() => this.removeCountry(index)}>
                  </RemoveButton>
              </BarChart>
              ))
            }
  
         
      </div>
    </div>



    </div>

  );

}
}


export default App;
