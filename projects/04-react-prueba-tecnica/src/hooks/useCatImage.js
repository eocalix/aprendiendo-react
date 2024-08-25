import { useEffect, useState } from "react"
import { CAT_PREFIX_IMAGE_URL } from '../constants'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()
  
  useEffect(() => {
    if (!fact) return

    const firstWord = fact.split(' ')[0]
    const threeFirstWords = fact.split(' ', 3).join(' ')

    fetch(`${CAT_PREFIX_IMAGE_URL}says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { _id: id } = response
        setImageUrl(`${id}/says/${threeFirstWords}`)
    })
  }, [fact])

  return { imageUrl }
}