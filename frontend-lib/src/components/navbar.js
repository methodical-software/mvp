import React from 'react'
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
import blackcert from './icons/black/certification.png'
import whitecert from './icons/white/certification.png'
import blackdomain from './icons/black/domain.png'
import whitedomain from './icons/white/domain.png'
import blackfrmwrkortool from './icons/black/framework_or_tool.png'
import whitefrmwrkortool from './icons/white/framework_or_tool.png'
import blackmetric from './icons/black/metric.png'
import whitemetric from './icons/white/metric.png'
import blackpattern from './icons/black/pattern.png'
import whitepattern from './icons/white/pattern.png'
import blackperson from './icons/black/person.png'
import whiteperson from './icons/white/person.png'
import blackperspective from './icons/black/perspective.png'
import whiteperspective from './icons/white/perspective.png'
import blackproject from './icons/black/project.png'
import whiteproject from './icons/white/project.png'
import blackroledescription from './icons/black/role_description.png'
import whiteroledescription from './icons/white/role_description.png'
import blacksynonym from './icons/black/synonym.png'
import whitesynonym from './icons/white/synonym.png'
import blackteam from './icons/black/team.png'
import whiteteam from './icons/white/team.png'
import blackunnode from './icons/black/unknown_node.png'
import whiteunnode from './icons/white/unknown_node.png'

const NavBar = ({getData}) => {
  
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

  return (
    <>
      <div align="center">
        <div className="search">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Search"
            onChange={(e) => {
              setSearchFilter(e.target.value)
            }}
          />
        </div>
      </div>
      
      <div>
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
        onClick={() =>{ getData( searchFilter ) }}
      >
        Submit!
      </Button>
    </div>
      
  </>
  );
}

export default NavBar;