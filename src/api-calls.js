

const getData = (path) => {
  const allUsers = fetch(`http://localhost:3001/api/v1/${path}`)
    .then(response => response.json(response))
    .then(data => console.log(data))

}
export { getData }
