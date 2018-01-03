import React from 'react'
import { storiesOf } from '@storybook/react'

import { LoadBar } from '../src'
import PropTypes from 'prop-types'

storiesOf('LoadBar', module)
    .add('with percent 65', () => <LoadBar percent={65} />)
    .add('with percent 45 + spinner', () => <LoadBar percent={45} showSpinner={true} />)
    .add('with percent manual updates', () => <AnimatingLoadBar step={20} />)
    .add('with percent manual updates, early toggled visibility', () => (
        <AnimatingLoadBar step={20} hideAfterTicks={3} />
    ))

storiesOf('LoadBar/antipatterns', module)
    .add('with percent -20', () => <LoadBar percent={-20} />)
    .add('with percent 110', () => <LoadBar percent={110} showSpinner={true} />)

// TODO Find a home
class AnimatingLoadBar extends React.Component {
    static propTypes = {
        noLoop: PropTypes.bool,
        step: PropTypes.number,
        hideAfterTicks: PropTypes.number
    }

    state = { percent: 1, visible: true }
    _timeout = 0
    _timeout2 = 0
    _tickMs = 500

    componentDidMount() {
        if (this.props.hideAfterTicks) {
            this._timeout2 = setTimeout(() => {
                this.setState({ visible: false })
                clearTimeout(this._timeout)
            }, this._tickMs * this.props.hideAfterTicks + 1)
        }

        this._timeout = setInterval(() => {
            this.setState({ percent: Math.min(100, this.state.percent + (this.props.step || 5)) }, () => {
                if (this.state.percent === 100) {
                    clearTimeout(this._timeout)
                    clearTimeout(this._timeout2)
                    if (!this.props.noLoop) {
                        // Loop
                        setTimeout(() => {
                            this.setState({ percent: 1 })
                            this.componentDidMount()
                        }, 1500)
                    }
                }
            })
        }, this._tickMs)
    }

    render() {
        return <LoadBar visible={this.state.visible} percent={this.state.percent} showSpinner={true} />
    }
}
