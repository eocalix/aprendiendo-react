import { useEffect, useState } from "react"
import './App.css'
import { getRandomFact } from "./services/facts"
import { getImageUrl } from "./services/images"


// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export function App () {
  const [fact, setFact] = useState('')
  const [imageUrl, setImageUrl] = useState()
  const [factError, setFactError] = useState()


  // Recuperar la cita al cargar la pagina
  useEffect(() => {
    // getRandomFact().then(setFact)
    getRandomFact().then(newFact => setFact(newFact))
  }, [])

  // Recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return
    getImageUrl(fact).then(newImageUrl => setImageUrl(newImageUrl))
  }, [fact])
  // useEffect(() => {
  //   if (!fact) return

  //   const firstWord = fact.split(' ')[0]
  //   const threeFirstWords = fact.split(' ', 3).join(' ')

  //   fetch(`${CAT_PREFIX_IMAGE_URL}says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
  //     .then(res => res.json())
  //     .then(response => {
  //       const { _id: id } = response
  //       setImageUrl(`${id}/says/${threeFirstWords}`)
  //   })
  // }, [fact])

  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }

  return (
    // <main style={{ display: 'flex', flexDirection: 'column' }}>
    <main>
      <h1>App de gatitos</h1>
        <button onClick={handleClick}>
          Get new fact
        </button>
      {/* <section> */}
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`} />}
      {/* </section> */}
    </main>
  )
}