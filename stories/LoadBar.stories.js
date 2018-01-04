import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { LoadBar } from '../src'
import AnimatingLoadBar from './helpers/AnimatingLoadBar'

storiesOf('LoadBar', module)
    .add('with percent 65', () => <LoadBar percent={65} showSpinner={false} />)
    .add('with percent 45 + spinner', () => <LoadBar percent={45} />)
    .add('with percent manual updates', () => <AnimatingLoadBar step={20} />)
    .add('with percent manual updates, early toggled visibility', () => (
        <AnimatingLoadBar step={20} hideAfterTicks={3} />
    ))
    .add('with onVisibilityChange callback', () => {
        return (
            <AnimatingLoadBar step={10} onVisibilityChange={action('visibilityChange')} />
        )
    })

storiesOf('LoadBar/DontDoThis', module)
    .add('with percent -20', () => <LoadBar percent={-20} />)
    .add('with percent 110', () => <LoadBar percent={110} showSpinner={true} />)
