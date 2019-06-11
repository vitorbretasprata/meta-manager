import React from 'react';
import LazyLoad from 'react-lazyload';

const HomeTemplate = () => (
    <div className="homeBody">
        <section>
            <LazyLoad>
                <div className="homeInfo">
                    <h3>Ticket manager</h3>
                    <p>
                    This is a simple application to create tickets and organize tasks. 
                    </p>
                </div>
            </LazyLoad>            
        </section>
        <section>
            <LazyLoad>
                <div className="homeInfo positionRight">
                    <h3>Organization</h3>
                    <p>
                    This application permits that not only you create a ticket, but set their status and priority. 
                    If you have an enterprise account, you can set who will be the owner of the ticket. 
                    </p>
                </div>
            </LazyLoad> 
        </section>
        <section>
            <LazyLoad>
                <div className="homeInfo">
                    <h3>User account</h3>
                    <p>
                    To user, just create your account, every tickets that you create will only appear to you. 
                    </p>
                </div>
            </LazyLoad> 
        </section>
        <section>
            <LazyLoad>
                <div className="homeInfo positionRight">
                    <h3>Enterprise account</h3>
                    <p>
                    If you have a caompany, you can also create a enterprise account.
                    With that, you can create and manager users account.
                    Every tickets that you or your users create, will only appear to you and the accounts that you created. 
                    </p>
                </div>
            </LazyLoad> 
        </section>        
    </div>
    
)

export default HomeTemplate