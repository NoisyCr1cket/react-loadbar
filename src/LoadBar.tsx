import * as React from 'react'
import Spinner from './Spinner'
import './styles.scss'

export class LoadBar extends React.Component<Readonly<LoadBarProps>, Readonly<LoadBarState>> {

    constructor(props: LoadBarProps) {
        super(props)
        this.componentWillReceiveProps(props)
    }

    componentWillReceiveProps(nextProps: LoadBarProps) {
        const { visible } = this.props
        let { wasHidden, percent } = this.state || { wasHidden: true, percent: 1 }

        if (nextProps.percent > percent) {
            wasHidden = percent === 1
        }

        // If the bar was visible and we get a request from upstream to hide it (visible=false),
        // then we trigger the complete animation
        if (!wasHidden && visible && !nextProps.visible) {
            percent = 100
        } else {
            percent = nextProps.percent
        }

        if (this.state) {
            this.setState({ wasHidden, percent })
        } else {
            this.state = { wasHidden, percent }
        }
    }

    render() {
        const {
            showSpinner,
            barStyle,
            visible = true,
            spinnerStyle = {},
        } = this.props

        const { percent, wasHidden } = this.state

        const newPercent = Math.max(1, Math.min(100, percent))
        const wrapStyle: { opacity: number, transition?: string } = {
            opacity: !visible || newPercent === 1 || newPercent === 100 ? 0 : 1
        }

        if (wasHidden) {
            // No need for transition if we're going from hidden -> visible
            // Only need it for visible -> hidden
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