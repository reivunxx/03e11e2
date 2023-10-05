import s from './Controls.module.scss'
import f from '../../../utils/fonts.module.scss'
import React, {FC} from "react";
import {periods} from "../../../mock/data";
import {periodType} from "../ChronoSlider";

import {ReactComponent as BtnIcon} from "./btn.svg";

interface IControls {
    setActivePeriod: React.Dispatch<React.SetStateAction<periodType>>,
    activePeriod: periodType
}

const Controls: FC<IControls> = ({activePeriod, setActivePeriod}) => {


    return <div className={s.wrap}>
        <p className={f.caption}>0{periods.indexOf(activePeriod) + 1}/0{periods.length}</p>
        <div className={s.buttons}>
            <button className={s.prev}
                    onClick={() => periods.indexOf(activePeriod) === 0
                        ? null
                        : setActivePeriod(periods[periods.indexOf(activePeriod) - 1])}
                    disabled={periods.indexOf(activePeriod) === 0}
            >
                <BtnIcon/>
            </button>
            <button
                className={s.next}
                onClick={() => periods.indexOf(activePeriod) === periods.length - 1
                    ? null
                    : setActivePeriod(periods[periods.indexOf(activePeriod) + 1])}
                disabled={periods.indexOf(activePeriod) === periods.length - 1}
            >
                <BtnIcon/>
            </button>
        </div>
        <div className={s.mobileNavs}>
            {
                periods.map((period, index) => <button
                    className={`${s.mobileNav} ${activePeriod === period ? s.active : ""}`}
                    onClick={() => setActivePeriod(period)}
                ><span/></button>)
            }
        </div>
    </div>
}

export default Controls