import React, {useState} from 'react'

const RangeSlider = ({min, max, title, setMaxValue, setMinValue, minValue, maxValue}) => {


    const [maxRange, setMaxRange] = useState(100)
    const [minRange, setMinRange] = useState(0)


    const editMin = (e) => {
        let newMin = e.target.value;
        if (newMin >= maxValue)
            newMin = maxValue
        if (newMin < min)
            newMin = min
        setMinValue(newMin)
        if (newMin === 0)
            setMinRange(0)
        else
            setMinRange(Math.round((newMin - min) / (max - min) * 100.0))
    }

    const editMax = (e) => {
        let newMax = e.target.value;
        let rangeMax = Math.round((newMax - min) / (max - min) * 100.0)
        if (newMax < minValue) {
            newMax = minValue
            rangeMax = Math.round((newMax - min) / (max - min) * 100.0)
        }
        if (newMax > max) {
            newMax = max
            rangeMax = 100
        }
        setMaxValue(newMax)
        setMaxRange(rangeMax)
    }

    const editRangeMin = (e) => {
        let newValue = e.target.value;
        if (Number(newValue) > Number(maxRange)) {
            newValue = maxRange
        }
        setMinRange(newValue);
        setMinValue(Math.round(min + Number(max - min) / 100.0 * Number(newValue)));
    }

    const editRangeMax = (e) => {
        let newValue = e.target.value;
        if (Number(newValue) < Number(minRange))
            newValue = minRange

        setMaxRange(newValue);
        setMaxValue(Math.round(min + Number(max - min) / 100.0 * Number(newValue)));
    }

    return (
        <div className='filters--widget widget'>
            <p className='widget--title'>{title}</p>
            <div className='widget--input-block'>
                {maxValue && maxValue &&
                <>
                    <input
                        className='widget--input'
                        value={minValue}
                        onChange={editMin}
                        min={min}
                        max={max}
                        step={(max - min) / 100 - 1 < Number.EPSILON ? 1 : max / 100}
                        type='number'/>
                    <input
                        className='widget--input'
                        value={maxValue}
                        onChange={editMax}
                        min={min}
                        max={max}
                        step={(max - min) / 100 - 1 < Number.EPSILON ? 1 : max / 100}
                        type='number'/>
                </>
                }
            </div>
            <div className='input-range__box-ranger'>
                <input
                    className='input-range__real-range input-range__real-range--left'
                    type='range'
                    min={0}
                    max={100}
                    onChange={editRangeMin}
                    value={minRange}
                />
                <input
                    className='input-range__real-range input-range__real-range--right'
                    type='range'
                    min={0}
                    max={100}
                    onChange={editRangeMax}
                    value={maxRange}
                />

                <div className='input-range__slider'>
                    <div className='input-range__track'/>
                    <div className='input-range__range'
                         style={{left: minRange + '%', right: maxRange !== 100 ? 100 - maxRange + '%' : '0%'}}/>
                    <div className='input-range__thumb input-range__thumb--left'
                         style={{left: minRange + '%'}}/>
                    <div className='input-range__thumb input-range__thumb--right'
                         style={{right: maxRange !== 100 ? 100 - maxRange + '%' : '0%'}}/>
                </div>
            </div>
        </div>
    )
}


export default RangeSlider