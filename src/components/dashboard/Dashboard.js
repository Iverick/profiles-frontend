import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_URL } from '../../constants/app-constants'

const getDashboardAPIData = async() => {
  return await axios.get(API_URL + "dashboard/index").then((res) => res.data)
}

export default function Dashboard() {
  const [dashboardData, setdashboardData] = useState([])

  useEffect(() => {
    // Connecting to API /dashboard/index endpoint after the element was mounted
    getDashboardAPIData().then((items) => {
      setdashboardData(items)
    })
  }, [])

  return (
    <div>
      <h2 className="pb-2">Dashboard:</h2>
      <div className="row g-2 py-2">
        <div className="col-2">
          <div className="card mb-4 rounded-3 shadow-sm mx-3">
            <div className="card-body text-center my-4">
              <p className="fs-4">Users:</p>
              <h2>{ dashboardData.users_count || 0 }</h2>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="card mb-4 rounded-3 shadow-sm mx-3">
            <div className="card-body text-center my-4">
              <p className="fs-4">Profiles:</p>
              <h2>{ dashboardData.profiles_count || 0 }</h2>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card mb-4 rounded-3 shadow-sm mx-3">
            <div className="card-body text-center my-4">
            <p className="fs-4">Profiles over 18 years old:</p>
              <h3>{ dashboardData.adult_profiles_count || 0 }</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}