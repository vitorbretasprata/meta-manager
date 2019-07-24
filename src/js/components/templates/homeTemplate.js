import React from 'react';
import CarouselTemplate from '../carouselTemplate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faDonate } from '@fortawesome/free-solid-svg-icons';

const HomeTemplate = () => (
    <div className="homeBody">
        <CarouselTemplate />
        <section>
            <div className="container">
                <div className="row">
                    <div className="panels col-sm-12 col-md-6 col-lg-6">
                        <div>
                            <FontAwesomeIcon icon={faUserAlt} size="3x"/>
                        </div>
                        <div>
                            <h3>About me</h3>
                        </div>
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type 
                            specimen book. It has survived not only five centuries, but also the leap into 
                            electronic typesetting, remaining essentially unchanged. It was popularised in the 
                            1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more 
                            recently with desktop publishing software like Aldus PageMaker including versions of 
                            Lorem Ipsum.
                        </div>
                    </div>
                    <div className="panels col-sm-12 col-md-6 col-lg-6">
                        <div>
                            <FontAwesomeIcon icon={faDonate} size="3x"/>
                        </div>
                        <div>
                            <h3>Donation</h3>
                        </div>
                        <div>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type 
                            specimen book. It has survived not only five centuries, but also the leap into 
                            electronic typesetting, remaining essentially unchanged. It was popularised in the 
                            1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more 
                            recently with desktop publishing software like Aldus PageMaker including versions of 
                            Lorem Ipsum.
                        </div>
                    </div>

                </div>
            </div>
        </section>       
    </div>
    
)

export default HomeTemplate;