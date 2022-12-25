import * as React from "react";
import  {
  Accordion, AccordionSummary, AccordionDetails, Box, Button, Card, CardActions, CardContent, Collapse, createTheme, Grid, Typography,  ListSubheader, ListItemButton,
   List, ListItem, ThemeProvider
} from "@mui/material";

import BasicCard from "./basicCard";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";


export default function Item({item}) {


  const [openParent, setOpenParent] = React.useState(false);
  const [openChild, setOpenChild] = React.useState(false);

  const parentToggle = () => {
    setOpenParent(!openParent);
  };

  const childToggle= () => {
    setOpenChild(!openChild);
  };
  const theme = createTheme();

  // const classes = useStyles();

  return (
    <>
    <ThemeProvider theme={theme}>
    <Collapse in={openParent} timeout="auto" unmountOnExit>
        <List>
        {
          item.parents.map((item, index)=>{
            return (
              <ListItemButton sx={{ pl: 8 }} key="prntl_${index}">
                <BasicCard  item={item} index={index} key="prnt_${index}"/>
              </ListItemButton>
            )  
          })
        }
      </List>
    </Collapse>

    <List component="div" disablePadding>
      <ListItemButton sx={{ pl: 56 }}>
            {openParent ? (
          <ExpandLess onClick={parentToggle} />
        ) : (
          <ExpandMore onClick={parentToggle} />
        )}
        {
          [item.node].map((node) => {
            return ( 
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography><BasicCard item={node} key="node" /></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <List component="div" disablePadding>

                      {
                        item.children.map((item, index)=>{
                          return (
                            <ListItemButton sx={{ pl: 112 }} key="chldrnl_${index}">
                              <BasicCard  item={item} index={index} key="chldrn_${index}"/>
                            </ListItemButton>
                          )
                          
                        })
                      }

                    </List>

                  </Typography>
                </AccordionDetails>
              </Accordion>
            </>)
          })
        }
      </ListItemButton>
    </List>
    </ThemeProvider>
    </>
  );
}
