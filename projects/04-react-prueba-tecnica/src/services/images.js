const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'

export const getImageUrl = (fact) => {
  const firstWord = fact.split(' ')[0]
  const threeFirstWords = fact.split(' ', 3).join(' ')

  return fetch(`${CAT_PREFIX_IMAGE_URL}says/${threeFirstWords}?fontSize=50&fontColor=red&json=true`)
    .then(res => res.json())
    .then(response => {
      const { _id: id } = response
      const imageUrl = `${id}/says/${threeFirstWords}`
      return imageUrl
  })
}