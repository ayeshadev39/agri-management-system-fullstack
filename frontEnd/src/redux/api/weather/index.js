export const fetchWeather = async (lat, lon) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,relative_humidity_2m_mean&forecast_days=5&timezone=auto`;
  
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`); // ✅ Agar 503 aaye to error throw karega
  }
  return res.json();
};