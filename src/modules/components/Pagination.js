import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class Pagination extends Component {
    constructor(props) {
        super();
    }

    static propTypes = {
        page: PropTypes.number.isRequired,
        pages: PropTypes.number.isRequired,
    }

    static defaultProps = {
        page: 1,
        pages: 1
    }

    render() {
        return (
            <div className="pagination-actions">
                <span>Page {this.props.page} of {this.props.pages}</span>
                <button className="pagination-button action" onClick={() => {this.props.paginate("prev")}} disabled={this.props.page === 1 ? true : null}>
                    <i className="fas fa-lg fa-arrow-circle-left"></i>
                </button>
                <button className="pagination-button action" onClick={() => {this.props.paginate("next")}}>
                    <i className="fas fa-lg fa-arrow-circle-right"></i>
                </button>
            </div>
        )
    }
}