import React from 'react';
import CarouselTemplate from '../carouselTemplate';

const HomeTemplate = () => (
    <div className="homeBody">
        <CarouselTemplate />
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        First Panel
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6">
                        Second Panel
                    </div>

                </div>
            </div>
        </section>       
    </div>
    
)

export default HomeTemplate;