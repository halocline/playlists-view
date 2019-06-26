import React, { Component } from "react";
import { Box, Button, Collapsible, Layer } from "grommet";
import { FormClose } from "grommet-icons";

export default class Sidebar extends Component {
  render() {
    const showSidebar = this.props.showSidebar;
    const size = this.props.size;

    return !showSidebar || size !== "small" ? (
      <Collapsible direction="horizontal" open={showSidebar}>
        <Box
          flex
          width="medium"
          background="light-2"
          elevation="small"
          align="center"
          justify="center"
        >
          Sidebar
        </Box>
      </Collapsible>
    ) : (
      <Layer>
        <Box
          direction="row"
          background="light-2"
          tag="header"
          justify="end"
          align="center"
        >
          <Button icon={<FormClose />} onClick={this.props.closeSidebar} />
        </Box>
        <Box fill background="light-2" align="center" justify="center">
          Sidebar
        </Box>
      </Layer>
    );
  }
}
