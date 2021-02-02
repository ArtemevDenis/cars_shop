import React, {useEffect, useState} from 'react'
import RangeSlider from "../inputs/RangeSlider";
import CheckBoxesList from "../inputs/CheckBoxesList";
import {useHttp} from "../../hooks/http.hook";


const CatalogFilter = ({filterEdit, loadCars}) => {
    const [minPrice, setMinPrice] = useState(null)
    const [maxPrice, setMaxPrice] = useState(null)
    const [minYear, setMinYear] = useState(null)
    const [maxYear, setMaxYear] = useState(null)
    const [minMileage, setMinMileage] = useState(null)
    const [maxMileage, setMaxMileage] = useState(null)
    const [brands, setBrands] = useState(null)
    const [brandsList, setBrandsList] = useState(null)

    const [minMaxValue, setMinMaxValue] = useState(null)
    const [ready, setReady] = useState(false)

    const {request} = useHttp()
    const loadBrands = () => {
        request(`/api/v1/brands`)
            .then(setBrandsList)
    }

    const loadMinMaxValues = () => {
        request(`/api/v1/limits`)
            .then(r => new Promise(resolve => {
                setMinMaxValue(r)
                setMinPrice(r.minPrice)
                setMaxPrice(r.maxPrice)
                setMinYear(r.minYear)
                setMaxYear(r.maxYear)
                setMinMileage(r.minMileage)
                setMaxMileage(r.maxMileage)
                setReady(true)
                resolve('ok')
                filterEdit({
                    minPrice: r.minPrice,
                    maxPrice: r.maxPrice,
                    minMileage: r.minMileage,
                    maxMileage: r.maxMileage,
                    minYear: r.minYear,
                    maxYear: r.maxYear,
                    brands: null
                })
            }))
            .then(r => {
                loadCars()
            })

    }

    useEffect(() => {
        loadBrands()
        loadMinMaxValues()
    }, [])

    useEffect(() => {
        filterEdit({
            minPrice, maxPrice, minMileage, maxMileage, minYear, maxYear, brands
        })
    }, [minPrice, maxPrice, minMileage, maxMileage, minYear, maxYear, brands])

    return (
        <div className='aside__filter'>
            {ready &&
            <>
                <RangeSlider
                    max={minMaxValue.maxPrice}
                    min={minMaxValue.minPrice}
                    title={'Цена'}
                    setMinValue={setMinPrice}
                    setMaxValue={setMaxPrice}
                    minValue={minPrice}
                    maxValue={maxPrice}
                />
                <RangeSlider
                    max={minMaxValue.maxMileage}
                    min={minMaxValue.minMileage}
                    title={'Пробег'}
                    setMinValue={setMinMileage}
                    setMaxValue={setMaxMileage}
                    minValue={minMileage}
                    maxValue={maxMileage}
                />
                <RangeSlider
                    max={minMaxValue.maxYear}
                    min={minMaxValue.minYear}
                    title={'Год выпуска'}
                    setMinValue={setMinYear}
                    setMaxValue={setMaxYear}
                    minValue={minYear}
                    maxValue={maxYear}
                />
            </>
            }
            {brandsList && <CheckBoxesList list={brandsList} setList={setBrands} title={"Марка"}/>}
            <button
                className='filters--widget widget button--primary'
                onClick={loadCars}>Загрузить
            </button>
        </div>
    )
}

export default CatalogFilter