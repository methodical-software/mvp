import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import Item from "./item";

export default function NestedList({items}) {

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }d
    >
      { 
        items.map((item, index) => {
          console.log(item);
          return(<Item item={item} index={index} key="item_{item.node.IRI}" />);
        })
      }
    </List>
  );
}
