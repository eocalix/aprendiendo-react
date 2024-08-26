import './App.css'
import { CAT_PREFIX_IMAGE_URL } from './constants'
import { getImageUrl } from "./services/images"
import { useCatImage } from "./hooks/useCatImage"
import { useCatFact } from './hooks/useCatFact'



export function App () {
  
  // const [factError, setFactError] = useState()
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })
  
  // Recuperar la imagen cada vez que tenemos una cita nueva
  // useEffect(() => {
  //   if (!fact) return
  //   getImageUrl(fact).then(newImageUrl => setImageUrl(newImageUrl))
  // }, [fact])
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
    refreshFact()
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