import React from 'react'
import { Link } from 'react-router-dom'

// Images
import SkLogo from '../../../assets/images/logos/logo-sk.png'
import CLogo from '../../../assets/images/logos/logo-c.png'
import ZedLogo from '../../../assets/images/logos/logo-zed.png'
import UnikrnLogo from '../../../assets/images/logos/logo-unikrn.png'
import BasketLogo from '../../../assets/images/logos/logo-basket-forever.png'
import VHSLogo from '../../../assets/images/vhs.png'

class Congrats extends React.Component {

  render() {
    return (
      <div className="page-content congrats">
        <div className="congrats-content">
          <div className="logos-content">
            <h2 className="congrats-text">CONGRATULATIONS</h2>
            <div className="logos">
              <div className="logo-img"><img className="sk" src={SkLogo} alt="" /></div>
              <div className="logo-img"><img className="c" src={CLogo} alt="" /></div>
              <div className="logo-img"><img className="c" src={CLogo} alt="" /></div>
              <div className="logo-img"><img className="zed" src={ZedLogo} alt="" /></div>
              <div className="logo-img"><img className="unikrn" src={UnikrnLogo} alt="" /></div>
              <div className="logo-img"><img className="basket" src={BasketLogo} alt="" /></div>
            </div>
          </div>
          <div className="footer">
            <h5 className="winner-text">YOU ARE A WINNER!</h5>
            <Link to="/cards">
              <button className="start-btn bold">REGISTER TO CLAIM</button>
            </Link>
            <img className="vhsLogo" src={VHSLogo} alt="" />
            <div className="indicator" />
          </div>
        </div>
      </div>
    );
  }
}

export default Congrats;
