
 export const fetchData = () =>{
 return (
      fetch("https://api.github.com/users/mtahir08")
    .then(res => {
      return res.json();
    })
    .then(user=> user)
    .catch(error=> error)
    )
}
 

