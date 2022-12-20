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

const activeList = [
  {
    id: "certification",
    label: "Certification",
    passive: blackcert,
    active: whitecert
  },
  {
    id: "domain",
    label: "Domain",
    passive: blackdomain,
    active: whitedomain
  },
  {
    id: "framework_or_tool",
    label: "Framework or Tool",
    active: whitefrmwrkortool,
    passive: blackfrmwrkortool
  },
  {
    id: "metric",
    label: "Metric",
    active: whitemetric,
    passive: blackmetric
  },
  {
    id: "pattern",
    label: "Pattern",
    active: whitepattern,
    passive: blackpattern
  },
  {
    id: "person",
    label: "Person",
    active: whiteperson,
    passive: blackperson
  },
  {
    id: "perspective",
    label: "Perspective",
    active: whiteperspective,
    passive: blackperspective
  },
  {
    id: "project",
    label: "Project",
    active: whiteproject,
    passive: blackproject
  },
  {
    id: "roleDescription",
    label: "Role Description",
    active: whiteroledescription,
    passive: blackroledescription
  },
  {
    id: "synonym",
    label: "Synonym",
    active: whitesynonym,
    passive: blacksynonym
  },
  {
    id: "team",
    label: "Team",
    active: whiteteam,
    passive: blackteam
  },
  {
    id: "unnode",
    label: "Unnode",
    active: whiteunnode,
    passive: blackunnode
  },
]
let excludeState = {}
activeList.map((o, key) => { 
 excludeState[o.id] = true
}, {})

const NavBar = ({getData}) => {
  const [searchFilter, setSearchFilter] = useState('')
  const [exclude, setExclude] = useState(excludeState)
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

  const filters = activeList.map((filter, index) =>(
    <IconButton key={filter.id} size="large" color="inherit" title={filter.label} onClick={() => { 
      handleFilterClick(filter.id, index) }
    }> 
    <img src={ 
      exclude[filter.id]? activeList[index]["active"] : activeList[index]["passive"] 
    } height="20" width="20"/> </IconButton>))

  const handleFilterClick = (filterId, index) => {
    const val = exclude[filterId]
    setExclude( oldFilterState => ({
      ...oldFilterState,
      [filterId]: !val,
    }))
  }

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
            {filters}
          </Toolbar>
        </AppBar>
      </Box>
      <br/>
      <Button variant="contained"
        onClick={() =>{ 
          getData( searchFilter, exclude );
        }}
      >
        Submit!
      </Button>
    </div>
      
  </>
  );
}

export default NavBar;