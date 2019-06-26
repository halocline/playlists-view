import React, { Component } from "react";
import { Box, TextInput } from "grommet";

export default class Filter extends Component {
  render() {
    return (
      <Box direction="row" width="medium" margin="medium">
        <TextInput
          type="text"
          placeholder="Search"
          onChange={event => this.props.onTextChange(event.target.value)}
        />
      </Box>
    );
  }
}
