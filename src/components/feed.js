import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import ReactMarkdown from 'react-markdown';
import { ListGroup, ListGroupItem, Media } from 'react-bootstrap';
import Moment from 'react-moment';
import EntryEditor from './entryEditor.js'

// const isAdmin = () => {

// }

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
            <div className="col-xs-12 col-sm-12 col-md-offset-3 col-md-6 col-lg-offset-2 col-lg-8">
                {
                    true && (
                        <EntryEditor></EntryEditor>
                    )
                }
                <Media.List>
                    <ListGroup>
                    {
                        this.props.data.allEntries.map((item, index) => {
                            return (
                                <Media.ListItem key={index}>
                                    <ListGroupItem>
                                        <Media>
                                            <Media.Body>
                                                <Moment className="light-grey" format="ddd Do MMM YYYY">{item.createdAt}</Moment>
                                                <Media.Heading className="Entry-title">{item.title}</Media.Heading>
                                                <ReactMarkdown className="Entry-body" source={item.markdown}/>
                                            </Media.Body>
                                        </Media>
                                    </ListGroupItem>
                                </Media.ListItem>
                            );
                        })
                    }
                    </ListGroup>
                </Media.List>
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