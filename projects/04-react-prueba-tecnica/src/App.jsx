import { useEffect, useState } from "react"
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export function App () {
  const [fact, setFact] = useState('')
  const [imageUrl, setImageUrl] = useState()
  const [factError, setFactError] = useState()

  const getRandomFact = () => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res =>{
        // console.log(res)
        if (!res.ok) {
          // setFactError('No se ha podido recuperar la cita')
          throw new Error('Error fetching fact')
        }

        return res.json()
      })
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
      .catch((err) => {
        // Si hay error con la respuesta
        // Si hay un error con la peticion
      })
  }

  // Recuperar la cita al cargar la pagina
  useEffect(() => {
    // async function getRandomFact() {
    //   const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)

    //   const json = await res.json()

    //   setFact(json.fact)
    // }

    // getRandomFact()    
  }, [])

  useEffect(getRandomFact, [])

  // Recuperar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return

    const firstWord = fact.split(' ')[0]
    // const threeFirstWords = fact.split(' ').slice(0, 3).join(' ')
    const threeFirstWords = fact.split(' ', 3).join(' ')
    // console.log(threeFirstWords);

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        const { _id: id } = response
        setImageUrl(`${id}/says/${threeFirstWords}`)
    })
  }, [fact])

  const handleClick = () => {
    getRandomFact()
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