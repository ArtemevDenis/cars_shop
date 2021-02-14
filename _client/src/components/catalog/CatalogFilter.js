import React, {useEffect, useState} from 'react'
import RangeSlider from "../inputs/RangeSlider";
import CheckBoxesList from "../inputs/CheckBoxesList";
import {useHttp} from "../../hooks/http.hook";


// const initFilter = {
//     minPrice: 0,
//     maxPrice: 4294967294,
//     minYear: 0,
//     maxYear: 4294967294,
//     minMileage: 0,
//     maxMileage: 4294967294,
//     brands: null
// }

const CatalogFilter = ({filterEdit, loadCars}) => {
    const [brandsList, setBrandsList] = useState(null)
    const [minMaxValue, setMinMaxValue] = useState(null)
    const [ready, setReady] = useState(false)

    const {request} = useHttp()

    const loadFromLocal = () => {
        return JSON.parse(localStorage.getItem('filter'))
    }

    const [filter, setFilter] = useState(() => {
        return loadFromLocal()
    })


    const loadBrands = () => {
        request(`/api/v1/brands`)
            .then(setBrandsList)
    }

    const loadMinMaxValues = () => {
        request(`/api/v1/limits`)
            .then(r => new Promise(resolve => {
                setMinMaxValue(r)
                // setFilter(r)
                setReady(true)
                resolve('ok')
            }))
            .then(loadCars())
    }

    const saveToLocal = () => {
        localStorage.setItem('filter', JSON.stringify(filter));
    }


    const changeHandler = event => {
        setFilter({...filter, [event.name]: event.value})
        console.log(filter)
    }


    useEffect(() => {
        saveToLocal()
        filterEdit(filter)
    }, [filter])

    useEffect(() => {
        loadBrands()
        loadMinMaxValues()
    }, [])

    return (
        <div className='aside__filter'>
            {
                ready &&
                <>
                    <RangeSlider
                        title='Цена'
                        name='Price'

                        onChangeHandler={changeHandler}

                        max={minMaxValue.maxPrice}
                        min={minMaxValue.minPrice}
                        minValue={filter.minPrice}
                        maxValue={filter.maxPrice}
                    />
                    <RangeSlider
                        title='Пробег'
                        name='Mileage'

                        onChangeHandler={changeHandler}

                        max={minMaxValue.maxMileage}
                        min={minMaxValue.minMileage}
                        minValue={filter.minMileage}
                        maxValue={filter.maxMileage}
                    />
                    <RangeSlider
                        title='Год выпуска'
                        name='Year'

                        onChangeHandler={changeHandler}

                        max={minMaxValue.maxYear}
                        min={minMaxValue.minYear}
                        minValue={filter.minYear}
                        maxValue={filter.maxYear}
                    />
                </>
            }
            {
                brandsList &&
                <CheckBoxesList
                    title='Марка'
                    name='brands'

                    list={brandsList}
                    setList={changeHandler}
                    selectedBrands={filter.brands}
                />
            }
            <button
                className='filters--widget widget button--primary'
                onClick={loadCars}>Загрузить
            </button>
        </div>
    )
}

export default CatalogFilter