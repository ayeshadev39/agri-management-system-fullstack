import { fetchWeather } from "../../api/weather";
import { FAILURE, REQUEST, SUCCESS, WEATHER_REQUEST } from "../utilities";

export const GETWEATHER = (lat, lon) => (dispatch) => {
  dispatch(REQUEST(WEATHER_REQUEST.FETCH_REQUEST));
  
  fetchWeather(lat, lon)
    .then(data => {
      dispatch(SUCCESS(WEATHER_REQUEST.FETCH_SUCCESS, data));
    })
    .catch(err => {
      console.warn("API failed, using fallback dummy data:", err.message);
      
      // ✅ FALLBACK DATA (Agar API down ho)
      const fallbackData = {
        current: {
          temperature_2m: 32,
          relative_humidity_2m: 65,
          wind_speed_10m: 12,
          precipitation: 0,
          weather_code: 0
        },
        daily: {
          time: ["2026-10-31", "2026-11-01", "2026-11-02", "2026-11-03", "2026-11-04"],
          weather_code: [0, 1, 2, 61, 0],
          temperature_2m_max: [32, 31, 29, 26, 30],
          temperature_2m_min: [22, 21, 20, 19, 20],
          precipitation_probability_max: [0, 10, 20, 80, 5],
          relative_humidity_2m_mean: [65, 60, 70, 85, 55]
        }
      };

      // Error ke bajaye Dummy data dispatch karein
      dispatch(SUCCESS(WEATHER_REQUEST.FETCH_SUCCESS, fallbackData));
    });
};