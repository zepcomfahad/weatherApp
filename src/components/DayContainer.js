import React from 'react'
import { Link } from 'react-router-dom';
import useRouter from "use-react-router"
var moment = require('moment');

const DayContainer = (props) => {
  let newDate = new Date();
  const { location } = useRouter()
  const date = location.pathname.split("/")[2];
  const daydata = props.fullData.filter(reading => moment(newDate.setTime(reading.dt * 1000)).format('YYYY-MM-DD').includes(date))

  return (
    <div>
      <div className="forecast-container">
        {
          daydata.map(item => {
            return (
              <div className="forecast" key={item.dt_txt}>
                <div className="forecast-header">
                  <div className="day">{moment(newDate.setTime(item.dt * 1000)).format('dddd')}</div>
                  <div className="day">{moment(newDate.setTime(item.dt * 1000)).format('MMMM Do, h:mm a')}</div>
                </div> {/* .forecast-header */}
                <div className="forecast-content">
                  <div className="forecast-icon">
                    <i className={`owf owf-${item.weather[0].id} owf-5x`}></i>
                  </div>
                  <div className="degree">{Math.round(item.main.temp_max)}<sup>o</sup>C</div>
                  <small>{Math.round(item.main.temp_min)}<sup>o</sup>C</small>
                  <p className="card-text">{item.weather[0].description}</p>
                </div>
              </div>
            )
          })
        }
      </div>
      <Link to="/"><button>Back</button></Link>
    </div>
  )

}

export default DayContainer;
