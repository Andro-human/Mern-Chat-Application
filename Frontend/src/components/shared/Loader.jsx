
import loader from "../../assets/Loader.svg"

const Loader = () => {
  return (
    <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)" , display: "flex", alignItems:"center", justifyContent:"center", height:"100vh", width:"100vw"}}>
        <img src={loader} alt="loading.." />
    </div>
  )
}

export default Loader
