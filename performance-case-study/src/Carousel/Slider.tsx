import * as React from "react";
import { debounce } from "lodash";

import ScrollIndicator, {IndicatorDirection} from "./ScrollIndicator";
import QuickFilterChip from "./ItemChip";

import './Slider.scss'

const cssPrefix = 'slider'

type SliderProps = {
    items: {title: string} []
}

const Slider: React.FC<SliderProps> = (props:SliderProps) => {
    const [showIndicators, setShowIndicators] = React.useState(false);
    const valuesRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const values = valuesRef.current as HTMLDivElement;
        const checkShowIndicators = () => {
            console.log("RESIZE")
            const scrollable = values.scrollWidth > values.clientWidth;
            setShowIndicators(scrollable);
        }
        checkShowIndicators();
        const debouncedCheckIndicators = debounce(checkShowIndicators, 100, { leading: false, trailing:true });
        window.addEventListener('resize', debouncedCheckIndicators);
        return () => {
            debouncedCheckIndicators.cancel();
            window.removeEventListener('resize', debouncedCheckIndicators)
        }
    }, [])

    return <div className={cssPrefix}>
        {showIndicators &&
        <ScrollIndicator direction={IndicatorDirection.LEFT} containerRef={containerRef} valuesRef={valuesRef}/>}
        <div ref={containerRef} className={`${cssPrefix}__value-container`}>
            <div ref={valuesRef} className={`${cssPrefix}__values`}>
                {props.items.map(item => 
                    <QuickFilterChip key={item.title} label={item.title}/>)}
            </div>
        </div>
        {showIndicators &&
        <ScrollIndicator direction={IndicatorDirection.RIGHT} containerRef={containerRef} valuesRef={valuesRef}/>}
    </div>;
};

export default Slider;