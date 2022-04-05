import * as React from "react";
import { throttle } from "lodash";
import classNames from 'classnames'

import './ScrollIndicator.scss';

const SCROLL_BUFFER = 5;

export enum IndicatorDirection {
    LEFT = "left",
    RIGHT = "right"
};
  
type ScrollDirectionType = `${IndicatorDirection}`;
  

type IndicatorProps = {
    direction: ScrollDirectionType,
    containerRef: React.RefObject<HTMLDivElement>
    valuesRef: React.RefObject<HTMLDivElement>
};

const ScrollIndicator: React.FC<IndicatorProps> = (props:IndicatorProps) => {
    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        let values = props.valuesRef.current as HTMLDivElement;
        let container = props.containerRef.current as HTMLDivElement;
        const checkActive = () => {
            let shouldBeActive;
            if (props.direction === IndicatorDirection.LEFT) {
                shouldBeActive = container.scrollLeft > SCROLL_BUFFER;
            } else {
                shouldBeActive = container.scrollLeft + SCROLL_BUFFER + container.offsetWidth < values.scrollWidth;
            }
            setActive(shouldBeActive);
        }
        checkActive();
        const throttledCheckActive = throttle(checkActive, 100, {leading: false, trailing: true});
        container.addEventListener('scroll', throttledCheckActive);
        return () => {
            throttledCheckActive.cancel();
            container.removeEventListener('scroll', throttledCheckActive);
        }
    }, []);

    const onClick = (e: React.MouseEvent) => {
        let container = props.containerRef.current as HTMLDivElement;
        if (!active) {
            return 
        }
        let scrollDist = container.clientWidth * 0.75;
        if (props.direction === IndicatorDirection.LEFT) {
            scrollDist = -1 * scrollDist;
        }
        let scrollPos = Math.max(container.scrollLeft + scrollDist, 0);
        container.scrollTo({left: scrollPos, behavior: 'smooth'});
    }

    return <div onClick={onClick} className={classNames("scroll-indicator", {
        "active": active, 
        "left": props.direction === IndicatorDirection.LEFT,
        "right": props.direction === IndicatorDirection.RIGHT
    })}>
        <span>{props.direction === IndicatorDirection.LEFT ? "<" : ">"}</span>
    </div>
};

export default ScrollIndicator;
