import axios from 'axios'
import { useEffect, useState } from 'react'

const API_URL = "http://localhost:3000/api/v1/"

function getDashboardAPIData() {
  return axios.get(API_URL + "dashboard/index").then((res) => res.data)
}

export default function Dashboard() {
  const [dashboardData, setdashboardData] = useState([])

  useEffect(() => {
    // Connecting to API /dashboard/index endpoint after the element was mounted
    let mounted = true;
    getDashboardAPIData().then((items) => {
      if (mounted) {
        setdashboardData(items)
        // console.log(items)
      }
    })
    return () => (mounted = false)
  }, [])

  return (
    <div>
      <h2 className="pb-2">Dashboard:</h2>

      <div className="row g-2 py-3 row-cols-4">
        <div className="card mb-4 rounded-3 shadow-sm mx-3">
          <div className="card-body">
            <h6>Users:</h6>
            <p><strong>{ dashboardData.users_count }</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}