import { useMemo, useState } from "react";
import Clicker from "./Clicker";
import People from "./People";

export default function App({ clickersCount, children }) {
    const [hasClicker, setHasClicker] = useState(true)
    const [count, setCount] = useState(0)

    const toggleClickerClicked = () => {
        setHasClicker(!hasClicker)
    }

    const increment = () => {
        setCount(value => value + 1)
    }

    const colors = useMemo(() => {
        const colors = []

        for(let i = 0; i < clickersCount; i++)
            colors.push(`hsl(${ Math.random() * 360}deg, 100%, 70%)`)

        return colors
    }, [ clickersCount ])

    return (
        <>
            {children}
            <div>total clicks count: {count}</div>

            <button onClick={toggleClickerClicked}>{hasClicker ? 'Hide' : 'Show'} clicker</button>
            {hasClicker && <>
                { [...Array(clickersCount)].map((_, index) => {
                    return <Clicker key={index} increment={increment} keyName={`count${index}`} color={colors[index]}/>
                })}
            </>}
            
            <People />
        </>
    )
}