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
}

interface SimulatedLoadBarProps extends BaseBarProps {
    onPercentChange?: (percent: number) => void
}