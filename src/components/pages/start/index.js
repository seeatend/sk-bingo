import React from 'react'
import { Link } from 'react-router-dom'
import MarkPanel from '../../common/markPanel'

// Images
import LogoImg from '../../../assets/images/logos/logo-sk-color.png'
import VHSLogo from '../../../assets/images/vhs.png'

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 1
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({ status: 2 }), 2000)
  }

  render() {
    return (
      <div className="page-content start">
        {
          this.state.status === 1 ?
            <img className="logo-img" src={LogoImg} alt="" />
            :
            <div className="start-content">
              <div style={{width: '100%'}}>
                <div className="top">
                  <div className="bingo bold">BINGO</div>
                  <div className="hot condensed">HOT HAND</div>
                </div>
                <div className="mark-content">
                  <MarkPanel type="start" />
                </div>
                <div className="desc">
                  If the game has already started. Depending on quarter - show information related to playing bingo in the next quarter.
                </div>
              </div>
              <div className="footer">
                <Link to="/cards">
                  <button className="start-btn bold">START</button>
                </Link>
                <img className="vhsLogo" src={VHSLogo} alt="" />
                <div className="indicator" />
              </div>
            </div>
        }
      </div>
    );
  }
}

export default Start;
