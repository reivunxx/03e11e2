import s from './ChronoSlider.module.scss'
import f from '../../utils/fonts.module.scss'

import {periods} from "../../mock/data";
import React, {FC, useEffect, useState} from "react";
import Circle from "./Circle/Circle";
import DateView, {IDateView} from "./DateView/DateView";
import Controls from "./Controls/Controls";
import Slider from "./Slider/Slider";
import {AnimatePresence, motion} from "framer-motion";

const ChronoSlider: FC = () => {
    //Текущий выбранный период времени
    const [activePeriod, setActivePeriod] = useState<periodType>(periods[0]);
    //Объект для отображения выбранной даты, используется для хранения предыдущего значения чтобы не было скачков при анимации
    const [displayDate, setDisplayDate] = useState<IDateView>({
        left: {start: periods[0].left - 100, end: periods[0].left},
        right: {start: periods[0].right - 100, end: periods[0].right}
    });
    //Текущие отображаемые слайды
    const [displayedSlides, setDisplayedSlides] = useState<periodType>(periods[0]);
    //Флаг для отображения слайдера
    const [showSlides, setShowSlides] = useState<boolean>(true);
    //Таймаут который обновит и отобразит следующий слайдер
    const [slidesTimeout, setSlidesTimeout] = useState<NodeJS.Timeout>();

    useEffect(() => {
        setDisplayDate(prev => ({
            left: {start: prev.left.end, end: activePeriod.left},
            right: {start: prev.right.end, end: activePeriod.right}
        }))

        setShowSlides(false) //Скрываем текущий слайдер
        clearTimeout(slidesTimeout) //Очищаем предыдущий таймаут (если сделано несколько переходов подряд)
        const timer: NodeJS.Timeout = setTimeout(() => {
            setDisplayedSlides(activePeriod) //Меняем данные для слайдов
            setShowSlides(true) //Отрисовываем слайдер с новыми данными
        }, 500)
        setSlidesTimeout(timer) //Записываем текущий таймер на случай если его понадобится очистить
    }, [activePeriod])


    return <div className={s.wrap}>
        <div className={s.header}>
            <h2 className={`${f.title} ${s.title}`}>Исторические <br/> даты</h2>
        </div>
        <div className={s.circleLayout}>
            <Circle periods={periods} setActivePeriod={setActivePeriod} activePeriod={activePeriod}/>
            <DateView
                left={{
                    start: displayDate.left.start,
                    end: displayDate.left.end
                }}
                right={{
                    start: displayDate.right.start,
                    end: displayDate.right.end
                }}
            />
        </div>
        <div className={s.bottom}>
            <Controls setActivePeriod={setActivePeriod} activePeriod={activePeriod}/>
            <AnimatePresence mode={"wait"}>
                {
                    showSlides && <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <Slider data={displayedSlides}/>
                    </motion.div>
                }
            </AnimatePresence>
            <div className={`${s.mobileTitle} ${f.dotHeader}`}>
                {
                    activePeriod.title
                }
            </div>
        </div>
    </div>
}

export type slideInfoType = {
    title: string,
    text: string
}

export type periodType = {
    title: string,
    left: number,
    right: number,
    data: slideInfoType[]
}

export default ChronoSlider