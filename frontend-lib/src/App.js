import React from 'react'
import axios from "axios";
import "./App.css";
import { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FamDiagram } from 'basicprimitivesreact';
import { GroupByType, PageFitMode, Enabled } from 'basicprimitives';

const photos = {
  a: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA8CAIAAACrV36WAAAAAXNSR0IArs4c6QAAAARn' + 
  'QU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGnSURBVGhD7dnBbQJBDAVQk1o2QjlQwKYGzpSwKQfq4IxIC' + 
  'RTB9jLZHCJFwWv7/7EiDt6zmX2yPYMHNq01eb7n5flI36JiIXWpbFW2kAwgsdVblS0kA0hs9db/ZWs+vW/Wno9PxPE3dh' + 
  'ls6Od+HI1XT1d64Sb8R5utEulwdbA8VY+LZ/kqkfF456pBHxDz5Xxze/p2vsxukBbAshTVOE0PO4B2cUlWKrgUTKsrV0e' + 
  'ut3RVU/cm5aKKqPXVbjuIDPtDUh2JImq1+jmjkupIFNFStXadHncWXkecpb3393me4oJZnionXyjLV6W4QFZEleHCWNG+' + 
  '0eKggQJiRVV6vhAXwoqrul0AC1H1uuIsTLUyukYH1jBL7WJ8lgq6oqwkVXSQDrLSVEFXjJWoirlCrFRVyBVhJasirgCr6' + 
  '5tEv7a5A5jL0tcN7vNl9OVcHqtXRbocVr+Kc9k3H/3qPL69Ise7dh0SsS+2JmtFddgvdy/gGbY7Jdp2GRcyrlu1BfUjxt' + 
  'iPRm/lqVbGHOMHnU39zQm0I/UbBLA+GVosJHGVrcoWkgEktnoLydYXkF/LiXG21MwAAAAASUVORK5CYII='
};

function App() {

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  



  const handleClick = async (searchFilter) => {
      setIsLoading(true);
      const baseURL = 'http://localhost:3200/neo4j/'
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Accept": "application/json, text/plain, */*"
        },
        params: { filter: searchFilter }
      }
      console.log(searchFilter)
      try {
        const response = await axios.get(baseURL, config).then((res) => {
          setData(existingValues => ({
            // Retain the existing values
            ...existingValues,
            // update the firstName
            items: res.data
          }))
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });

        
      } catch (err) {
        setErr(err.message);
      } finally {
        setIsLoading(false);
      }
    };

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

      <button
        onClick={() =>{ handleClick( searchFilter ) }
          }
      >
        Submit!
      </button>

      <br/>

    <div align="center">
      {data ? data.items.map((items, index) => (
        
        <FamDiagram centerOnCursor={true} config={{
          pageFitMode: PageFitMode.AutoSize,
          autoSizeMinimum: { width: 100, height: 100 },
          cursorItem: 2,
          linesWidth: 1,
          highlightItem: 0,
          hasSelectorCheckbox: Enabled.True,
          linesColor: "black",
          hasSelectorCheckbox: Enabled.True,
          normalLevelShift: 20,
          dotLevelShift: 20,
          lineLevelShift: 20,
          normalItemsInterval: 10,
          dotItemsInterval: 10,
          lineItemsInterval: 10,
          // arrowsDirection: GroupByType.Parents,
          showExtraArrows: false,
          items: items
        }} />
      )): "no data"}
      </div>
      
    </div>
  );
}

export default App;