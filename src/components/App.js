import React, { Component } from 'react';
import Chatbot from './Chatbot';
import Map from './Map';

import {json as requestJson} from 'd3-request';

const DATA_URL = 'https://raw.githubusercontent.com/Spice-Boys/Spice-Boys-Super-Secret-Project/master/public/datasets/ACT%20Division%20Boundaries.geojson'; // eslint-disable-line


class App extends Component {

    state = {
        data: null,
        heights: null,
    };

    responded(json) {
            //var data = this.state.data;
            //data.features = [ data.features[0] ];
            //this.setState({data: data});


        var heights = [];
        var suburbs = this.state.data['features'];
        for(var i=0; i<suburbs.length; i++) {
            var name = this.getSuburbName(suburbs[i]);
                heights[name] = name.length * 100;
        }
        this.setState({heights: heights});

    }

    getSuburbName(suburb) {
        return suburb.properties.division_name;
    }


  render() {

      if (this.state.data == null) {
          requestJson(DATA_URL, (error, response) => {
              if (!error) {
                  //this.setState({suburbs: response});
                  this.setState({data: response});
              }
          });
      }

    return (
      <div className="container">
          <Chatbot responded={this.responded.bind(this)}/>
          <Map data={this.state.data} heights={this.state.heights} />
      </div>
    );
  }
}

export default App;
