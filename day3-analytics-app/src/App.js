import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getData } from './actions';
import './App.css';

let selectedValue = null;

const Selector = ({ onClick }) => {
    const clickHandler = (e) => {
        if (e.target.value !== selectedValue) {
            onClick(e.target.value);
            selectedValue = e.target.value;
        }
    };

    return (
        <section>
            <select onClick={clickHandler} defaultValue="">
                <option hidden value="">Select period</option>
                <option value="2017">Fixed: 2017</option>
                <option value="201701">Fixed: January 2017</option>
                <option value="201701;201702;201703">Fixed: January, February, March 2017</option>
                <option value="2017Q3">Fixed: 3rd quarter 2017</option>
                <option value="LAST_12_MONTHS">Relative: Last 12 months</option>
                <option value="LAST_4_QUARTERS">Relative: Last 4 quarters</option>
                <option value="LAST_YEAR">Relative: Last year</option>
            </select>
        </section>
    );
};

const ValueTable = ({ data, isLoading }) => {
    if (!data) {
        return 'No values here';
    }

    if (isLoading) {
        return 'Loading...';
    }

    const { headers, metaData, rows } = data;

    return (
        <section>
            <table>
                <thead>
                <tr>
                    {headers.map((header, index) => <th key={index}>{header.column}</th>)}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) =>
                    <tr key={index}>{row.map((value, index) => <td key={index}>{(metaData.items[value] || {}).name || value}</td>)}</tr>
                )}
                </tbody>
            </table>
        </section>
    );
};

const App = ({ data, isLoading, onClick }) => (
    <div>
        <Selector onClick={ onClick } />
        <ValueTable data={ data } isLoading={ isLoading } />
    </div>
);

App.contextTypes = {
    store: PropTypes.object,
};

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    data: state.data
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: value => value && dispatch(getData(value))
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
