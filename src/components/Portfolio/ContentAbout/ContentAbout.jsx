import { MdPhotoCamera } from "react-icons/md";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
function ContentAbout() {
    return (
        <div className='h-100' style={{ position: 'relative', overflowY: 'scroll' }}>

            <h1>Acerca de</h1>
            <hr className="Background_Yellow" />
            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Tristique sollicitudin nostra netus sit nunc massa amet taciti. Enim congue vel et; proin dis etiam phasellus facilisi. Odio iaculis interdum parturient natoque mauris pharetra eros ex. Purus quam curae sagittis nunc duis sit erat. Ex aliquet nisi venenatis arcu orci, est at eget curabitur. Velit libero hac molestie orci blandit mattis dapibus purus facilisis? Scelerisque mollis augue nam auctor vehicula sollicitudin cursus cursus.At viverra senectus nibh vivamus sagittis velit ante imperdiet. Facilisis turpis duis phasellus; taciti laoreet parturient platea porttitor. Suspendisse etiam pulvinar dapibus viverra tristique efficitur taciti cubilia. Molestie facilisi bibendum ac nunc fames. Consequat nisi magnis consequat dignissim dapibus at mattis libero. Euismod nisi potenti sagittis habitasse aliquet. Eu dui orci molestie fermentum tempus odio erat ultrices. Malesuada cursus ultrices tempus fermentum nibh aptent.Ornare mauris curae habitasse bibendum duis taciti sodales sollicitudin tellus. Taciti in hendrerit libero magnis nisl. Blandit dui praesent orci tristique ut. Fusce erat orci quis feugiat ridiculus. Vulputate sagittis dapibus sapien etiam risus. Pretium velit orci aliquam per efficitur libero morbi. Praesent porta in odio dis ipsum ut blandit? Eget varius duis nam posuere ornare. Mattis purus hac ornare, est pellentesque urna tincidunt. Integer hac odio velit fermentum, ultrices eget taciti fames.</p>
            <h2>Pasatiempos</h2>
            <div className="d-flex flex-wrap justify-content-around gap-3 mb-5">
                <div className="AboutHobbies d-flex gap-3 p-4">
                    <div className="IconHobbies">
                        <MdPhotoCamera size={40} />
                    </div>
                    <div>
                        <h4 className="mb-0">Estudiando</h4>
                        <p className="mb-0 text-muted">Lorem ipsum odor amet</p>
                    </div>

                </div>
                <div className="AboutHobbies d-flex gap-3 p-4">
                    <div className="IconHobbies">
                        <MdPhotoCamera size={40} />
                    </div>
                    <div>
                        <h4 className="mb-0">Estudiando</h4>
                        <p className="mb-0 text-muted">Lorem ipsum odor amet</p>
                    </div>

                </div>
                <div className="AboutHobbies d-flex gap-3 p-4">
                    <div className="IconHobbies">
                        <MdPhotoCamera size={40} />
                    </div>
                    <div>
                        <h4 className="mb-0">Estudiando</h4>
                        <p className="mb-0 text-muted">Lorem ipsum odor amet</p>
                    </div>


                </div>
                <div className="AboutHobbies d-flex gap-3 p-4">
                    <div className="IconHobbies">
                        <MdPhotoCamera size={40} />
                    </div>
                    <div>
                        <h4 className="mb-0">Estudiando</h4>
                        <p className="mb-0 text-muted">Lorem ipsum odor amet</p>
                    </div>


                </div>

            </div>
            <h2>Testimonios</h2>


            <div className="w-100 mb-5">
                <div>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={2}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        <SwiperSlide>
                            <div className="Testimonies d-flex ">
                                <div>
                                    <img className="ImageTestimonies" src="https://res.cloudinary.com/djss53chk/image/upload/v1723684799/Memojis/Male/eso2cfyjbqnjrkdrd7v1.svg" alt="" />
                                </div>
                                <div className="w-100 d-flex flex-column justify-content-center">
                                    <h5 className="mb-0">Estudiando</h5>
                                    <p className="mb-0 text-muted">Lorem ipsum odor amet</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="Testimonies d-flex ">
                                <div>
                                    <img className="ImageTestimonies" src="https://res.cloudinary.com/djss53chk/image/upload/v1723684799/Memojis/Male/eso2cfyjbqnjrkdrd7v1.svg" alt="" />
                                </div>
                                <div className="w-100 d-flex flex-column justify-content-center">
                                    <h5 className="mb-0">Estudiando</h5>
                                    <p className="mb-0 text-muted">Lorem ipsum odor amet</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="Testimonies d-flex ">
                                <div>
                                    <img className="ImageTestimonies" src="https://res.cloudinary.com/djss53chk/image/upload/v1723684799/Memojis/Male/eso2cfyjbqnjrkdrd7v1.svg" alt="" />
                                </div>
                                <div className="w-100 d-flex flex-column justify-content-center">
                                    <h5 className="mb-0">Estudiando</h5>
                                    <p className="mb-0 text-muted">Lorem ipsum odor amet</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="Testimonies d-flex ">
                                <div>
                                    <img className="ImageTestimonies" src="https://res.cloudinary.com/djss53chk/image/upload/v1723684799/Memojis/Male/eso2cfyjbqnjrkdrd7v1.svg" alt="" />
                                </div>
                                <div className="w-100 d-flex flex-column justify-content-center">
                                    <h5 className="mb-0">Estudiando</h5>
                                    <p className="mb-0 text-muted">Lorem ipsum odor amet</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

            </div>

            <h2>Certificaciones</h2>
            <div>
            <div>
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={4}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        <SwiperSlide>
                            <div className="Testimonies d-flex ">
                                <div>
                                    <img className="ImageTestimonies" src="https://res.cloudinary.com/djss53chk/image/upload/v1723684799/Memojis/Male/eso2cfyjbqnjrkdrd7v1.svg" alt="" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="Testimonies d-flex ">
                                <div>
                                    <img className="ImageTestimonies" src="https://res.cloudinary.com/djss53chk/image/upload/v1723684799/Memojis/Male/eso2cfyjbqnjrkdrd7v1.svg" alt="" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="Testimonies d-flex ">
                                <div>
                                    <img className="ImageTestimonies" src="https://res.cloudinary.com/djss53chk/image/upload/v1723684799/Memojis/Male/eso2cfyjbqnjrkdrd7v1.svg" alt="" />
                                </div>
                                
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="Testimonies d-flex ">
                                <div>
                                    <img className="ImageTestimonies" src="https://res.cloudinary.com/djss53chk/image/upload/v1723684799/Memojis/Male/eso2cfyjbqnjrkdrd7v1.svg" alt="" />
                                </div>
                                
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>

        </div>
    )
}

export default ContentAbout;