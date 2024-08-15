import ProgressBar from 'react-bootstrap/ProgressBar';

function ContentResume() {
    return (
        <div className='h-100' style={{ position: 'relative', overflowY: 'scroll' }}>
            <h1>Resumen</h1>
            <hr className="Background_Yellow" />
            <h3>Educación</h3>
            <div class="timeline education">
                <div class="timeline-items">
                    <div class="timeline-item">
                        <h3>Master of Science in information systems with computing</h3>
                        <time datetime="2017/2019">2017 &ndash; 2019</time>
                        <div class="location">Dublin Business School, Dublin, Ireland</div>
                    </div>
                    <div class="timeline-item">
                        <h3>Bachelor of electrical engineering</h3>
                        <time datetime="2011/2016">2011 &ndash; 2016</time>
                        <div class="location">North Maharashtra University, Jalgaon, India</div>
                    </div>
                    <div class="timeline-item">
                        <h3>Boys town public school</h3>
                        <time datetime="2009/2010">2009 &ndash; 2010</time>
                        <div class="location">Dublin Business School, Dublin, Ireland</div>
                    </div>
                    <div class="timeline-item">
                        <h3>Boys town public school</h3>
                        <time datetime="2009/2010">2009 &ndash; 2010</time>
                        <div class="location">Dublin Business School, Dublin, Ireland</div>
                    </div>
                </div>
            </div>
            <h3>Experiencia</h3>
            <div class="timeline experience">
                <div class="timeline-items">
                    <div class="timeline-item">
                        <h3>Sofware developer</h3>
                        <time datetime="2020/2022">2020 &ndash; Present</time>
                        <div class="location">Kare, Newbridge, Ireland</div>
                    </div>
                    <div class="timeline-item">
                        <h3>Junior developer</h3>
                        <time datetime="2019/2020">2017 &ndash; 2019</time>
                        <div class="location">Unipupil limited, Dublin, Ireland</div>
                    </div>
                    <div class="timeline-item">
                        <h3>Junior developer</h3>
                        <time datetime="2015/2017">2017 &ndash; 2019</time>
                        <div class="location">Dublin Business School, Dublin, Ireland</div>
                    </div>
                </div>
            </div>
            <h3>Mis habilidades</h3>
            <div className="skills w-100 p-4">
                <h5>Ingles</h5>
                <ProgressBar now={60} />    
            </div>

        </div>
    )
}

export default ContentResume;