interface SpinnerProps {
    style?: {}
}

interface BaseBarProps {
    visible?: boolean
    showSpinner?: boolean
    barStyle?: {}
    spinnerStyle?: {}
}

interface LoadBarProps extends BaseBarProps {
    percent: number
}

interface LoadBarState {
    wasHidden: boolean
    percent: number
}

interface SimulatedLoadBarProps extends BaseBarProps {
    onPercentChange?: (percent: number) => void
    // Number of milliseconds the loading animation should elapse to reach 99%
    // This will be short circuited if visible changes from true -> false which
    // may indicate the loading has finished and the loadbar will immediately
    // animate to 100%
    timeMs: number
}