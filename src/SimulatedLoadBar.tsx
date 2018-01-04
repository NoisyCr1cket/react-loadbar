import * as React from 'react'
import { LoadBar } from './LoadBar'
import './styles.scss'
import { Props, State } from './types/SimulatedLoadBar.d'

const defaultProps = {
    // noop
    onPercentChange: () => {
        return
    },

    timeMs: 8000,
    numTicks: 16
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
        const numTicks = attrs.numTicks || defaultProps.numTicks
        const tickIntervalMs = (attrs.timeMs || defaultProps.timeMs) / numTicks
        const newState = { tickIntervalMs, step: 100 / numTicks }

        if (this.state) {
            this.setState(newState)
        } else {
            this.state = { ...newState, percent: 1 }
        }

        clearInterval(this._timeout)

        if (tickIntervalMs) {
            const cb = () => this.setState({ percent: this.state.percent + this.state.step })
            this._timeout = window.setInterval(cb, this.state.tickIntervalMs)
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