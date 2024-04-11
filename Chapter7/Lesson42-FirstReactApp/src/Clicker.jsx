import { useEffect, useRef, useState } from "react"

export default function Clicker({ increment, keyName, color }) {
    const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0))
    const buttonRef = useRef()

    useEffect(() => {
        buttonRef.current.style.backgroundColor = 'papayawhip'
        buttonRef.current.style.color = 'salmon' 
        
        return () => {
            localStorage.removeItem(keyName)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(keyName, count)
    }, [count])

    const buttonPressed = () => {
        setCount(value => value + 1)
        increment()
    }

    return <div>
        <div style={{ color }}>clicks count: {count}</div>
        <button ref={ buttonRef } onClick={buttonPressed} >Click Me</button>
    </div>    
}