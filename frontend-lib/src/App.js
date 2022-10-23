import React from 'react'
import axios from "axios";
import "./App.css";
import { useState } from "react";
import { FamDiagram } from 'basicprimitivesreact';
import { GroupByType, PageFitMode, Enabled, Colors } from 'basicprimitives';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faComment, faCog } from '@fortawesome/free-solid-svg-icons'

function App() {

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [searchFilter, setSearchFilter] = useState('');
  

  const handleClick = async (searchFilter) => {
      setIsLoading(true);
      const baseURL = 'http://3.85.238.69:3200/neo4j/'
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

    <div align="center" className="placeholder">
      {data ? data.items.map((items, index) => (
        <FamDiagram  key={index} centerOnCursor={true} config={{
          pageFitMode: PageFitMode.AutoSize,
          templates: [{
            name: "contactTemplate",
            itemSize: { width: 400, height: 150 },
            minimizedItemSize: { width: 3, height: 3 },
            highlightPadding: { left: 2, top: 2, right: 2, bottom: 2 },
            onItemRender: ({ context: itemConfig }) => {
              const itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : Colors.RoyalBlue;
              return <div className="ContactTemplate">
                <div className="ContactTitleBackground" style={{ backgroundColor: itemTitleColor }}>
                  <div className="ContactTitle">{itemConfig.label}</div>
                </div>
                <div className="ContactPhone">{typeof itemConfig.isDefinedBy != "undefined" ? itemConfig.isDefinedBy.substring(0, 70) + "...": ""}</div>
                <div className="ContactEmail">{ itemConfig.level }</div>
                <div className="ContactDescription">{itemConfig.description.substring(0, 200) + "..."}</div>
                <div className="ContactSeeAlso">{typeof itemConfig.seeAlso != "undefined" ?  itemConfig.seeAlso.substring(0, 70) + "..." : ""}</div>
              </div>;
            },
            onButtonsRender: (({ context: itemConfig }) => {
              return <>
                <button key="1" className="StyledButton"
                  onClick={() => { this.onButtonClick(itemConfig, 'User'); }}>
                  <FontAwesomeIcon icon={faUser} />
                </button>
                <button key="2" className="StyledButton"
                  onClick={() => { this.onButtonClick(itemConfig, 'Comment'); }}>
                  <FontAwesomeIcon icon={faComment} />
                </button>
                <button key="3" className="StyledButton"
                  onClick={() => { this.onButtonClick(itemConfig, 'Cog'); }}>
                  <FontAwesomeIcon icon={faCog} />
                </button>
              </>
            })
          }],
          items: items
        }} />
      )): "no data"}
      </div>
    </div>
  );
}

export default App;