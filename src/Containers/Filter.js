import React, { Component } from "react";
import { Box, TextInput } from "grommet";
import { Search } from "grommet-icons";

export default class Filter extends Component {
  render() {
    return (
      <Box
        align="center"
        direction="row"
        width="medium"
        border="all"
        round="xsmall"
        pad={{
          horizontal: "small",
          vertical: "xsmall"
        }}
      >
        <Search color="brand" />
        <TextInput
          type="text"
          placeholder="Search for playlist or song name ..."
          onChange={event => this.props.onTextChange(event.target.value)}
          plain
        />
      </Box>
    );
  }
}
