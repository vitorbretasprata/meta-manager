import React from "react";
import { Link } from 'react-router-dom';
import posed from 'react-pose';

const Content = posed.div({
    closed: { height: 0 },
    open: { height: 'auto' }
});

const ViewTemplate = ({ titleTicket, importanceTicket, authorTicket, clientTicket, isOpen,
     termTicket, dateTicket, stateTicket, commentsTicket, descriptionTicket, linkToEdit, addComment, deleteTicket, newComment, categoryTicket, textComment, handleComment}) => (
    <div className="container-fluid">
        <form>                
            <div className="ticketInfo">
                <div className="ticketTitle"><h2>{titleTicket}</h2> <h3>(<span className={"color-" + importanceTicket}>{importanceTicket}</span>)</h3></div>
                <div className="row">
                    <div className="information col-sm-12  col-md-6 col-lg-6">
                        <span>Status: {stateTicket} </span> 
                        <span>Author: {authorTicket}</span>  
                        <span>Customer: {clientTicket}</span> 
                    </div>
                    <div className="information col-sm-12  col-md-6 col-lg-6">
                        <span>Category: {categoryTicket}</span> 
                        <span>Term: {termTicket}</span>  
                        <span>Creation date: {dateTicket}</span> 
                    </div>
                </div>
                     
                </div>
            <div className="ticketDescription">
                <div className="descriptionTitle">
                    <h4>Description</h4>
                </div>
                <div className="description">
                    <p>
                        {descriptionTicket}
                    </p>
                </div>
                <div className="d-flex justify-content-end">
                    <Link to={linkToEdit} className="right-margin btn btn-dark">Edit</Link>
                    <button onClick={deleteTicket} className="btn btn-dark">Delete</button>
                </div>    
            </div>
            
            <div className="ticketComments">                    
                <div className="addComment">
                    <button onClick={addComment} className="btn btn-dark">Add a comment</button>
                </div>
                <Content className="content" pose={isOpen ? 'open' : 'closed'}>
                    <form className="conent-wrapper" onSubmit={newComment}>
                        <textarea name="newComment" className="marginComment form-control" rows="3" value={textComment} onChange={handleComment}>

                        </textarea>
                        <div className="f-flex justify-content-end">
                            <input type="submit" value="Add" className="btn btn-dark"/>
                        </div>
                    </form>
                </Content>
                <div className="Comments">
                    {commentsTicket}
                </div>                    
            </div>
        </form>            
    </div>
)

export default ViewTemplate;