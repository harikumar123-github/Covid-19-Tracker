import './App.css';
import Map from './components/map/Map'
import Global from './components/global/Global'
import Country from './components/country/Country'
import { DataContext } from './helper/Contexts'
import { useEffect, useState } from 'react';

function App() {

  const [data,setData] = useState([])

  useEffect( () => {

    fetch('https://disease.sh/v3/covid-19/countries').then(res => res.json()).then( dt => {
      setData(dt)
    })

  }, [] )

  return (
    <div className="App">

      <DataContext.Provider value={ { data } }>
        <Map />
        <div className="information">
          <Global />
          <Country />
        </div>
      </DataContext.Provider>

    </div>
  );
}

export default App;
