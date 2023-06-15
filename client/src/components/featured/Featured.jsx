import useFetch from "../../hooks/useFetch"
import "./featured.css"


function Featured() {

  const {data, loading, error} = useFetch("/hotels/countByCity?cities=Warsaw,Berlin,Madrid")



  
  return (
    <div className="featured">
      {loading ? ("Loading please wait") : (<><div className="featuredItem">
        <img
         src="https://assets3.thrillist.com/v1/image/2819918/792x528/scale;webp=auto;jpeg_quality=60;progressive.jpg"
        className="featuredImg"
        

        />
        
        <div className="featuredTitles">
          <h1>Warsaw</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img
          src="https://www.waszaturystyka.pl/wp-content/uploads/2021/11/niemcy-berlin.jpg"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Berlin</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://www.spain.info/.content/imagenes/rutas/madrid-dos-dias/catedral-almudena-madrid-s527688430.jpg"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Madrid</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div></>)}

    </div>
  )
}

export default Featured
