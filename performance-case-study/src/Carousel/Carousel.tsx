import * as React from "react";

import Slider from "./Slider";

import './Carousel.scss'

const cssPrefix = 'carousel'

type CarouselProps = {
    title: string
    items: {title: string} []
}

const Carousel: React.FC<CarouselProps> = (props:CarouselProps) => {
    return <div className={`${cssPrefix}`}>
        <div className={`${cssPrefix}__title`}>{props.title}</div>
        <Slider items={props.items}/>
    </div>
}

export default Carousel;