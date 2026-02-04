import { Button } from "react-native"

type StopwatchButtonProps = {
    title: string,
    onPress: () => void,
    disabled?: boolean
}

const StopwatchButton = ({title, onPress, disabled = false}: StopwatchButtonProps) => {
    return (
        <Button
            title={title}
            onPress={onPress}
            disabled={disabled}
        />
    )
}

export default StopwatchButton