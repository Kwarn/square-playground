export const INCREMENT_BET = "INCREMENT_BET";
export const DECREMENT_BET = "DECREMENT_BET";
export const START_ROUND = "START_ROUND";
export const REVEAL_BOX = "REVEAL_BOX";
export const ADD_TO_SCORES = "ADD_TO_SCORES";
export const SET_INSTANCE = "SET_INSTANCE";
export const FIND_MATCHES = "FIND_MATCHES";
export const CALC_TOTAL_SCORE = "CALC_TOTAL_SCORE";
export const CALC_FINAL_CHEST_RESULT = "CALC_FINAL_CHEST_RESULT";
export const NEW_ROUND = "NEW_ROUND";
export const START_BETTING_ROUND = "START_BETTING_ROUND";
export const NEXT_BONUS_ROUND = "NEXT_BONUS_ROUND";
export const FINISH_TURN = "FINISH_TURN";

export const incrementBet = incBet => ({
  type: INCREMENT_BET,
  incBet
});
export const decrementBet = decBet => ({
  type: DECREMENT_BET,
  decBet
});
export const startRound = bet => ({
  type: START_ROUND,
  bet
});
export const startBettingRound = () => ({
  type: START_BETTING_ROUND
});
export const startBonusRound = () => ({
  type: NEXT_BONUS_ROUND
});
export const revealBox = (index, indexFromRandom) => ({
  type: REVEAL_BOX,
  index,
  indexFromRandom
});
export const addToScores = indexFromRandom => ({
  type: ADD_TO_SCORES,
  indexFromRandom
});
export const findMatches = () => ({
  type: FIND_MATCHES
});
export const calcTotalScore = index => ({
  type: CALC_TOTAL_SCORE,
  index
});
export const calcFinalChestResult = indexFromRandom => ({
  type: CALC_FINAL_CHEST_RESULT,
  indexFromRandom
});
export const newRound = () => ({
  type: NEW_ROUND
});
export const finishTurn = () => ({
  type: FINISH_TURN
});
/* export const setInstance = (boxType, index, indexFromRandom) => ({
  type: SET_INSTANCE,
  boxType,
  index,
  indexFromRandom
}); */
