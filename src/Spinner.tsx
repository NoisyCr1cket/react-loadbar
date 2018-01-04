import * as React from 'react'
import './styles.scss'
import { Props } from './types/Spinner.d'

class Spinner extends React.Component<Readonly<Props>, Readonly<{}>> {
    render() {
        return <div className='loadbar-spinner' style={this.props.style}/>
    }
}

export default Spinner