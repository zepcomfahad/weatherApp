import React from 'react';
import { Link } from 'react-router-dom'
var moment = require('moment');

const WeekContainer = (props) => {
    let newDate = new Date();

    return (
        <div>
            {props.error && <p className="error">Please enter a valid city.</p>}
            {props.loading && <div class="loader"></div>}
            {props.responseObj.cod === 200 ?
                <div>
                    <div className="forecast-container">
                        <div className="today forecast">
                            <div className="forecast-header">
                                <div className="day">{moment(newDate.setTime(props.responseObj.dt * 1000)).format('dddd')}</div>
                                <div className="date">{moment(newDate.setTime(props.responseObj.dt * 1000)).format('MMMM Do, h:mm a')}</div>
                            </div> {/* .forecast-header */}
                            <div className="forecast-content">
                                <div className="location">{props.responseObj.name}</div>
                                <div className="degree">
                                    <div className="num">{Math.round(props.responseObj.main.temp)}<sup>o</sup>C</div>
                                    <div className="forecast-icon">
                                        <i className={`owf owf-${props.responseObj.weather[0].id} owf-5x`}></i>
                                    </div>
                                </div>
                                <span>{props.responseObj.weather[0].description}</span><br />
                                <span>wind speed {props.responseObj.wind.speed}</span>
                            </div>
                        </div>
                        {props.dailyData.map(item => {
                            return (
                                <div className="forecast" key={moment(newDate.setTime(item.dt * 1000)).format().split('T')[0]}>
                                    <Link style={{ textDecoration: 'none', color: 'white' }} to={'/day/' + moment(newDate.setTime(item.dt * 1000)).format('YYYY-MM-DD')}>
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
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
                : null
            }
        </div>
    )
}

export default WeekContainer;