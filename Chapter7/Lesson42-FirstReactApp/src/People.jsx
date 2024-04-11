import { useEffect, useState } from "react"

export default function People() {
    const [people, setPeople] = useState([
        { id: 1, name: 'Jane' },
        { id: 2, name: 'Sudo' },
        { id: 3, name: 'Boy' },
        { id: 4, name: 'John' },
    ])

    const getPeople = async () => {
        console.log('Fetch people')

        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const result = await response.json()
        setPeople(result)
    }

    useEffect(() => {
        getPeople()
    }, [])

    return <div>
        <h2>People</h2>
        <ul>
            {people.map((person) => 
                <li key={person.id}>
                    {person.name}
                </li>
            )}
        </ul>
    </div>
}