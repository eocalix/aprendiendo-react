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
        // const url = `${id}/says/${threeFirstWords}`
        const url = `${CAT_PREFIX_IMAGE_URL}${id}/says/${threeFirstWords}`
        setImageUrl(url)
    })
  }, [fact])

  return { imageUrl: imageUrl }
}