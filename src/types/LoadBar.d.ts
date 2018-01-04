export interface BaseBarProps {
    // Whether or not to show the spinner
    // Default: true
    showSpinner?: boolean
    // Custom styles to apply to the bar element
    // Default: {}
    barStyle?: {}
    // Custom styles to apply to the spinner element
    // Default: {}
    spinnerStyle?: {}
    // Invoked when the loadbar goes from visible to hidden and vice-versa
    // Default: undefined
    onVisibilityChange?: (visible: boolean) => void
}

export interface Props extends BaseBarProps {
    // Percent that the loadbar width should display. Valid ranges are 2-100
    percent: number
}