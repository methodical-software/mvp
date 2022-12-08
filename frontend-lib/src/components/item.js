import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BasicCard from "./basicCard";
import Collapse from "@mui/material/Collapse";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
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
  return (
    <>
    <Collapse in={openParent} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>

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
            return ( <BasicCard item={node} key="node" /> )
          })
          
        }
        
        {openChild ? (
          <ExpandLess onClick={childToggle} />
        ) : (
          <ExpandMore onClick={childToggle} />
        )}
      </ListItemButton>
      <Collapse in={openChild} timeout="auto" unmountOnExit>
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
      </Collapse>
    </List>
    </>
  );
}
