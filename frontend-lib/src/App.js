import React from 'react'
import axios from 'axios'
import "./App.css"
import { useState } from "react"

import NavBar from "./components/navbar"
import NestedList from "./components/items"

const App = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState('')

  const getData = async (searchFilter, exclude) => {
      setIsLoading(true);
      const asArray = Object.entries(exclude);
      const filtered = asArray.filter(([key, value]) => {
        return !value
      });

      const left = Object.fromEntries(filtered);
      const send = Object.keys(left).length > 0 ? Object.keys(left) : ['']

      // const baseURL = 'http://3.91.193.148:3200/neo4j/'
      const baseURL = 'http://localhost:3200/neo4j/'
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Accept": "application/json, text/plain, */*"
        },
        params: { filter: searchFilter, exclude: send }
      }
      try {
        await axios.get(baseURL, config).then((res) => {
          setData( res.data )
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });

        
      } catch (err) {
        setErr(err.message);
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <div className="App">
      <NavBar getData={getData} />
      {
        data ? <NestedList items={data} /> :"Loading"
      }
    </div>
  );
}

export default App;