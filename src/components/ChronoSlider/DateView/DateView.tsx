import s from './DateView.module.scss'
import f from '../../..//utils/fonts.module.scss'
import {FC, useEffect, useState} from "react";
import CountUp from "react-countup";


export interface IDateView {
    left: { start: number, end: number },
    right: { start: number, end: number }
}

const DateView: FC<IDateView> = ({left, right}) => {
    return <div className={s.wrap}>
        <CountUp
            start={left.start}
            end={left.end}
            separator=""
            className={`${f.dateBig} ${s.left}`}/>
        <CountUp
            start={right.start}
            end={right.end}
            separator=""
            className={`${f.dateBig} ${s.right}`}/>
    </div>
}

export default DateView