import React, { useEffect, useState } from 'react'

export default function Tst() {

    const [time, setTime] = useState(0);
    const [timeId, setTimeId] = useState(null);
    const [isTimer, setIsTimer] = useState(false)


    useEffect(() => {
        let interval;
        if (isTimer) {

            interval = setInterval(() => {
                setTime(e => e += 1);
            }, 1000);

            setTimeId(interval);
        } else {
            clearInterval(timeId);
        }

        return () => {
            clearInterval(timeId);
        }
    }, [isTimer])


    return (
        <>
            <div>{time}</div>
            <div>Tst</div>
            <button onClick={() => setIsTimer(true)}> start</button>
            <button onClick={() => setIsTimer(false)}> stop</button>
            <button onClick={() => setTime(0)}> reset</button>

        </>
    )
}

