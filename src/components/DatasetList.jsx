import React, { Component } from 'react';
import axios from 'axios';
import Dataset from './Dataset.jsx';

export default class DatasetList extends Component {

    constructor(props) {
        super(props);

        this.state = {datasets: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/datasets/')
            .then(response => {
                console.log(response.data);
                this.setState({ datasets: response.data });
            })
            .catch((error) => console.log(error));
    }

    datasetList() {
        // eslint-disable-next-line
        return this.state.datasets.map(currentdataset => {
            if (this.props.search !== '' && this.props.filter.length !== 0) {
                if ((currentdataset.name.toLowerCase().includes(this.props.search.toLowerCase()) || currentdataset.description.toLowerCase().includes(this.props.search.toLowerCase())) && this.props.filter.includes(currentdataset.category.toLowerCase())) {
                    return <Dataset dataset={currentdataset} />;
                }
            }
            else if (this.props.search !== '') {
                if (currentdataset.name.toLowerCase().includes(this.props.search.toLowerCase()) || currentdataset.description.toLowerCase().includes(this.props.search.toLowerCase())) {
                    return <Dataset dataset={currentdataset} />;
                }
            }
            else if (this.props.filter.length !== 0) {
                if (this.props.filter.includes(currentdataset.category?.toLowerCase())) {
                    return <Dataset dataset={currentdataset} />;
                }
            }
            else {
                return <Dataset dataset={currentdataset} />;
            }
        })
    }

    render() {
        return (
            <div>
                { this.datasetList() }
            </div>
        )
    }

}