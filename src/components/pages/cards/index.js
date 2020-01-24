import React from 'react'
import Modal from 'react-modal'
import { clone, sortBy } from 'lodash'

import MarkPanel from '../../common/markPanel'

// Images
import Randomizing from '../../../assets/images/img-randomizing.svg'
import VHSLogo from '../../../assets/images/vhs.png'
import IconMatchStarter from '../../../assets/images/icn-match-start.svg'
import IconBingoBall from '../../../assets/images/icn-ball.svg'
import IconBingoCheckedBall from '../../../assets/images/icn-ball-claimed.svg'
import IconDots from '../../../assets/images/icn-dots.svg'
import IconHelp from '../../../assets/images/icn-help.svg'
import IconClose from '../../../assets/images/icn-close.svg'
import PlayerImgs from '../../../assets/images/photos/index.js'
import HelpImg1 from '../../../assets/images/img-help-01.png'
import HelpImg2 from '../../../assets/images/img-help-02.png'
import HelpImg3 from '../../../assets/images/img-help-03.png'

const eventNames = ['first points', 'pts +foal', 'crossover', 'intercept', 'dunk', '3 pointer', 'alley oop', 'free throw +1', 'block', 'winning basket', 'steal', 'free throw +2']

const allEvents = [
  {
    cardId: 0,
    cardNumber: 22,
    event: 11,
    time: 8,
    name: 'Didi Louzada',
  },
  { 
    cardId: 1,
    cardNumber: 1,
    event: 2,
    time: 2,
    name: 'Jordan Hunter',
  },
  { 
    cardId: 2,
    cardNumber: 7,
    event: 5,
    time: 11,
    name: 'Lochlan Hutchison',
  },
  { 
    cardId: 3,
    cardNumber: 8,
    event: 6,
    time: 55,
    name: 'M.Jack',
  },
  { 
    cardId: 4,
    cardNumber: 14,
    event: 9,
    time: 30,
    name: 'K.Sam',
  },
  { 
    cardId: 5,
    cardNumber: 9,
    event: 7,
    time: 45,
    name: 'C.Ronaldo',
  },
  { 
    cardId: 6,
    cardNumber: 11,
    event: 1,
    time: 50,
    name: 'Andrew Bogut',
  },
  { 
    cardId: 7,
    cardNumber: 2,
    event: 8,
    time: 35,
    name: 'Shaun Bruce',
  },
  { 
    cardId: 8,
    cardNumber: 24,
    event: 11,
    time: 25,
    name: 'Brad Newley',
  },
  { 
    cardId: 9,
    cardNumber: 24,
    event: 1,
    time: 97,
    name: 'Craig Moller',
  },
  { 
    cardId: 10,
    cardNumber: 0,
    event: 5,
    time: 20,
    name: 'Xavier Cooks',
  },
  { 
    cardId: 11,
    cardNumber: 12,
    event: 1,
    time: 85,
    name: 'Kevin Lisch',
  },
  { 
    cardId: 12,
    cardNumber: 15,
    event: 8,
    time: 90,
    name: 'Lucas Walker',
  },
  { 
    cardId: 13,
    cardNumber: 2,
    event: 4,
    time: 80,
    name: 'D.Martin',
  },
  { 
    cardId: 14,
    cardNumber: 6,
    event: 9,
    time: 65,
    name: 'Daniel Kickert',
  },
  { 
    cardId: 15,
    cardNumber: 10,
    event: 8,
    time: 70,
    name: 'Kuany Kuany',
  },
  { 
    cardId: 16,
    cardNumber: 25,
    event: 1,
    time: 75,
    name: 'S.Tomy',
  },
  { 
    cardId: 17,
    cardNumber: 0,
    event: 2,
    time: 51,
    name: 'W.Philips',
  },
  { 
    cardId: 18,
    cardNumber: 1,
    event: 4,
    time: 68,
    name: 'A.Windsor',
  },
  { 
    cardId: 19,
    cardNumber: 6,
    event: 5,
    time: 73,
    name: 'S.Feaster',
  },
  { 
    cardId: 20,
    cardNumber: 7,
    event: 6,
    time: 15,
    name: 'J.Inglis',
  },
  { 
    cardId: 21,
    cardNumber: 8,
    event: 7,
    time: 83,
    name: 'Hunter-Jack Madden',
  },
  { 
    cardId: 22,
    cardNumber: 9,
    event: 9,
    time: 115,
    name: 'Casper Ware',
  },
  { 
    cardId: 23,
    cardNumber: 10,
    event: 1,
    time: 150,
    name: 'Jae Sean Tate',
  },
  { 
    cardId: 24,
    cardNumber: 11,
    event: 10,
    time: 135,
    name: 'Banjo Talbot',
  },
]

const bingoCards = [
  {
    cardId: 3,
    letter: 'B'
  }, 
  {
    cardId: 8,
    letter: 'I'
  }, 
  {
    cardId: 13,
    letter: 'N'
  }, 
  {
    cardId: 18,
    letter: 'G'
  }, 
  {
    cardId: 23,
    letter: 'O'
  },
]

class Cards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 1,
      slideOpen: false,
      helpModalOpen: false,
      cards: [...allEvents],
      occuredEvents: [],
      bingoEvents: [],
      bingoStatus: 'loading',
      tileDetail: {}
    }
  }

  componentDidMount() {
    this.counter = 0
    this.allEvents = sortBy(allEvents, (o) => o.time )
    setTimeout(() => this.setState({ status: 2 }), 3000)
    setTimeout(() => { this.setState({ status: 3 }); this.bingoStart(); }, 5000)
  }

  componentWillUnmount() {
    clearInterval(this.clr)
  }

  bingoStart = () => {
    const that = this
    this.setState({ bingoStatus: 'started' })
    this.clr = setInterval(function () {
      that.counter++
      that.allEvents.forEach(e => {
        if (e.time === that.counter) {
          let occuredEvents = clone(that.state.occuredEvents)
          occuredEvents.push(e)
          that.setState({ occuredEvents, tileDetail: {} })
          let bEvent = bingoCards.filter(b => b.cardId === e.cardId)
          if (bEvent.length !== 0) {
            let bingoEvents = clone(that.state.bingoEvents)
            bingoEvents.push(bEvent[0])
            that.setState({ bingoEvents })
          }
        }
      })
    }, 1000) 
  }

  tapTile = (index) => {
    let { occuredEvents } = this.state
    let cards = clone(this.state.cards)
    let bingoEvents = clone(this.state.bingoEvents)
    
    if (occuredEvents.filter(e => e.cardId === index).length !== 0) {
      cards[index].tapped = true
      bingoEvents.forEach(e => { if(e.cardId === index) e.checked = true })
      this.setState({ cards, bingoEvents })
      if (bingoEvents.length === 5 && bingoEvents.every((e) => e.checked)) {
        setTimeout(() => this.setState({ bingoStatus: 'done' }), 1500)
        setTimeout(() => this.props.history.push('/congrats'), 2000)
        clearInterval(this.clr)
      }
    } else {
      let tileDetail = this.state.cards.filter(e => e.cardId === index)[0]
      this.setState({ tileDetail })
    }
  }

  render() {
    const { 
      status,
      slideOpen,
      bingoStatus,
      occuredEvents,
      bingoEvents,
      helpModalOpen,
      cards,
      tileDetail
    } = this.state

    const lastOccuredEvent = occuredEvents.length !== 0 ? occuredEvents[occuredEvents.length-1] : null
    const lastBingoEvent = bingoEvents.length !== 0 ? bingoEvents[bingoEvents.length-1] : null

    return (
      <div className="page-content cards-page">
        <div>
          <div className={`top ${slideOpen ? 'blur' : ''}`}>
            <div className="title">
              <span>BINGO</span>
              <span>HOT HAND</span>
            </div>
            { status === 1 && <MarkPanel type="loading" /> }
            { status === 2 && <MarkPanel type="loaded" /> }
            { status === 3 && <MarkPanel type="started" /> }
          </div>

          {
            status === 1 && (
              <div className="creating-content">
                <img className="randomImg" src={Randomizing} alt="" />
                <div className="text1 condensed">RANDOMIZING</div>
                <div className="text2">Creating your Bingo card</div>
              </div>
            )
          }
          {
            status === 2 && (
              <div className="tiles" style={{marginTop: '42px'}}>
                <div className="cards-content">
                  {
                    cards.map((c, i) => (
                      <div className="card-content" key={i}>
                        <div className="card tapped">
                          <span className="number">{c.cardNumber}</span>
                          <span className="action">{eventNames[c.event - 1]}</span>
                          <img className="playerImg" src={PlayerImgs[`player${c.cardId+1}`]} alt="" />
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            )
          }
          {
            status === 3 && (
              <div className={`bingo-content ${slideOpen ? 'opened' : 'closed'}`}>
                <div className="event-status" onClick={() => this.setState({ slideOpen: true })}>
                  <div className={`event ${(lastOccuredEvent !== null && bingoStatus !== 'done')? 'active': ''}`}>
                    {
                      (lastOccuredEvent !== null && bingoStatus !== 'done') ? 
                        <>
                          <div className="number bold">{lastOccuredEvent.cardNumber}</div>
                          <span>{lastOccuredEvent.name}{` -  `}<span className="bold">{eventNames[lastOccuredEvent.event-1]}</span></span>
                        </>
                        : 
                        <div>Live Match Feed...</div>
                    }
                  </div>
                  <img src={IconDots} alt="" />
                </div>
                <div className="tiles">
                  <div className="cards-content">
                    {
                      cards.map((c, i) => {
                        let bingoEvent = bingoEvents.filter(b => b.cardId === i)
                        let isBingoCard = bingoEvent.length !== 0
                        return (
                          <div className="card-content" key={i}>
                            {
                              (bingoStatus === 'done' && isBingoCard) ?
                                <div className="card done" >
                                  {bingoEvent[0].letter}
                                </div>
                                :
                                <div 
                                  className={`card ${c.tapped ? (isBingoCard ? 'isBingo' : 'tapped') : ''} ${lastOccuredEvent !== null && lastOccuredEvent.cardId === i && !c.tapped ? 'highlighted': ''}`}
                                  onClick={bingoStatus !== 'done' ? () => this.tapTile(i) : null}
                                >
                                  <span className="number">{c.cardNumber}</span>
                                  <span className="action">{eventNames[c.event - 1]}</span>
                                  <img className="playerImg" src={PlayerImgs[`player${c.cardId+1}`]} alt="" />
                                </div>
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                <div className="sliding-pane">
                  <div className="feed-text bold">Live Match Feed</div>
                  <div className="match-quarter">
                    <div className="match-feed bold" onClick={() => this.setState({ slideOpen: false })}>1ST QUARTER</div>
                    <div className="events">
                      {
                        clone(occuredEvents).reverse().map((e, i) => {
                          let bingoEvent = bingoEvents.filter(b => b.cardId === e.cardId)
                          let isBingoEvent = bingoEvent.length !== 0
                          let isBingoChecked = isBingoEvent && bingoEvent[0].checked

                          return (
                            <div className="event" key={i}>
                              <div className="info">
                                <div className="time">10:00</div>
                                <div>
                                  <div className="name bold">{e.cardNumber} <span style={{color: '#BABABA'}}>- {e.name}</span></div>
                                  <div className="event-name bold">{eventNames[e.event-1]}</div>
                                </div>
                              </div>
                              { 
                                isBingoEvent && (
                                  !isBingoChecked ? 
                                    <img className="ball-icon" src={IconBingoBall} alt="" />
                                    :
                                    <img className="ball-icon" src={IconBingoCheckedBall} alt="" />
                                ) 
                              }
                            </div>
                          )
                        })
                      }
                      {
                        bingoStatus === 'started' && (
                          <div className="event">
                            <div className="info">
                              <div className="time">10:00</div>
                              <div>
                                <div className="event-name bold">Match started</div>
                              </div>
                            </div>
                            <img className="ball-icon" src={IconMatchStarter} alt="" />
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
                {
                  Object.keys(tileDetail).length ===0 ?
                    <div className={`bingo-status ${lastBingoEvent !== null ? 'active' : ''} ${slideOpen ? 'blur' : ''}`}>
                      { bingoEvents.length !== 5 && lastBingoEvent === null && 'Tap a tile to see more information' }
                      { bingoEvents.length !== 5 && lastBingoEvent !== null  && !lastBingoEvent.checked && 'Calling Out!' }
                      { bingoEvents.length !== 5 && lastBingoEvent !== null  && lastBingoEvent.checked && 'Very well. Keep on!' }
                      { bingoEvents.length === 5 && lastBingoEvent !== null  && !lastBingoEvent.checked && 'Called Out! Hit it!' }
                      { bingoStatus !== 'done' && bingoEvents.length === 5 && bingoEvents.every((e) => e.checked) && 'Great job!' }
                      { bingoStatus === 'done' && <span className="winner bold">YOU ARE A WINNER!</span> }
                    </div>
                    :
                    <div className="tile-detail">
                      <div className="playerImg">
                        <img src={PlayerImgs[`player${tileDetail.cardId+1}`]} alt="" />
                      </div>
                      <div className="info">
                        <div className="name bold">{tileDetail.cardNumber} {tileDetail.name}</div>
                        <div className="name bold">Player 1st Basket</div>
                        <div className="desc">Occurs when player throws the ball amd scores a goal and a behind post a behind.</div>
                      </div>
                    </div>
                }
              </div>
            )
          }
        </div>

        <div className="footer">
          { 
            status === 1
              ? <img src={VHSLogo} alt="" />
              : Object.keys(tileDetail).length ===0 && <img src={IconHelp} alt="" onClick={() => this.setState({ helpModalOpen: true })} />    
          }
          <div className="indicater" />
        </div>

        <Modal
          key="help-tile"
          className="help-modal"
          isOpen={helpModalOpen}
          onRequestClose={() => this.setState({ helpModalOpen: false })}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
        >
          <div className="help-modal-content">
            <div style={{marginTop: '60px'}}>
              <div className="title">Rules to play</div>
              <ul className="rules">
                <li>Wait till action from your tile Called Out.</li>
                <li>Claim a tile on your Bingo Card.</li>
                <li>Must make a horizontal, diagonal OR vertical line to get a BINGO</li>
              </ul>
              <div className="help-imgs">
                <div className="help-img"><img src={HelpImg1} alt="" /></div>
                <div className="help-img"><img src={HelpImg2} alt="" /></div>
                <div className="help-img"><img src={HelpImg3} alt="" /></div>
              </div>
            </div>
            <div className="footer">
              <img src={IconClose} alt="" onClick={() => this.setState({ helpModalOpen: false })} />
              <div className="indicater" />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Cards;
