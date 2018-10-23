import React from 'react';

export default class Physical extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      record: '',
      view: '',
      show: '',
      enter: 0,
      end: false,
      alignItems: 'flex-start'
    }
  }


  handleClear() {
    this.setState({end: false, record: '', result: '', view: ''});
  }

  handleClickKnob() {
    if (this.state.alignItems === 'flex-start') {
      this.setState({alignItems: 'center'})
    } else if (this.state.alignItems === 'center') {
      this.setState({alignItems: 'flex-end'});
    } else {
      this.setState({alignItems: 'flex-start'});
    }
  }

  handleSquareRoot() {
    let record = this.state.record;
    let square = Math.sqrt(eval(record)).toString().slice(0, 12);

    this.setState({
      record: square, 
      result: square,
      end: true,
      show: 'result'
    });
  }

  handleClick(num) {
    let record = this.state.record;
    let length = record.length;
    let end = this.state.end;
    let result = this.state.result;
    let enter = this.state.enter;
    let type = '';

    if (num === '1' || num === '2' || num === '3' || num === '4' || num === '5' || num === '6' || num === '7' || num === '8' || num === '9' || num === '0') {
      type = 'num'
    } else if (num === '+' || num === '-' || num === '*' || num === '/') {
      type = 'op'
    } else {
      type = '.'
    }

    if (type === 'num') {
      if (end) {
        this.setState({
          end: false, 
          view: num, 
          record: num
        });
      } else if (record[length-1] === '+' || record[length-1] === '-' || record[length-1] === '*' || record[length-1] === '/') {
        this.setState({
          show: 'number', 
          view: num, 
          record: record + num
        });
      } else {
        this.setState({
          show: 'number', 
          view: this.state.view + num, 
          record: record + num
        });
      }
    } else if (type === 'op') {
      if (end) {
        this.setState({
          end: false, 
          show: 'result',
          result: eval(record).toString().slice(0, 12), 
          record: eval(record) + num, 
          enter: 0
        })
      } else {
        this.setState({
          end: false, 
          record: record + num, 
          enter: 0
        })
      }
    } else {
      this.setState({record: record + num, view: this.state.view + num})
    }
  }

  handleEnter() {
    let result = this.state.result;
    let record = this.state.record;
    let length = record.length;
    let lastOp = '';

    if (!this.state.enter) {
      eval(record).toString().length > 12 ? this.setState({result: eval(record).toString().slice(0, 12)}) : this.setState({result: eval(record)})

      this.setState({
        end: true, 
        show: 'result', 
        enter: 1})
    } else {
      var count = 0;

      for (let i = record.length - 1; i > -1; i--) {
        if (record[i] === '+' || record[i] === '-' || record[i] === '*' || record[i] === '/') {
          if(!count) {
            lastOp = record.slice(i, length);
            count = 1;
          }
        }
      }

      this.setState({
        end: true, 
        show: 'result',
        record: result + lastOp,
        result: eval(result + lastOp)
      });
    }
  }

  render() {
    let view = (this.state.show === 'number') ? this.state.view : this.state.result;

    return (
      <div className="col-12 col-lg physical">
        <div className="physical-container">
          <div className="braun" style={{marginBottom: '13px'}}></div>
          <div className="view-outer">
            <div className="view-inner">{view}</div>
          </div>
          <div className="dots">
            <div className="dots-col-1">
              <svg height="14" width="14" style={{"marginBottom": "6px"}}>
                <circle cx="7" cy="7" r="7" fill="#76af87" />
              </svg>
              <svg height="8" width="8">
                <circle cx="4" cy="4" r="4" fill="#bab59f" />
              </svg>
            </div>
            <div className="dots-col-2">
              <svg height="14" width="14" style={{"marginBottom": "6px"}}>
                <circle cx="7" cy="7" r="7" fill="#fd6433" />
              </svg>
              <svg height="8" width="8">
                <circle cx="4" cy="4" r="3" stroke="#bab59f" strokeWidth="1" fill="#2c2725" />
              </svg>
            </div>
            <div className="dots-col-3"></div>
            <div className="dots-col-4"></div>
            <div className="dots-col-5"></div>
            <div className="dots-col-6">
              <div className="dot-series">
                <svg height="6" width="6">
                  <circle cx="3" cy="3" r="1" fill="#bab59f" />
                </svg>
                <svg height="6" width="6">
                  <circle cx="3" cy="3" r="1" fill="#bab59f" />
                </svg>
                <svg height="6" width="6">
                  <circle cx="3" cy="3" r="1" fill="#bab59f" />
                </svg>
              </div>
              <div className="switch-container" style={{alignItems: this.state.alignItems}} onClick={() => {this.handleClickKnob() }}>
                <div className="knob" onClick={() => {this.handleClickKnob() }}>
                </div>
              </div>
            </div>
          </div>
          <div className="n-button-group">
            <div>
              <div>M+</div>
              <div>M-</div>
              <div>MR</div>
              <div>MC</div>
              <div>+/-</div>
            </div>
            <div>
              <div onClick={() => {this.handleSquareRoot() }}>√</div>
              <div className="physical-button-2" onClick={() => {this.handleClick('7') }}>7</div>
              <div className="physical-button-2" onClick={() => {this.handleClick('8') }}>8</div>
              <div className="physical-button-2" onClick={() => {this.handleClick('9') }}>9</div>
              <div onClick={() => {this.handleClick('/') }}>/</div>
            </div>
            <div>
              <div>%</div>
              <div className="physical-button-2" onClick={() => {this.handleClick('4') }}>4</div>
              <div className="physical-button-2" onClick={() => {this.handleClick('5') }}>5</div>
              <div className="physical-button-2" onClick={() => {this.handleClick('6') }}>6</div>
              <div onClick={() => {this.handleClick('*') }}>x</div>
            </div>
            <div>
              <div>1/x</div>
              <div className="physical-button-2" onClick={() => {this.handleClick('1') }}>1</div>
              <div className="physical-button-2" onClick={() => {this.handleClick('2') }}>2</div>
              <div className="physical-button-2" onClick={() => {this.handleClick('3') }}>3</div>
              <div onClick={() => {this.handleClick('-') }}>-</div>
            </div>
            <div>
              <div onClick={() => {this.handleClear() }}>CE</div>
              <div className="physical-button-2" onClick={() => {this.handleClick('0') }}>0</div>
              <div onClick={() => {this.handleClick('.') }}>.</div>
              <div className="physical-button-3" onClick={() => {this.handleEnter() }}>=</div>
              <div onClick={() => {this.handleClick('+') }}>+</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}