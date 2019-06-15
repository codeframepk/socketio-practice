import React, { Component } from "react";
import socket from "../socketConfig";
export default class GetWeather extends Component {
  componentDidMount() {
    socket.on("getWheather", data => {
      console.log(data);
    });
  }
  render() {
    return <div>Asif</div>;
  }
}
