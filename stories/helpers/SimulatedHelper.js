import React from 'react'
import PropTypes from 'prop-types'
import { SimulatedLoadBar } from '../../src'

const INTERVAL = 2000

export default class SimulatedHelper extends React.Component {
    static propTypes = {
        toggleCount: PropTypes.number,
        onVisibilityChange: PropTypes.func
    }

    state = { isLoading: true }
    _timeout = 0
    _lastToggleProp = 0
    _currentToggleCount = 0

    constructor(props) {
        super(props)
        this._lastToggleProp = props.toggleCount || 0
        this._currentToggleCount = this._lastToggleProp
    }

    componentWillReceiveProps(nextProps) {
        this._update(nextProps)
    }

    _update(props) {
        // Initialise the loop
        const { toggleCount } = props
        if (toggleCount !== this._lastToggleProp) {
            this._lastToggleProp = toggleCount
            this._currentToggleCount = toggleCount
        }

        if (this._currentToggleCount) {
            clearTimeout(this._timeout)
            this._timeout = setTimeout(() => {
                this.setState({ isLoading: !this.state.isLoading })
                if (--this._currentToggleCount) {
                    this._update(this.props)
                }
            }, INTERVAL)
        }
    }

    componentDidMount() {
        this._update(this.props)
    }

    componentWillUnmount() {
        clearTimeout(this._timeout)
    }

    render() {
        return <SimulatedLoadBar isLoading={this.state.isLoading}
            onVisibilityChange={this.props.onVisibilityChange} />
    }
}