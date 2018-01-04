# react-loadbar

[![npm](https://img.shields.io/npm/dm/react-loadbar.svg?maxAge=2592000)]()

A super simple and minimal progress bar with optional spinner.

## Preview
![](https://i.imgur.com/eeHVrll.gif)

## [Storybook Samples](#)

## Installation

```npm install react-loadbar --save```

## Usage

## `LoadBar`
| Prop  | Default  | Type | Optional | Description |
| :------------ |:---------------:| :---------------:| :-----:| :-----|
| percent | `1` | `number` | No | Determines the width of the loading bar |
| onVisibilityChange | `undefined` | `Function` | Yes | Callback which receives `true` when the loading bar goes from hidden -> visible, and `false` when it goes from visible -> hidden |
| barStyle | `{}` | `Object` | Yes | Style properties applied directly on the loading bar |
| showSpinner | `true` | `boolean` | Yes | Visibility of the spinner |
| spinnerStyle | `{}` | `Object` | Yes | Style properties applied directly on the spinner element  |

## License

(c) 2017 John Bernardo, [MIT license](/LICENSE).