import * as React from 'react'
import { LoadBar } from './LoadBar'
import './styles.scss'
import { Props, State } from './types/SimulatedLoadBar.d'

// Somewhat fragile, must remain same as ($trans-time-delay + $trans-time) in styles.scss
const TRANS_TIME_DELAY_MS = 850
// The fastest interval possible is usually around 15ms in most engines. We set a floor of
// 20ms since updates can't realistically be faster than that
const MIN_TICK_INTERVAL = 20

const defaultProps = {
    // noop
    onPercentChange: () => {
        return
    },

    timeMs: 8000,
    numTicks: 16,
    isLoading: true
}

export class SimulatedLoadBar extends
    React.Component<Readonly<Props>, Readonly<State>> {

    _timeout = 0

    constructor(props: Props) {
        super(props)
        this.init(props)
    }

    init(props: Props) {
        const attrs = { ...props }
        let numTicks = attrs.numTicks || defaultProps.numTicks
        const timeMs = (attrs.timeMs || defaultProps.timeMs)
        const tickIntervalMs = Math.max(MIN_TICK_INTERVAL, timeMs / numTicks)
        // Recalc in case we floored at MIN_TICK_INTERVAL
        numTicks = timeMs / tickIntervalMs
        const newState = { tickIntervalMs, step: 100 / numTicks }
        const isLoading = typeof attrs.isLoading === 'boolean' ? attrs.isLoading : defaultProps.isLoading

        if (this.state) {
            this.setState(newState)
        } else {
            this.state = { ...newState, percent: 1 }
        }

        clearInterval(this._timeout)

        if (isLoading && tickIntervalMs) {
            const cb = () => {
                const percent = Math.min(95, this.state.percent + this.state.step)
                if (attrs.onPercentChange) {
                    attrs.onPercentChange(percent)
                }

                this.setState({ percent })
                // TODO Make this configurable
                if (percent === 95) {
                    clearInterval(this._timeout)
                }
            }

            this._timeout = window.setInterval(cb, this.state.tickIntervalMs)
        } else if (!isLoading && this.props.isLoading) {
            // Finish up
            this.setState({ percent: 100 }, () => {
                const cb = () => this.setState({ percent: 1 })
                setTimeout(cb, TRANS_TIME_DELAY_MS)
            })

            if (attrs.onPercentChange) {
                attrs.onPercentChange(100)
            }
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        this.init(nextProps)
    }

    componentWillUnmount() {
        clearInterval(this._timeout)
    }

    render() {
        return <LoadBar {...this.props} percent={this.state.percent} />
    }
}