import React from 'react'
import { LoadBar } from '../dist/index'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

test('LoadBar renders properly', () => {
    const cmpt = renderer.create(
        <LoadBar />
    )

    const tree = cmpt.toJSON()
    expect(tree).toMatchSnapshot()

    const wrapper = shallow(<LoadBar />)
    expect(wrapper.children()).toHaveLength(2)
    expect(wrapper.childAt(0).render().hasClass('loadbar-spinner')).toBeTruthy()
})

test('LoadBar renders without spinner', () => {
    const cmpt = renderer.create(
        <LoadBar showSpinner={false} />
    )

    const tree = cmpt.toJSON()
    expect(tree).toMatchSnapshot()

    const wrapper = shallow(<LoadBar showSpinner={false} />)
    expect(wrapper.children()).toHaveLength(1)
    expect(wrapper.childAt(0).render().hasClass('loadbar-spinner')).toBeFalsy()
})

test('LoadBar with barStyle', () => {
    const cmpt = renderer.create(
        <LoadBar barStyle={{ fontSize: '4rem' }} />
    )

    const tree = cmpt.toJSON()
    expect(tree).toMatchSnapshot()
})

test('LoadBar with spinnerStyle', () => {
    const cmpt = renderer.create(
        <LoadBar spinnerStyle={{ backgroundColor: 'tomato' }} />
    )

    const tree = cmpt.toJSON()
    expect(tree).toMatchSnapshot()
})

test('LoadBar calls onVisibilityChange', () => {
    let visible = false
    const onVisChange = isVisible => { visible = isVisible }
    const cmpt = shallow(<LoadBar onVisibilityChange={onVisChange} />)

    let wrap = cmpt.get(0)
    expect(visible).toBe(false)
    expect(wrap.props.className).toBe('loadbar-wrap')
    expect(wrap.props.style.opacity).toBe(0)
    cmpt.setProps({ percent: 2 })

    wrap = cmpt.get(0)
    expect(visible).toBe(true)
    expect(wrap.props.style.opacity).toBe(1)
    expect(wrap.props.style.transition).toBe('none')

    cmpt.setProps({ percent: 99 })
    wrap = cmpt.get(0)
    expect(visible).toBe(true)
    expect(wrap.props.style.opacity).toBe(1)
    expect(wrap.props.style.hasOwnProperty('transition')).toBeFalsy()

    cmpt.setProps({ percent: 100 })
    wrap = cmpt.get(0)
    expect(visible).toBe(false)
    expect(wrap.props.style.opacity).toBe(0)
})