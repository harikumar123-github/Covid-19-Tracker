import React, { useEffect, useState } from 'react'
import '../../App.css'

export default function Global() {

    const [data,setData] = useState([])

    const displayStyleInline = {
        display: 'inline'
    }

    useEffect( () => {
        fetch('https://disease.sh/v3/covid-19/all').then( res => res.json()).then(dt => {
            setData(dt)
        })
    }, [] )

    return (
        <div>
            <h1 style={ { color:"red", textDecoration: 'underline' } }>Global</h1>
            <div className="info">
               <p><b style={displayStyleInline}>Total Cases: </b>{data.cases}</p>
               <p><b style={displayStyleInline}>Total Deaths: </b>{data.deaths}</p>
               <p><b style={displayStyleInline}>Recovered: </b>{data.recovered}</p>
               <p><b style={displayStyleInline}>Active Cases: </b>{data.active}</p>
               <p><b style={displayStyleInline}>Todays Cases: </b>{data.todayCases}</p>
               <p><b style={displayStyleInline}>Todays Deaths: </b>{data.todayDeaths}</p>
               <p><b style={displayStyleInline}>Todays Recovered: </b>{data.todayRecovered}</p>
               <p><b style={displayStyleInline}>Critical cases: </b>{data.critical}</p>
            </div>
        </div>
    )
}
