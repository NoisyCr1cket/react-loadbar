# react-loadbar

[![npm](https://img.shields.io/npm/dm/react-loadbar.svg?maxAge=2592000)]()

A super simple and minimal progress bar with optional spinner.


## Preview :eyes:
![](https://i.imgur.com/eeHVrll.gif)

#### :white_check_mark: Fully customizable

#### :white_check_mark: Lightweight bundle

#### :white_check_mark: No dependencies included

## [Storybook Examples](https://noisycr1cket.github.io/react-loadbar)

## Installation

```npm install react-loadbar --save```

## Usage

```javascript
import 'react-loadbar/dist/styles.css'
import { LoadBar } from 'react-loadbar'

class MyCmpt extends React.Component {

    state = { downloadProgress: 0 }

    _onVisibilityChange = isVisible => {
        if (isVisible) {
            console.log('load started!')
        } else {
            console.log('load complete!')
        }
    }

    render() {
        // All of these are optional except for percent
        return (
            <LoadBar percent={this.state.downloadProgress}
                     onVisibilityChange={this._onVisibilityChange}
                     barStyle={{ background: 'slateblue' }}
                     spinnerStyle={{ borderColor: 'slateblue' }} />
        )
    }
}
```

## `LoadBar`
A simple, dumb component which simply displays the loading `percent` you provide to it.
| Prop  | Default  | Type | Optional | Description |
| ------------- |-----------------| -----------------| -------| ------|
| `percent` | `1` | `number` | No | Determines the width of the loading bar |
| `onVisibilityChange` | `undefined` | `(boolean) => void` | Yes | Callback which receives `true` when the loading bar goes from hidden -> visible, and `false` when it goes from visible -> hidden |
| `barStyle` | `{}` | `Object` | Yes | Style properties applied directly on the loading bar |
| `showSpinner` | `true` | `boolean` | Yes | Visibility of the spinner |
| `spinnerStyle` | `{}` | `Object` | Yes | Style properties applied directly on the spinner element  |

```javascript
import 'react-loadbar/dist/styles.css'
import { SimulatedLoadBar } from 'react-loadbar'

class MyCmpt extends React.Component {

    state = { isLoading: false, text: '' }

    _fetchData = async () => {
        try {
            this.setState({ isLoading: true })
            const res = await fetch('/api', { method: 'get' })
            this.setState({ text: await res.text() })
        } catch (err) {
            console.error(err)
        } finally {
            this.setState({ isLoading: false })
        }
    }

    componentDidMount() {
        this._fetchData()
    }

    render() {
        // All values are optional
        return (
            <div>
                <SimulatedLoadBar isLoading={this.state.isLoading}
                                  timeMs={2000}
                                  numTicks={20}
                                  barStyle={{ background: 'slateblue' }} />
                <p>{this.state.text}</p>
            </div>
        )
    }
}
```

## `SimulatedLoadBar`
A loading bar component based on `LoadBar` which simulates loading. **Inherits the same set of props from `LoadBar`, but ignores the `percent` property**. The `SimulatedLoadBar` controls the value of the `percent` prop internally.
| Prop  | Default  | Type | Optional | Description |
| --------------|-----------------| -----------------| -------| ------|
| `onPercentChange` | `undefined` | `(number) => void` | Yes | Invoked at every tick of the simulated load when the internal value of `percent` changes |
| `timeMs` | `8000` | `number` | Yes | Number of milliseconds it takes for the loading bar to reach 95%, at which point the bar animation stops indefinitely until the user sets `isLoading` to `false` |
| `numTicks` | `16` | `number` | Yes | Number of ticks it takes for the internal `percent` value to reach 95%. This number is distributed evenly over the given `timeMs` so the time between each tick is roughly `timeMs ÷ numTicks` |
| `isLoading` | `true` | `boolean` | Yes | If set to `true`, the loading simulation and animation will begin immediately. If set to `false`, the animation will fast forward to 100% and transition to being hidden. |

## Styling
All elements are easily targettable with CSS. To view the classes and base styles, see the [source .scss file](#).

## License

(c) 2017 John Bernardo, [MIT license](/LICENSE).
