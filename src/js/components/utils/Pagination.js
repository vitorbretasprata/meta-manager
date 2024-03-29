import React, { Component } from "react";
import PropTypes from 'prop-types';

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageLimit: PropTypes.number
}

const defaultProps = {
    initialPage: 1,
    pageLimit: 15
}

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        if(this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.items !== prevProps.items) {            
            this.setPage(this.props.initialPage);
        }
    }

    setPage = (page) => {
        const { items, pageSize } = this.props;
        let pager = this.state.pager;

        if(page < 1 || page > pager.maxPages) {
            return;
        }

        pager = this.getPager(items.length, page, pageSize);

        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        this.setState({ pager: pager });

        this.props.onChangePage(pageOfItems);
    }

    getPager = (totalItems, currentPage, pageSize) => {
        currentPage = currentPage || 1;

        pageSize = pageSize || 15;

        const maxPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
        if(maxPages <= 10) {
            startPage = 1;
            endPage = maxPages;
        } else {
            if(currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if(currentPage + 4 >= maxPages) {
                startPage = maxPages - 9;
                endPage = maxPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            maxPages: maxPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        }
         
    }

    render() {
        const { pager } = this.state;

        if(!pager.pages || pager.pages.length <= 1) {
            return null;
        }


        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className={pager.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                        <a className="page-link" onClick={() => this.setPage(1)}>First</a>
                    </li>
                    <li className={pager.currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                        <a className="page-link" onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                    </li>
                    {pager.pages.map((page, index) => 
                        <li key={index} className={pager.currentPage === page ? 'page-item active' : 'page-item'}>
                            <a className="page-link" onClick={() => this.setPage(page)}>{page}</a>
                        </li>    
                    )}
                    <li className={pager.currentPage === pager.maxPages ? 'page-item disabled' : 'page-item'}>
                        <a className="page-link" onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                    </li>
                    <li className={pager.currentPage === pager.maxPages ? 'page-item disabled' : 'page-item'}>
                        <a className="page-link" onClick={() => this.setPage(pager.maxPages)}>Last</a>
                    </li>
                </ul>
            </nav>
            
        )
    }   
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;