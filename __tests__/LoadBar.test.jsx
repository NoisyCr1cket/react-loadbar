import React from 'react'
import { LoadBar } from '../dist/index'
import renderer from 'react-test-renderer'

test('LoadBar renders properly', () => {
    const cmpt = renderer.create(
        <LoadBar />
    )

    const tree = cmpt.toJSON()
    expect(tree).toMatchSnapshot()
})

test('LoadBar renders without spinner', () => {
    const cmpt = renderer.create(
        <LoadBar showSpinner={false} />
    )

    const tree = cmpt.toJSON()
    expect(tree).toMatchSnapshot()
})

test('LoadBar calls onVisibilityChange', () => {
    let visible = false
    const onVisChange = isVisible => { visible = isVisible }

    class StateChanger extends React.Component {
        constructor(props) {
            super(props)
            this.state = { percent: 1 }
        }
        updateState(state) {
            this.setState(state)
        }
        render() {
            return (
                <LoadBar percent={this.state.percent} onVisibilityChange={onVisChange} />
            )
        }
    }

    const cmpt = renderer.create(<StateChanger />)
    // TODO Assert hidden

    expect(visible).toBe(false)
    cmpt.getInstance().updateState({ percent: 2 })
    // TODO Assert visible

    expect(visible).toBe(true)
    cmpt.getInstance().updateState({ percent: 99 })
    expect(visible).toBe(false)
    cmpt.getInstance().updateState({ percent: 100 })

    // TODO Assert hidden
})