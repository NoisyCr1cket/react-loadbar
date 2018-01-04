import * as React from 'react'
import Spinner from './Spinner'
import './styles.scss'
import { Props } from './types/LoadBar.d'

const inRange = (percent: number) => percent > 1 && percent < 100

enum BarState { Visible = 1, Hidden = 2 }

type State = {
    prevBarState: BarState
    barState: BarState
    percent: number
}

export class LoadBar extends React.Component<Readonly<Props>, Readonly<State>> {
    constructor(props: Props) {
        super(props)
        this.componentWillReceiveProps(props)
    }

    componentWillReceiveProps(nextProps: Props) {
        const { barState = BarState.Hidden } = this.state || {}
        const isValidPercent = inRange(nextProps.percent)

        let newPercent = nextProps.percent || 1
        let newBarState = barState

        switch (barState) {
            case BarState.Hidden:
                if (isValidPercent) {
                    newBarState = BarState.Visible
                } else {
                    newPercent = 1
                }
                break
            case BarState.Visible:
                if (!isValidPercent) {
                    newPercent = Math.max(1, Math.min(100, nextProps.percent))
                    newBarState = BarState.Hidden
                }
                break
            default:
                throw new Error(`Unknown BarState: ${barState}`)
        }

        // Round off
        newPercent = +newPercent.toFixed(2)

        if (!this.state) {
            this.state = { barState: newBarState, prevBarState: barState, percent: newPercent }
        } else {
            this.setState({ barState: newBarState, prevBarState: barState, percent: newPercent })
        }
    }

    render() {
        const {
            barStyle,
            onVisibilityChange,
            showSpinner = true,
            spinnerStyle = {},
        } = this.props

        const { percent, barState, prevBarState } = this.state
        const isVisible = barState === BarState.Visible
        const wrapStyle: { opacity: number, transition?: string } = { opacity: !isVisible ? 0 : 1 }

        if (isVisible && prevBarState === BarState.Hidden) {
            // No need for transition if we're going from hidden -> visible
            // Only need it for visible -> hidden
            wrapStyle.transition = 'none'
        }

        // console.info({ isVisible, prevBarState, percent, wrapStyle })

        if (onVisibilityChange) {
            if (prevBarState === BarState.Hidden && isVisible) {
                // hidden -> visible
                onVisibilityChange(true)
            } else if (prevBarState === BarState.Visible && !isVisible) {
                // visible -> hidden
                onVisibilityChange(false)
            }
        }

        return (
            <div className='loadbar-wrap' style={wrapStyle}>
                {showSpinner && <Spinner style={spinnerStyle} />}
                <div className='loadbar-progress'
                     style={{
                        ...barStyle,
                        width: `${Math.max(1, Math.min(100, percent))}%`
                     }} />
            </div>
        )
    }
}