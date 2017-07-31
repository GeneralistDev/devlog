import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import ReactMarkdown from 'react-markdown';

class Feed extends Component {
    render() {
        if (this.props.data.loading) {
            return (<div>Loading Entries...</div>);
        }

        if (this.props.data.error) {
            console.log(this.props.data.error);
            return (<div>An unexpected error occurred</div>);
        }

        return (
            <div>
                {
                    this.props.data.allEntries.map((item, index) => {
                        return (<div key={index}>
                            <h3>{item.title}</h3>
                            <ReactMarkdown source={item.markdown}/>
                        </div>);
                    })
                }
            </div>
        );
    }
};

Feed.PropTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool,
        error: PropTypes.object,
        allEntries: PropTypes.object,
    }).isRequired,
}

const EntriesQuery = gql`
    query EntriesQuery {
        allEntries {
            id
            createdAt
            updatedAt
            markdown
            title
        }
    }
`

export default graphql(EntriesQuery)(Feed);