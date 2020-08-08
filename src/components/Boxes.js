import React, { Component } from 'react'
import '../ccs/Boxes.css'
export default class Boxes extends Component {
  render() {
    const { boxes, style } = this.props
    return (
      <div /* className={bettingRound ? "border-red" : "border-green"} */>
        {boxes.map(box => (
          <img
            className={box.isAMatch ? 'match' : null}
            key={box.id}
            src={box.value}
            style={style}
            alt={box.id}
          />
        ))}
      </div>
    )
  }
}
