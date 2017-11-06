const apiPath = 'http://localhost:8080/api';

const fetchOptions = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa('admin:district')}`
    }
};

export const fetchData = (periodId) => {

    // aggregate

    const url = `${apiPath}/analytics.json?` + [
        'dimension=dx:FbKK4ofIv5R',
        `dimension=pe:${periodId}`,
        //'dimension=ou:ImspTQPwCqd',
        //'includeNumDen=true'
    ].join('&');

    // events

    // const url = `${apiPath}/analytics/events/aggregate/eBAyeGv0exc.json?` + [
    //     'dimension=qrur9Dvnyt5-Yf6UHoPkdS6',
    //     `dimension=pe:${periodId}`,
    //     'dimension=ou:ImspTQPwCqd',
    //     'stage=Zj7UnCAulEk'
    // ].join('&');

    return fetch(url, fetchOptions).then(response => response.json());
};
