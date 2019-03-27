import React from 'react';
import { ETIME } from 'constants';
import '../css/style.less'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      balanceValue: '',
      rateValue: '',
      termValue: 15,
      result: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleChange(e) {
    if (e.target.name === 'balance') {
      this.setState({ balanceValue: Number(e.target.value) });
    } else if (e.target.name === 'rate') {
      this.setState({ rateValue: Number(e.target.value) });
    } else if (e.target.name === 'term') {
      this.setState({ termValue: Number(e.target.value) });
    }
  }

  calculate(balance, rate, term) {
    const p = balance;
    const r = (rate / 100) / 12;
    const n = term * 12;
    const m = Number((p * (r * (1 + r) ** n) / ((1 + r) ** n - 1)).toFixed(2));
    this.setState({ result: m })
  }

  render() {
    return (
      <div className='container'>

        <h3>Mortgage Calculator</h3>
        <div className="row">

          <div className="col-md-1 form-group">
            <label htmlFor="balance">Loan Balance: </label>
            <input name="balance" type="number" value={this.state.balanceValue} onChange={this.handleChange} className="form-control" />
          </div>

          <div className="col-md-1 form-group">
            <label htmlFor="rate">Interest Rate (%): </label>
            <input name="rate" type="number" step="0.01" value={this.state.rateValue} onChange={this.handleChange} className="form-control" />
          </div>

          <div className="col-md-1 form-group">
            <label htmlFor="term">Loan Term (years): </label>
            <select name="term" type="number" value={this.state.termValue} onChange={this.handleChange} className="form-control">
              <option value="15">15</option>
              <option value="30">30</option>
            </select>
          </div>

          <div className="col-md-1">
            <button name="submit" className="btn btn-primary btn-block" onClick={() => this.calculate(this.state.balanceValue, this.state.rateValue, this.state.termValue)} disabled={!this.state.balanceValue || !this.state.rateValue || !this.state.termValue}> Calculate </button>
          </div>

          <div className="col-md-1" id="output">
            <h4 className="text-center font-weight-bold text-primary" >Monthly Payment: {this.state.result ? "$" + this.state.result : ''}</h4>
          </div>

        </div>
      </div>
    );
  }
}