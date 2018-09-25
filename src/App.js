import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import loremIpsum from 'lorem-ipsum';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
} from 'react-virtualized';

const rowCount = 10000;

class App extends Component {
  constructor() {
    super();
    this.list = Array(rowCount)
      .fill()
      .map((_, index) => ({
        id: index,
        name: 'John Doe',
        image: 'http://via.placeholder.com/40',
        text: loremIpsum({
          count: 2,
          units: 'sentences',
          sentenceLowerBound: 10,
          sentenceUpperBound: 100,
        }),
      }));
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    });
  }

  renderRow = ({ index, key, parent, style }) => (
    <CellMeasurer
      key={key}
      cache={this.cache}
      parent={parent}
      columnIndex={0}
      rowIndex={index}
    >
      <div style={style} className="row">
        <div className="image">
          <img src={this.list[index].image} alt="" />
        </div>
        <div className="content">
          <div>{this.list[index].name}</div>
          <div>{this.list[index].text}</div>
        </div>
      </div>
    </CellMeasurer>
  );

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="list">
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                deferredMeasurementCache={this.cache}
                rowHeight={this.cache.rowHeight}
                rowCount={this.list.length}
                rowRenderer={this.renderRow}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}

export default App;
