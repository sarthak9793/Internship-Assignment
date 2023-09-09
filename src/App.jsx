import { useEffect, useState } from 'react'
import axios from "axios"

function App() {
  const [data, setData] = useState()
  const [formData, setFormData] = useState("")
  useEffect(() => {
    async function getData() {
      const response = await axios.get("https://api.punkapi.com/v2/beers")
      setData(response.data)
    }
    getData()
  }, [])
  const handleChange = (evt) => {
    setFormData(evt.target.value)
  }
  return (
    <div className='flex flex-col items-center mt-3'>
      <div className=''>
        <input type="text" placeholder='Search' className='w-80 min-w-[200px] rounded-md' value={formData} onChange={handleChange}/>
      </div>
      <div className="flex justify-center">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6'>
          {data && data.filter(item => item.name.toLowerCase().includes(formData.toLowerCase())).map((item) => (
            <div className="card w-80 bg-base-100 shadow-xl">
              <figure><img src={`${item.image_url}`} alt="Shoes" className='max-h-[400px] w-full object-contain rounded-[40px]' /></figure>
              <div className="card-body">
                <h2 className="card-title">{`${item.name}`}</h2>
                <p>{`${item.tagline}`}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
