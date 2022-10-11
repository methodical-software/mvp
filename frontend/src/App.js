import React from 'react'
import "./App.css";
import { useLazyQuery, gql } from "@apollo/client";
import { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const GET_DOMAINS = gql`
  query Domains($filter: String){
    getDomains(filter: $filter){
      IRI,
      _updated,
      description,
      isDefinedBy,
      label,
      level,
      type,
    }
  }
`;

function App() {

  const [searchFilter, setSearchFilter] = useState('*');
  const [executeSearch, { data }] = useLazyQuery(
    GET_DOMAINS
  );

  return (
    <div className="App">
      <h1><a href="#nodes" aria-hidden="true" className="aal_anchor" id="nodes"><svg aria-hidden="true" className="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>nodes</h1>

      <div>
        <label>Search</label>
        <input
          onChange={(e) => setSearchFilter(e.target.value)}
          type="string"
        />
      </div>

      <br/>

      {data ? data.getDomains.map(({__typename , IRI, _updated, description,  isDefinedBy, label, level}) => (
        <div>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {IRI}
            </Typography>
            <Typography variant="h5" component="div">
              {description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {isDefinedBy}
            </Typography>
            <Typography variant="body2">
              {label}
            </Typography>
            <Typography variant="body2">
              {level}
            </Typography>
          </CardContent>
        </div>
      )): "loading..."}

      <br/>

      <button
        onClick={() =>{
              executeSearch({
                variables: { filter: searchFilter }
              })
            }
          }
      >
        Submit!
      </button>
    </div>
  );
}

export default App;