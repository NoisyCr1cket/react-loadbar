import React from 'react'
import { SimulatedLoadBar } from '../dist/index'
// import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

test('SimulatedLoadBar renders properly', () => {
    const cmpt = renderer.create(
        <SimulatedLoadBar />
    )

    const tree = cmpt.toJSON()
    expect(tree).toMatchSnapshot()
})

// test('SimulatedLoadBar starts/stops loading properly', () => {
// })