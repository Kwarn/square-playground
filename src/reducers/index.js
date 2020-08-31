/* FIX turnFinished 
  reconfig score to include pot/bet
*/
import * as actionTypes from '../actions'
import { produce } from 'immer'
import Cherries from '../images/cherries.jpg'
import Coin from '../images/coin.jpg'
import Banana from '../images/banana.jpg'
import Poo from '../images/poo.jpg'
import Diamond from '../images/diamond.jpg'
import Jester from '../images/jester.jpg'
import Fish from '../images/rottenfish.jpg'
import Ticket from '../images/ticket.jpg'
import Chest from '../images/chest.jpg'
import FinalChest from '../images/finalchest.jpg'

const initialState = {
  bank: 100,
  bet: 5,
  pot: 0,
  totalScore: 0,
  bonusRound: 0,
  numOfMatchesFound: 0,
  roundStarted: false,
  turnFinished: false,
  lastBoxWasAMatch: false,
  bettingRound: true,
  matchingScoreObjs: [],
  boxes: [
    { id: 0, symbol: Ticket },
    { id: 1, symbol: Ticket },
    { id: 2, symbol: Ticket },
    { id: 3, symbol: Ticket },
    { id: 4, symbol: Ticket },
    { id: 5, symbol: Chest },
    { id: 6, symbol: Chest },
    { id: 7, symbol: FinalChest },
  ],
  symbols: [
    { id: 0, symbol: Cherries },
    { id: 1, symbol: Cherries },
    { id: 2, symbol: Coin },
    { id: 3, symbol: Coin },
    { id: 4, symbol: Coin },
    { id: 5, symbol: Banana },
    { id: 6, symbol: Banana },
    { id: 7, symbol: Banana },
    { id: 8, symbol: Banana },
    { id: 9, symbol: Poo },
  ],
  bonusSymbols: [
    { id: 0, symbol: Diamond },
    { id: 1, symbol: Jester },
    { id: 2, symbol: Fish },
  ],
  scores: [
    { id: 0, total: 0, count: 0, worth: 3, symbol: Cherries },
    { id: 1, total: 0, count: 0, worth: 2, symbol: Coin },
    { id: 2, total: 0, count: 0, worth: 1.5, symbol: Banana },
    { id: 3, total: 0, count: 0, worth: -5, symbol: Poo },
  ],
  multiplierScores: [
    { id: 0, count: 0, worth: 0, symbol: Diamond },
    { id: 1, count: 0, worth: 0, symbol: Jester },
    { id: 2, count: 0, worth: 0, symbol: Fish },
  ],
}

export default (state, action) => {
  if (state === undefined) {
    return initialState
  }
  switch (action.type) {
    case actionTypes.INCREMENT_BET:
      return produce(state, draft => {
        draft.bet += action.incBet
      })

    case actionTypes.DECREMENT_BET:
      return produce(state, draft => {
        draft.bet -= action.decBet
      })

    case actionTypes.START_ROUND:
      return produce(state, draft => {
        draft.turnFinished = false
        draft.pot += draft.bet
        draft.bank -= draft.bet
        draft.roundStarted = true
        draft.bettingRound = false
      })

    case actionTypes.REVEAL_BOX:
      return produce(state, draft => {
        if (action.index < 7) {
          draft.boxes[action.index].symbol =
            draft.symbols[action.indexFromRandom].symbol
        } else {
          draft.boxes[action.index].symbol =
            draft.bonusSymbols[action.indexFromRandom].symbol
        }
      })

    case actionTypes.ADD_TO_SCORES:
      return produce(state, draft => {
        for (let score of draft.scores) {
          if (score.symbol === draft.symbols[action.indexFromRandom].symbol) {
            draft.scores[score.id].count += 1
            break
          }
        }
      })

    case actionTypes.FIND_MATCHES:
      return produce(state, draft => {
        draft.matchingScoreObjs = draft.scores.filter(score => score.count > 2)
        for (let mso of draft.matchingScoreObjs) {
          for (let box of draft.boxes) {
            if (box.symbol === mso.symbol) {
              draft.boxes[box.id].isAMatch = true
              draft.numOfMatchesFound += 1
            }
          }
        }
      })

    case actionTypes.CALC_TOTAL_SCORE:
      function calcTotal() {
        produce(state, draft => {
          let total = 0
          for (let mso of draft.matchingScoreObjs) {
            total = mso.worth * draft.bet
            if (mso.count > 3) {
              total += mso.worth * (mso.count - 3)
            }
            let index = draft.matchingScoreObjs.indexOf(mso)
            draft.matchingScoreObjs[index].total += total
          }
        })
      }
      function calculateTotal(mso, bet) {
        let total = 0
        total = mso.worth * bet
        if (mso.count > 3) {
          total += mso.worth * (mso.count - 3)
        }
        return total
      }
      return produce(state, draft => {
        if (draft.matchingScoreObjs.length > 0) {
          if (draft.scores[3].count > 2) {
            draft.totalScore = 0
          } else {
            let total = 0
            if (action.index === 4) {
              for (let mso of draft.matchingScoreObjs) {
                total += calculateTotal(mso, draft.bet)
                draft.scores[mso.id].total += total
                draft.totalScore += total
              }
            } else {
              for (let mso of draft.matchingScoreObjs) {
                if (draft.boxes[action.index].symbol === mso.symbol) {
                  total += calculateTotal(mso, draft.bet)
                  draft.scores[mso.id].total += total
                  draft.totalScore += total
                }
              }
            }
          }
          draft.matchingScoreObjs = draft.scores.filter(
            score => score.count > 2
          )
        }
      })

    case actionTypes.CALC_FINAL_CHEST_RESULT:
      return produce(state, draft => {
        if (action.indexFromRandom === 0) draft.totalScore *= 2
      })

    case 'NEW_ROUND':
      return produce(state, draft => {
        draft.bank += draft.totalScore
        draft.pot = 0
        draft.bet = 5
        draft.totalScore = 0
        draft.numOfMatchesFound = 0
        draft.roundStarted = false
        draft.bettingRound = true
        draft.bonusRound = false
        draft.boxes = initialState.boxes
        draft.scores = initialState.scores
        draft.multiplierScores = initialState.multiplierScores
        draft.matchingScoreObjs = []
      })
    case 'START_BETTING_ROUND':
      return produce(state, draft => {
        draft.bettingRound = true
        draft.roundStarted = false
        draft.bet = 5
      })
    case 'NEXT_BONUS_ROUND':
      return produce(state, draft => {
        draft.bonusRound += 1
      })
    case 'FINISH_TURN':
      return produce(state, draft => {
        draft.turnFinished = true
      })
    default:
      return state
  }
}
/* case "SET_INSTANCE":
return produce(state, draft => {
  let scoreObject = draft.scores.find(
    score => score.symbol === draft.symbols[action.indexFromRandom].value
    );
    if (!draft.bonusRound) {
      draft.boxes[action.index].instance = scoreObject.value;
    } else {
      draft.bonusboxes[action.index].instance = scoreObject.value;
    }
  }); */

/* case "FIND_MATCHES":
  return produce(state,draft=>{ 
    for (let i of draft.scores) {
      if (i.value >= 3) {
        if(matchingScoreObjects){
          for(let mso in draft.matchingScoreObjects){
            if (mso.symbol != i.symbol){
              draft.matchingScoreObjects.push(i);
            }else{
              draft.matchingScoreObjects.indexOf(mso.symbol).value +=1
            }
          }
        }else{
          draft.matchingScoreObjects.push(i);
        }
        
        for (let ticketBox of draft.boxes) {
          if (ticketBox.value === i.symbol) {
            draft.boxes[ticketBox.id].isAMatch = true;
          }
        }
        for (let bonusBox of draft.bonusboxes) {
          if (bonusBox.value === i.symbol) {
            draft.bonusboxes[bonusBox.id].isAMatch = true;
          }
        }
      }
    }
  }); */

/* for (let i of draft.scores) {
    if (i.value === 3) {
      if (draft.matchingScoreObjects.length < 1) {
        draft.matchingScoreObjects.push(i);
      } else {
        for (let mso of draft.matchingScoreObjects) {
          if (i.symbol !== mso.symbol) {
            draft.matchingScoreObjects.push(i);
          }
        }
      }
    }
  }
  console.log("MSO length", draft.matchingScoreObjects.length); */
