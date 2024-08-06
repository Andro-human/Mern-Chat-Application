
import loader from "../../assets/Loader.svg"
import typingLoader from "../../assets/typingLoader.svg"
const Loader = () => {
  return (
    <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)" , display: "flex", alignItems:"center", justifyContent:"center", height:"100vh", width:"100vw"}}>
        <img src={loader} alt="loading.." />
    </div>
  )
}

const TypingLoader = () => {
  return (
    // <div style={{display:"flex",height: "10vh", width:"", justifyContent:"flex-start", margin: 0, padding: 0 }}>
        <img src={typingLoader} alt="loading.." style={{marginRight: "18rem", marginTop:"0", marginBottom:"0"}} />
    // </div>
  )
}

export {Loader, TypingLoader};
