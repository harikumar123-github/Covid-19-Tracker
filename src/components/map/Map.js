import React, { useEffect, useState } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api'

export default function Map() {
    
    const mapStyles = {
        height: "65vh",
        width: '100%'
    }

    const displayStyleInline = {
        display: 'inline'
    }

    const [selected, setSelected] = useState({})
    const [data,setData] = useState([])

    const onselect = country => {
        setSelected(country)
    }

    useEffect( () => {
        fetch('https://disease.sh/v3/covid-19/countries').then(res => res.json()).then( dt => {
            setData(dt)
        })
    }, [])

    const defaultCenter = {
        lat: 28.7041,
        lng: 77.1025
    }

    return (
        <LoadScript googleMapsApiKey='AIzaSyBc1hjSTBTfCsK4XL5H6sqJtHVul-_PXjE'>
            <GoogleMap mapContainerStyle={mapStyles} 
            zoom={2}
            center={defaultCenter} >

            {  data && (
                    data.map(country => {
                        return (
                            <Marker key={country.country} position={
                                    { 
                                        lat:country.countryInfo.lat ,
                                        lng:country.countryInfo.long  
                                    }
                                } 
                                onClick={() => onselect(country)} />
                        )
                    })
                )
            }

            {
                selected.countryInfo && (
                    <InfoWindow position={
                        {
                            lat:selected.countryInfo.lat ,
                            lng:selected.countryInfo.long  
                        }
                    } 
                    clickable={true}
                    onCloseClick={ () => setSelected({}) } >
                        <>
                        <p><b style={displayStyleInline}>Country: </b>{selected.country}</p>
                        <p><b style={displayStyleInline}>Total Cases: </b>{selected.cases}</p>
                        <p><b style={displayStyleInline}>Total Deaths: </b>{selected.deaths}</p>
                        <p><b style={displayStyleInline}>Recovered: </b>{selected.recovered}</p>
                        <p><b style={displayStyleInline}>Active Cases: </b>{selected.active}</p>
                        </>
                    </InfoWindow>
                )
            }

            </GoogleMap>
        </LoadScript>
    )
}
