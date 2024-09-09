import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';

import { useEffect, useState } from 'react';

function ContentResume() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const URL = import.meta.env.VITE_URL_API;
        const URL_GET = import.meta.env.VITE_API_RESUME;
        const URL_Petition = URL + URL_GET + '/' + sessionStorage.getItem('uid');
        const response = await axios.get( URL_Petition);
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      }
      catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [])

  if (loading) {
    return <h1>Cargando...</h1>
  }

  return (
    <div className='h-100' style={{ position: 'relative', overflowY: 'scroll' }}>
      <h1>Resumen</h1>
      <hr className="Background_Yellow" />
      <h3>Educación</h3>
      <div className="timeline education">
        <div className="timeline-items">
          {data.Education.Education.map((education, index) => (
            <div key={index} className="timeline-item">
              <h3>{education.Name}</h3>
              <time>{education.YearStart} &ndash; {education.YearEnd}</time>
              <div className="location">{education.School}, {education.State}, {education.Country}</div>
            </div>
          ))}
        </div>
      </div>

      <h3>Experiencia</h3>
      <div className="timeline experience">
        <div className="timeline-items">
          {data.Experience.Experience.map((experience, index) => (
            <div key={index} className="timeline-item">
              <h3>{experience.Name}</h3>
              <time>{experience.Start} &ndash; {experience.End}</time>
              <div className="location">{experience.Company}</div>
            </div>
          ))}
        </div>
      </div>
      <h3>Mis habilidades</h3>
      <div className="skills w-100 p-4">
        {data.Skills.Skills.map((skill, index) => (
          <div key={index} className='mb-3'>
            <h5>{skill.Name}</h5>
            <ProgressBar animated now={skill.Value} label={<span style={{fontWeight: 'bold', color: 'black' }}>{skill.Value}%</span>}/>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ContentResume;