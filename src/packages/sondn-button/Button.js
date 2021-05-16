import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

function Button({
    to = '',
    href = '',
    size = 'm',
    type = 'primary',
    children = null,
    disabled = false,
    openNewTab = false,
    underline = false,
    onClick = () => { },
    ...restProps
}) {
    const classNames = [
        styles.wrapper,
        styles[type],
        styles[size],
        underline ? styles.underline : '',
        disabled ? styles.disabled : ''
    ]
    const props = {
        
    }
    let Component = 'button'
    if (href) {
        Component = 'a'
        props.href = href


        if (openNewTab) {
            props.target = "_blank"
        }
    }
    if (to) {
        Component = Link
        props.to = to
    }
    return (
        <Component
            {...props}
            {...restProps}
            className={classNames.join(' ')}
            onClick={onClick}
        >
            <span>{children}</span>
        </Component>
    )
}

export default Button
