import s from './Slider.module.scss'
import f from '../../../utils/fonts.module.scss'

import {periodType} from "../ChronoSlider";
import {FC, useRef, useState} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Swiper as SwiperType} from 'swiper/types'
import {ReactComponent as ArrowIcon} from "./arrow.svg";

interface ISlider {
    data: periodType
}

const Slider: FC<ISlider> = ({data}) => {
    const swiperRef = useRef<SwiperType>();
    const [isEnd, setIsEnd] = useState<boolean>(false);
    const [isStart, setIsStart] = useState<boolean>(false);

    return <>
        <Swiper
            spaceBetween={24}
            slidesPerView={'auto'}
            onBeforeInit={(swiper: SwiperType) => {
                swiperRef.current = swiper;
            }}
            onProgress={(p: SwiperType) => {
                setIsEnd(p.isEnd)
                setIsStart(p.isBeginning)
            }}
            breakpoints={{
                768:{
                    spaceBetween: 80,
                }
            }}
        >
            {
                data.data.map((card, index) => <SwiperSlide className={s.slideWrap} key={index}>
                    <div
                        key={card.title + card.text + data.title}
                        className={s.cardWrap}>
                        <h3 className={f.dateSmall}>{card.title}</h3>
                        <p title={card.text} className={f.text}>{card.text}</p>
                    </div>
                </SwiperSlide>)
            }
        </Swiper>
        {
            !isStart &&
            <button className={`${s.button} ${s.prev}`}
                    onClick={() => swiperRef.current?.slidePrev()}>
                <ArrowIcon/>
            </button>
        }
        {
            !isEnd && <button className={`${s.button} ${s.next}`}
                              onClick={() => swiperRef.current?.slideNext()}>
                <ArrowIcon/>
            </button>
        }
    </>

}

export default Slider