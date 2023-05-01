import React, { useState, useEffect, useCallback } from 'react'
import SearchBar from './SushiSearch'
import SushiList from './sushiList'

function SushiShow() {
  const [listToShow, setListToShow] = useState([])
  const [asc, setAsc] = useState(false)

  const [originalList, setOriginalList] = useState(listToShow)

  const serverUrl = '/api/sushi'
  useEffect(() => {
    if (originalList.length === 0) {
      const fetchData = async () => {
        const response = await fetch(serverUrl)
        const data = await response.json()
        // const convertedList = covertSushiList(data)
        const convertedList = data
        setListToShow(convertedList)
        setOriginalList(convertedList)
        console.log()
      }
      fetchData()
    } else {
      setListToShow(originalList)
    }
  }, [originalList])

  const sortByPrice = useCallback(() => {
    const sortedByPrice = listToShow.slice().sort((a, b) => {
      const priceA = parseFloat(a.price)
      const priceB = parseFloat(b.price)
      return asc ? priceA - priceB : priceB - priceA
    })
    setListToShow(sortedByPrice)
    setAsc(!asc)
  }, [listToShow, asc])

  const searchByTitle = useCallback(
    (queryStr) => {
      const matedList = originalList.filter(
        (sushi) =>
          sushi.title.toLowerCase().indexOf(queryStr.toLowerCase()) !== -1
      )
      setListToShow(matedList)
    },
    [originalList]
  )

  return (
    <>
      <SearchBar sort={sortByPrice} search={searchByTitle} />
      <SushiList list={listToShow} />
    </>
  )
}

export default SushiShow
