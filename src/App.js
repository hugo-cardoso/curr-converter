import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { Button, Container, ExchangeInput, FlexGrid, FlexGridItem, ExchangeSelect, ExchangeLabel, ExchangeValue, CustomChartTooltip } from './styles/styles';

import CurrService from "./service/CurrService";

const CustomTooltip = props => {

  return (
    <CustomChartTooltip>
      <div style={ {color: '#272a2d'} }>{ props.payload.length ? Number(props.payload[0].value).toFixed(2) : 0 }</div>
    </CustomChartTooltip>
  )
}


class App extends Component {
  
  constructor() {
    super();
    this.currService = new CurrService();
    this.state = {
      data: null,
      to: 'BRL',
      from: 'USD',
      value: 1,
      symbol: '',
      currencies: []
    };
  }

  componentDidMount() {

    this.currService
    .currencies()
    .then(currencies => {
      
      this.convert(this.state.to,this.state.from);
      this.setState({ currencies })
    });
  }

  convert(to,from) {

    this.currService
    .convert(from,to)
    .then(data => {
      this.setState({ 
        data: data,
        symbol: this.getCurrencie( this.state.to ) 
      });
    });
  }

  buildChart() {

    if( !this.state.data ) return;

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={this.state.data.historic} margin={ { top: 0, right: 50, bottom: 5, left: 0 } }>
          <Line type="monotone" dataKey="value" stroke="#5afac3" />
          <CartesianGrid stroke="#272a2d" strokeDasharray="1 1" />
          <XAxis dataKey="name"/>
          <YAxis dataKey="value" domain={[0, 'auto']} allowDataOverflow={ true } />
          <Tooltip labelStyle={ {color: '#06090d'} } itemStyle={ {color: 'red'} } contentStyle={ {borderRadius: '2px'}} content={ <CustomTooltip /> }/>
        </LineChart>
      </ResponsiveContainer>
    )
  }

  getCurrencie( id ) {

    const data = this.state.currencies.filter(currencie => currencie.id === id)[0];

    return Object.keys(data).includes('currencySymbol') ? data.currencySymbol : '';
  }
  
  render() {
    return (
      <main className="content">
        <Container width={ '900px' }>
          <FlexGrid>
            <FlexGridItem direction={ 'column' }>
              <ExchangeLabel>From:</ExchangeLabel>
              <ExchangeSelect onChange={(e) => this.setState({to: e.target.value}, () => this.convert(this.state.to, this.state.from))} value={ this.state.to }>
                { this.state.currencies.map(option => <option value={ option.id } key={ option.id }>{ option.id }</option>) }
              </ExchangeSelect>
            </FlexGridItem>
            <FlexGridItem direction={ 'column' }>
              <ExchangeLabel>To:</ExchangeLabel>
              <ExchangeSelect onChange={(e) => this.setState({from: e.target.value}, () => this.convert(this.state.to, this.state.from))} value={ this.state.from }>
                { this.state.currencies.map(option => <option value={ option.id } key={ option.id }>{ option.id }</option>) }
              </ExchangeSelect>
            </FlexGridItem>
            <FlexGridItem direction={ 'column' }>
              <ExchangeLabel>Value:</ExchangeLabel>
              <ExchangeInput min={ 1 } type={ 'tel' } value={ this.state.value } onChange={e => this.setState({value: e.target.value})}/>
            </FlexGridItem>
          </FlexGrid>
          <FlexGrid>
            <FlexGridItem>
              <ExchangeValue>{ this.state.data ? ` ${ this.state.symbol } ${ Number(this.state.data.actual.value * this.state.value ).toFixed(2) }` : '0.00' }</ExchangeValue>
            </FlexGridItem>
          </FlexGrid>
          { this.buildChart() }
        </Container>
      </main>
    );
  }
}

export default App;
