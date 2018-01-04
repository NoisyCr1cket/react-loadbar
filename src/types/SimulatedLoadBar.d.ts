import { BaseBarProps } from './LoadBar'

export interface Props extends BaseBarProps {
    // If provided, then every percent changes at each tick is provided to this function
    // Default: undefined
    onPercentChange?: (percent: number) => void
    // Number of milliseconds the loading animation should elapse to reach 99%
    // This will be short circuited if visible changes from true -> false which
    // may indicate the loading has finished and the loadbar will immediately
    // animate to 100%
    // Default: 8000 (8 seconds)
    timeMs?: number
    // Number of ticks for the loadbar simulation to go from 1-100%
    // Uses timeMs to calculate time between ticks
    // Default: 16
    numTicks?: number
    // Determines whether or not to hide the loadbar
    // Default: true
    visible?: boolean
}

export type State = {
    percent: number
    // How often to update the percent (tick)
    tickIntervalMs: number
    // How much to update the percent by per tick
    step: number
}