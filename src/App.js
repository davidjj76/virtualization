import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import loremIpsum from 'lorem-ipsum';
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  Grid,
} from 'react-virtualized';

const rowCount = 10000;
const columnCount = 1;

class App extends Component {
  constructor() {
    super();
    this.list = Array(rowCount)
      .fill()
      .map((_, rowIndex) =>
        Array(columnCount)
          .fill()
          .map((_, columnIndex) => ({
            id: `${rowIndex}-${columnIndex}`,
            name: 'John Doe',
            salutation: 'Mr.',
            image: 'http://via.placeholder.com/320',
            // text: loremIpsum({
            //   count: 2,
            //   units: 'sentences',
            //   sentenceLowerBound: 10,
            //   sentenceUpperBound: 100,
            // }),
          })),
      );
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    });
  }

  renderCell = ({ rowIndex, columnIndex, key, parent, style }) => (
    <CellMeasurer
      key={key}
      cache={this.cache}
      parent={parent}
      columnIndex={columnIndex}
      rowIndex={rowIndex}
    >
      {({ measure }) => (
        <div style={style} className="cell">
          <div className="card">
            <div className="image">
              <img
                src={this.list[rowIndex][columnIndex].image}
                alt=""
                onLoad={measure}
              />
            </div>
            <div className="content">
              <div>{this.list[rowIndex][columnIndex].salutation}</div>
              <div>{this.list[rowIndex][columnIndex].name}</div>
            </div>
          </div>
        </div>
      )}
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
              <Grid
                className="grid"
                width={width}
                height={height}
                deferredMeasurementCache={this.cache}
                rowHeight={this.cache.rowHeight}
                rowCount={this.list.length}
                cellRenderer={this.renderCell}
                columnCount={this.list[0].length}
                columnWidth={width / this.list[0].length}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}

export default App;
