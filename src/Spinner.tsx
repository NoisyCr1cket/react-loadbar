import * as React from 'react'
import './styles.scss'

class Spinner extends React.Component<Readonly<SpinnerProps>, Readonly<{}>> {
    render() {
        return <div className='loadbar-spinner' style={this.props.style}/>
    }
}

export default Spinner