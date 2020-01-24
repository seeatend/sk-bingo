import React from 'react'

// Images
import Team1 from '../../assets/images/logos/logo-sk-color.png'
import Team2 from '../../assets/images/logos/logo-taipans.svg'

class MarkPanel extends React.Component {
  render() {
    return (
      <div className="mark-panel">
        <div className="mark-panel-content">
          <img className="team-img-1" src={Team1} alt=""/> 
          {
            this.props.type === 'start' && (
              <div className="quarter-part">
                <div className="mark-board">
                  <div className="scores-part" style={{visibility: 'hidden'}}>
                    <div className="score bold">--</div>
                    <div className="dividier">:</div>
                    <div className="score bold">--</div>
                  </div>
                </div>
                <div className="time bold">Starts in 1d 12hrs 1m</div>
              </div>
            )
          }
          {
            this.props.type === 'loading' && (
              <div className="quarter-part">
                <div className="time bold">Starts in 1d 12hrs 1m</div>
              </div>
            )
          }
          {
            this.props.type === 'loaded' && (
              <div className="quarter-part">
                <div className="quarter bold">1ST QUARTER</div>
                <div className="mark-board">
                  <div className="scores-part">
                    <div className="score bold">--</div>
                    <div className="dividier">:</div>
                    <div className="score bold">--</div>
                  </div>
                </div>
                <div className="time bold">Starts in 1d 12hrs 1m</div>
              </div>
            )
          }
          {
            this.props.type === 'started' && (
              <div className="quarter-part">
                <div className="quarter bold">1ST QUARTER</div>
                <div className="mark-board">
                  <div className="scores-part">
                    <div className="score bold">--</div>
                    <div className="dividier">:</div>
                    <div className="score bold">--</div>
                  </div>
                </div>
                <div className="time bold">9:59</div>
              </div>
            )
          }
          <img className="team-img-2" src={Team2} alt=""/>
        </div>
      </div>
    );
  }
}

export default MarkPanel;
