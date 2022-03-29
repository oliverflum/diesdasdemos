import * as React from "react";

import './ItemChip.scss'

const cssPrefix = 'item-chip'

type ChipProps = {
    label: string
}

const ItemChip: React.FC<ChipProps> = (props:ChipProps) => {
    return <div className={`${cssPrefix}__boundary`}>
        <div className={cssPrefix}>
            {props.label}
        </div>
    </div>
}

export default ItemChip;