import React from 'react'
import axios from 'axios'
import "./App.css"
import { useState } from "react"
import { FamDiagram } from 'basicprimitivesreact'
import { GroupByType, PageFitMode, Enabled, Colors } from 'basicprimitives'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faComment, faCog } from '@fortawesome/free-solid-svg-icons'
import TextField from '@mui/material/TextField'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MailIcon from '@mui/icons-material/Mail'
import blackcert from './components/icons/black/certification.png'
import whitecert from './components/icons/white/certification.png'
import blackdomain from './components/icons/black/domain.png'
import whitedomain from './components/icons/white/domain.png'
import blackfrmwrkortool from './components/icons/black/framework_or_tool.png'
import whitefrmwrkortool from './components/icons/white/framework_or_tool.png'
import blackmetric from './components/icons/black/metric.png'
import whitemetric from './components/icons/white/metric.png'
import blackpattern from './components/icons/black/pattern.png'
import whitepattern from './components/icons/white/pattern.png'
import blackperson from './components/icons/black/person.png'
import whiteperson from './components/icons/white/person.png'
import blackperspective from './components/icons/black/perspective.png'
import whiteperspective from './components/icons/white/perspective.png'
import blackproject from './components/icons/black/project.png'
import whiteproject from './components/icons/white/project.png'
import blackroledescription from './components/icons/black/role_description.png'
import whiteroledescription from './components/icons/white/role_description.png'
import blacksynonym from './components/icons/black/synonym.png'
import whitesynonym from './components/icons/white/synonym.png'
import blackteam from './components/icons/black/team.png'
import whiteteam from './components/icons/white/team.png'
import blackunnode from './components/icons/black/unknown_node.png'
import whiteunnode from './components/icons/white/unknown_node.png'

function App() {

  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [activeCert,setActiveCert]=useState(false)
  const [activeDomain,setActiveDomain]=useState(false)
  const [activeFrmwrkOrTool,setActiveFrmwrkOrTool]=useState(false)
  const [activeMetric,setActiveMetric]=useState(false)
  const [activePattern,setActivePattern]=useState(false)
  const [activePerson,setActivePerson]=useState(false)
  const [activePerspective,setActivePerspective]=useState(false)
  const [activeProject,setActiveProject]=useState(false)
  const [activeRoleDescription,setActiveRoleDescription]=useState(false)
  const [activeSynonym,setActiveSynonym]=useState(false)
  const [activeTeam,setActiveTeam]=useState(false)
  const [activeUnnode,setActiveUnnode]=useState(false)

  const handleClick = async (searchFilter) => {
      setIsLoading(true);
      // const baseURL = 'http://3.91.193.148:3200/neo4j/'
      const baseURL = 'http://localhost:3200/neo4j/'
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Accept": "application/json, text/plain, */*"
        },
        params: { filter: searchFilter }
      }
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
    }

  return (

      <div className="App">
      <h1><a href="#nodes" aria-hidden="true" className="aal_anchor" id="nodes"><svg aria-hidden="true" className="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>nodes</h1>
      <div align="center">
        <div className="search">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
      </div>
      
      <br/>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "center" }}>
            <IconButton size="large" color="inherit" onClick={e => { setActiveCert(!activeCert) }}>
              <img src={ activeCert? blackcert : whitecert } height="20" width="20"/>
            </IconButton>
            <IconButton size="large" color="inherit" onClick={e => { setActiveDomain(!activeDomain) }}>
              <img src={ activeDomain? blackdomain : whitedomain } height="20" width="20"/>
            </IconButton>
            <IconButton size="large" color="inherit" onClick={e => { setActiveFrmwrkOrTool(!activeFrmwrkOrTool) }}>
              <img src={ activeFrmwrkOrTool? blackfrmwrkortool : whitefrmwrkortool } height="20" width="20"/>
            </IconButton>
            <IconButton size="large" color="inherit" onClick={e => { setActiveMetric(!activeMetric) }}>
              <img src={ activeMetric? blackmetric : whitemetric } height="20" width="20"/>
            </IconButton>
            <IconButton size="large" color="inherit" onClick={e => { setActivePattern(!activePattern) }}>
              <img src={ activePattern? blackpattern : whitepattern } height="20" width="20"/>
            </IconButton>
            <IconButton size="large" color="inherit" onClick={e => { setActivePerson(!activePerson) }}>
              <img src={ activePerson? blackperson : whiteperson } height="20" width="20"/>
            </IconButton>
            <IconButton size="large" color="inherit" onClick={e => { setActivePerspective(!activePerspective) }}>
              <img src={ activePerspective? blackperspective : whiteperspective } height="20" width="20"/>
            </IconButton>
            <IconButton size="large" color="inherit" onClick={e => { setActiveProject(!activeProject) }}>
              <img src={ activeProject? blackproject : whiteproject } height="20" width="20"/>
            </IconButton>
            <IconButton size="large" color="inherit" onClick={e => { setActiveRoleDescription(!activeRoleDescription) }}>
              <img src={ activeRoleDescription? blackroledescription : whiteroledescription } height="20" width="20"/>
            </IconButton>
            <IconButton size="large" color="inherit" onClick={e => { setActiveSynonym(!activeSynonym) }}>
              <img src={ activeSynonym? blacksynonym : whitesynonym } height="20" width="20"/>
            </IconButton>
            <IconButton size="large" color="inherit" onClick={e => { setActiveTeam(!activeTeam) }}>
              <img src={ activeTeam? blackteam : whiteteam } height="20" width="20"/>
            </IconButton>
            <IconButton size="large" color="inherit" onClick={e => { setActiveUnnode(!activeUnnode) }}>
              <img src={ activeUnnode? blackunnode : whiteunnode } height="20" width="20"/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <br/>
      <Button variant="contained"
        onClick={() =>{ handleClick( searchFilter ) }}
      >
        Submit!
      </Button>
    <div align="center" className="placeholder">
      {data ? data.items.map((items, index) => (
        <FamDiagram  key={index} centerOnCursor={true} config={{
          pageFitMode: PageFitMode.AutoSize,
          templates: [{
            name: "ItemTemplate",
            itemSize: { width: 400, height: 150 },
            minimizedItemSize: { width: 3, height: 3 },
            highlightPadding: { left: 2, top: 2, right: 2, bottom: 2 },
            onItemRender: ({ context: itemConfig }) => {
              const itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : Colors.RoyalBlue;
              return <div className="ItemTemplate">
                <div className="ItemLabelBackground" style={{ backgroundColor: itemTitleColor }}>
                  <div className="ItemLabel">{itemConfig.label}</div>
                </div>
                <div className="ItemIsDefinedBy">{typeof itemConfig.isDefinedBy != "undefined" ? 
                  (
                    <a href={itemConfig.isDefinedBy}  target="_blank">{itemConfig.isDefinedBy.substring(0, 70) + "..."}</a>
                  )
                  : ""}
                </div>
                <div className="ItemLevel" align="left">level: { itemConfig.level }</div>
                <div className="ItemDescription" align="left">{itemConfig.description.substring(0, 200) + "..."}</div>
                <div className="ItemSeeAlso">{typeof itemConfig.seeAlso != "undefined" ?  
                  (
                    <a href={itemConfig.seeAlso}  target="_blank">{itemConfig.seeAlso.substring(0, 70) + "..."}</a>
                  ): ""}
                </div>
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