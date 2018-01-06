import React from 'react'
import { SimulatedLoadBar } from '../dist/index'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

/**
 * @jest-environment jsdom
 */

const TRANS_TIME_DELAY = 850

test('SimulatedLoadBar renders properly', () => {
    const cmpt = renderer.create(<SimulatedLoadBar />)
    const tree = cmpt.toJSON()
    expect(tree).toMatchSnapshot()

    const wrapper = mount(<SimulatedLoadBar />)
    expect(wrapper.render().find('.loadbar-spinner')).toHaveLength(1)

    wrapper.unmount()
})

test('SimulatedLoadBar renders properly with initial isLoading=false', () => {
    const cmpt = renderer.create(<SimulatedLoadBar isLoading={false} />)
    const tree = cmpt.toJSON()
    expect(tree).toMatchSnapshot()
})

test('SimulatedLoadBar without spinner', () => {
    const cmpt = renderer.create(<SimulatedLoadBar showSpinner={false} />)
    const tree = cmpt.toJSON()
    expect(tree).toMatchSnapshot()

    const wrapper = mount(<SimulatedLoadBar showSpinner={false} />)
    expect(wrapper.render().find('.loadbar-spinner')).toHaveLength(0)

    wrapper.unmount()
})

test('SimulatedLoadBar barStyle', () => {
    const cmpt = renderer.create(<SimulatedLoadBar barStyle={{ fontSize: '4rem' }} />)
    const tree = cmpt.toJSON()
    expect(tree).toMatchSnapshot()
})

test('SimulatedLoadBar spinnerStyle', () => {
    const cmpt = renderer.create(<SimulatedLoadBar spinnerStyle={{ backgroundColor: 'pink' }} />)
    const tree = cmpt.toJSON()
    expect(tree).toMatchSnapshot()
})

test('SimulatedLoadBar onVisibilityChange', () => {
    const cmpt = renderer.create(<SimulatedLoadBar onVisibilityChange={() => {}} />)
    const tree = cmpt.toJSON()
    expect(tree).toMatchSnapshot()
})

test('SimulatedLoadBar onPercentChange', () => {
    const changes = []
    const onPercentChange = pct => changes.push(pct)
    const numTicks = 10
    const timeMs = 1000
    const wrapper = mount(<SimulatedLoadBar timeMs={timeMs} numTicks={numTicks} onPercentChange={onPercentChange} />)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!changes.length) {
                reject(new Error('Took too long'))
            } else if (changes.length !== numTicks - 1 && changes.length !== numTicks) {
                reject(new Error(`Expected ${numTicks} ticks, got ${changes.length}`))
            } else {
                try {
                    expect(wrapper.render().find('.loadbar-progress').attr('style')).toEqual('width: 95%;')
                    expect(wrapper.childAt(0).render().attr('style')).toEqual('opacity: 1;')
                    resolve()
                } catch (err) {
                    reject(err)
                }
            }
        }, timeMs + 300)
    }).then(() => wrapper.unmount()).catch(err => {
        wrapper.unmount()
        throw err
    })
})

test('SimulatedLoadBar onPercentChange no longer called after isLoading set to false', () => {
    let count = 0
    let capturedCount = 0
    let lastPercent = 0
    const waitMs = 250
    // Record: the last value passed to this function and the number of times it is invoked
    const onPercentChange = pct => { lastPercent = pct; ++count }
    const wrapper = mount(<SimulatedLoadBar timeMs={8000} numTicks={80} onPercentChange={onPercentChange} />)

    return new Promise(resolve => {
        setTimeout(() => {
            capturedCount = count
            expect(capturedCount).toBe(2)

            // Simulate early stop
            wrapper.setProps({ isLoading: false }, () => {
                setTimeout(() => {
                    // Only one additional call, which should be the percent === 100
                    // TODO This might transiently fail...
                    expect(capturedCount + 1).toBe(count)
                    expect(lastPercent).toBe(100)
                    expect(wrapper.childAt(0).render().attr('style')).toEqual('opacity: 0;')
                    expect(wrapper.render().find('.loadbar-progress').attr('style')).toEqual('width: 100%;')
                    setTimeout(() => {
                        expect(capturedCount + 1).toBe(count)
                        expect(wrapper.render().find('.loadbar-progress').attr('style')).toEqual('width: 1%;')
                        resolve()
                    }, TRANS_TIME_DELAY - 100)
                }, 100)
            })
        }, waitMs)
    }).then(() => wrapper.unmount()).catch(err => {
        wrapper.unmount()
        throw err
    })
})

test('SimulatedLoadBar onPercentChange no longer called after unmounting', () => {
    let count = 0
    let capturedCount = 0
    const waitMs = 250
    const onPercentChange = () => ++count
    const wrapper = mount(<SimulatedLoadBar timeMs={8000} numTicks={80} onPercentChange={onPercentChange} />)

    return new Promise(resolve => {
        setTimeout(() => {
            capturedCount = count
            expect(capturedCount).toBe(2)

            // Unmount before load completes
            wrapper.unmount()

            setTimeout(() => {
                expect(capturedCount).toBe(count)
                resolve()
            }, waitMs * 2)
        }, waitMs)
    })
})