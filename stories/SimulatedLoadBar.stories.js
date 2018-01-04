import React from 'react'
import { storiesOf } from '@storybook/react'
import { SimulatedLoadBar } from '../src'
import SimulatedHelper from './helpers/SimulatedHelper'
import { action } from '@storybook/addon-actions'

storiesOf('SimulatedLoadBar', module)
    .add('default options', () => <SimulatedLoadBar />)
    .add('when load finishes before animation', () => <SimulatedHelper toggleCount={1} />)
    .add('multiple isLoading toggles', () => {
        return <SimulatedHelper toggleCount={4}
            onVisibilityChange={action('visibilityChange')} />
    })
    .add('numTicks=1, timeMs=3000', () => <SimulatedLoadBar numTicks={2} timeMs={3000} />)
    .add('numTicks=2000', () => <SimulatedLoadBar numTicks={400} /*timeMs={20000}*/ />)
    .add('no spinner', () => <SimulatedLoadBar showSpinner={false} />)
    .add('onPercentChange callback', () => <SimulatedLoadBar onPercentChange={action('onPercentChange')} />)
    .add('with onVisibilityChange callback', () => (
        <SimulatedHelper onVisibilityChange={action('visibilityChange')} toggleCount={1} />
    ))