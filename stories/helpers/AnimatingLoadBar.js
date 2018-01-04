import React from 'react'
import PropTypes from 'prop-types'
import { LoadBar } from '../../src'

export default class AnimatingLoadBar extends React.Component {
    static propTypes = {
        noLoop: PropTypes.bool,
        step: PropTypes.number,
        hideAfterTicks: PropTypes.number,
        onVisibilityChange: PropTypes.func
    }

    state = { percent: 1, visible: true }
    _timeout = 0
    _timeout2 = 0
    _timeout3 = 0
    _tickMs = 500

    componentDidMount() {
        if (this.props.hideAfterTicks) {
            this._timeout2 = setTimeout(() => {
                this.setState({ percent: 100 })
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
                        this._timeout3 = setTimeout(() => {
                            this.setState({ percent: 1 })
                            this.componentDidMount()
                        }, 1500)
                    }
                }
            })
        }, this._tickMs)
    }

    componentWillUnmount() {
        clearTimeout(this._timeout)
        clearTimeout(this._timeout2)
        clearTimeout(this._timeout3)
    }

    render() {
        return (
            <LoadBar visible={this.state.visible}
                percent={this.state.percent}
                showSpinner={true}
                onVisibilityChange={this.props.onVisibilityChange} />
        )
    }
}