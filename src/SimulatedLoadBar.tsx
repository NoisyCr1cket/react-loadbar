import * as React from 'react'
import { LoadBar } from './LoadBar'
import './styles.scss'
import { Props, State } from './types/SimulatedLoadBar.d'

// Somewhat fragile, must remain same as ($trans-time-delay + $trans-time) in styles.scss
const TRANS_TIME_DELAY_MS = 850
// The fastest interval possible is usually around 15ms in most engines. We set a floor of
// 20ms since updates can't realistically be faster than that
const MIN_TICK_INTERVAL = 20
// Maximum percent (and width) of the bar before pausing indefinitely and until the
// isLoading property is set the false
const MAX_PCT = 95

const defaultProps = {
    // noop
    onPercentChange: () => {
        return
    },

    timeMs: 4000,
    numTicks: 40,
    isLoading: true
}

export class SimulatedLoadBar extends
    React.Component<Readonly<Props>, Readonly<State>> {

    _timeout: any = 0

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
        const newState = { tickIntervalMs, step: MAX_PCT / numTicks }
        const isLoading = typeof attrs.isLoading === 'boolean' ? attrs.isLoading : defaultProps.isLoading

        if (this.state) {
            this.setState(newState)
        } else {
            this.state = { ...newState, percent: 1, isLoading }
        }

        clearInterval(this._timeout)

        if (isLoading && tickIntervalMs) {
            const cb = () => {
                const percent = Math.min(MAX_PCT, this.state.percent + this.state.step)
                this.setState({ percent, isLoading })

                if (attrs.onPercentChange) {
                    attrs.onPercentChange(percent)
                }

                // TODO Make this configurable
                if (percent === MAX_PCT) {
                    clearInterval(this._timeout)
                }
            }

            this._timeout = setInterval(cb, this.state.tickIntervalMs)
        } else if (!isLoading && this.state.isLoading) {
            // Finish up
            this.setState({ percent: 100, isLoading }, () => {
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