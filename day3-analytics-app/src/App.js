import React, { Component } from 'react';
import './App.css';

const reportTablePlugin = global.reportTablePlugin;
const chartPlugin = global.chartPlugin;

const url = 'http://localhost:8080';
const username = 'admin';
const password = 'district';

class App extends Component {
    componentDidMount() {
        reportTablePlugin.url = url;
        reportTablePlugin.username = username;
        reportTablePlugin.password = password;

        chartPlugin.url = url;
        chartPlugin.username = username;
        chartPlugin.password = password;

        reportTablePlugin.load({
            id: 'C0rhAq1oklh',
            el: 'table1'
        });

        reportTablePlugin.load({
            columns: [
                {
                    dimension: 'dx',
                    items: [
                        {
                            id: 'Uvn6LCg7dVU'
                        }
                    ]
                }
            ],
            rows: [
                {
                    dimension: 'pe',
                    items: [
                        {
                            id: 'LAST_12_MONTHS'
                        }
                    ]
                }
            ],
            el: 'table2'
        });

        chartPlugin.load({
            id: 'DkPKc1EUmC2',
            el: 'chart1'
        });
    }
    render() {
        return (
            <div>
                <h1>My web portal</h1>
                <section>
                    <h2>Pivot table by favorite id</h2>
                    <div id="table1"></div>
                    <h2>Pivot table by config</h2>
                    <div id="table2"></div>
                </section>
                <section>
                    <h2>Chart by favorite id</h2>
                    <div id="chart1"></div>
                </section>
            </div>
        );
    }
}

export default App;
