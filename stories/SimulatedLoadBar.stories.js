import React from 'react'
import { storiesOf } from '@storybook/react'
import { SimulatedLoadBar } from '../src'

storiesOf('SimulatedLoadBar', module)
    .add('default options', () => <SimulatedLoadBar />)