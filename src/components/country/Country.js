import React, { useEffect, useState } from 'react'
import '../../App.css'

export default function Country() {

    const [data,setData] = useState([])
    const [currentCountry, setCurrentcountry] = useState('')
    
    const displayStyleInline = {
        display: 'inline'
    }

    useEffect( () => {

        fetch('https://extreme-ip-lookup.com/json/').then( res => res.json()).then(response => {
            setCurrentcountry(response.country);
        }).catch(e => {
            console.log('Request failed:', e);
        });

        fetch(`https://disease.sh/v3/covid-19/countries/${currentCountry}`).then( res => res.json()).then(dt => {
            setData(dt)
        })

    }, [currentCountry,data] )

    return (
        <div>
            <h1 style={ { color: 'blue', textDecoration: 'underline' } } >{currentCountry}</h1>
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
