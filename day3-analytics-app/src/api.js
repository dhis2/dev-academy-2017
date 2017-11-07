import { getInstance as getD2 } from 'd2/lib/d2';

export const fetchData = (periodId) => {

    // aggregate

    return getD2()
        .then((d2) => {
            return d2.analytics.aggregate
                .reset()
                .addDimensions([
                    'dx:FbKK4ofIv5R',
                    `pe:${periodId}`,
                ]).get();
        });

    // events
/*
    return getD2()
        .then((d2) => {
            const d2AnalyticsEvents = d2.analytics.events
                .reset()
                .setProgram('eBAyeGv0exc')
                .addDimensions([
                    'qrur9Dvnyt5-Yf6UHoPkdS6',
                    `pe:${periodId}`,
                    'ou:ImspTQPwCqd',
                ])
                .addParameters({
                    stage: 'Zj7UnCAulEk',
                });

            return d2AnalyticsEvents.getAggregate();
        });
*/
};
