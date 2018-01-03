import * as React from 'react'
import Spinner from './Spinner'
import './styles.scss'

export class LoadBar extends React.Component<Readonly<LoadBarProps>, Readonly<LoadBarState>> {
    state = { wasHidden: true }

    componentWillReceiveProps(nextProps: LoadBarProps) {
        const { percent } = this.props
        if (nextProps.percent > percent) {
            this.setState({ wasHidden: percent === 1 })
        }
    }

    render() {
        const {
            percent,
            showSpinner,
            barStyle,
            spinnerStyle = {},
            visible = true
        } = this.props

        const newPercent = Math.max(1, Math.min(100, percent))
        const wrapStyle: { display: string, opacity: number, transition?: string } = {
            display: visible ? 'block' : 'none',
            opacity: newPercent === 1 || newPercent === 100 ? 0 : 1
        }

        if (this.state.wasHidden) {
            wrapStyle.transition = 'none'
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