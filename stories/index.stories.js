import React from 'react'
import { storiesOf } from '@storybook/react'

import { LoadBar } from '../dist/index'
import PropTypes from 'prop-types'

storiesOf('LoadBar', module)
    .add('with percent 65', () => <LoadBar percent={65} />)
    .add('with percent -20', () => <LoadBar percent={-20} />)
    .add('with percent 110', () => <LoadBar percent={110} />)
    .add('with percent 45 + spinner', () => <LoadBar percent={45} showSpinner={true} />)
    .add('with percent updates', () => <AnimatingLoadBar />)
    .add('with percent updates step=20', () => <AnimatingLoadBar step={20} />)

// TODO Find a home
class AnimatingLoadBar extends React.Component {
  static propTypes = {
      noLoop: PropTypes.bool,
      step: PropTypes.number
  }

  state = { percent: 1 }
  _timeout = 0

  componentDidMount() {
      this._timeout = setInterval(() => {
          this.setState({ percent: Math.min(100, this.state.percent + (this.props.step || 5)) }, () => {
              if (this.state.percent === 100) {
                  clearTimeout(this._timeout)
                  if (!this.props.noLoop) {
                      // Loop
                      setTimeout(() => {
                          this.setState({ percent: 1 })
                          this.componentDidMount()
                      }, 1500)
                  }
              }
          })
      }, 500)
  }

  render() {
      return <LoadBar percent={this.state.percent} showSpinner={true} />
  }
}