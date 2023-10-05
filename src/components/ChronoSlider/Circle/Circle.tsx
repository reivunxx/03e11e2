import s from './Circle.module.scss'
import f from '../../../utils/fonts.module.scss'
import React, {FC, useEffect, useState} from "react";
import {periodType} from "../ChronoSlider";

interface ICircle {
    periods: periodType[],
    activePeriod: periodType,
    setActivePeriod: React.Dispatch<React.SetStateAction<periodType>>
}

const angleOffset = 45

const Circle: FC<ICircle> = ({periods, setActivePeriod, activePeriod}) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        setActiveIndex(periods.indexOf(activePeriod))
    }, [activePeriod])

    return <div className={s.wrap}>
        <div className={s.circle}/>
        {
            periods.map((period, i) => <div
                className={s.dotWrap}
                key={period.title}
                style={{
                    transform: `rotate(${(360 / periods.length) * (i + (-activeIndex)) - angleOffset}deg)`
                }}
            >
                <div
                    onClick={() => {
                        setActivePeriod(period)
                        setActiveIndex(i)
                    }}
                    style={{
                        rotate: `${-((360 / periods.length) * (i + (-activeIndex)) - angleOffset)}deg`
                    }}
                    className={`${f.dotCounter} ${s.dot} ${activePeriod === period ? s.active : ""}`}>
                    <div className={s.dotLayout}>
                        {i + 1}
                    </div>
                    <span className={`${f.dotHeader} ${s.dotTitle}`}>{period.title}</span>
                </div>
            </div>)
        }
    </div>
}

export default Circle