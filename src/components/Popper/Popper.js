import Tippy from '@tippyjs/react/headless'

function Popper({
    children,
    render,
    delay = 0,
    minWidth = 280,
    appendTo = () => document.body,
    wrapperClassname = '',
    ...props
}) {
    return (
        <Tippy
            {...props}
            delay={delay}
            appendTo={appendTo}
            render={render}
        >
            <div>
                {children}
            </div>
        </Tippy>
    )
}

export default Popper
