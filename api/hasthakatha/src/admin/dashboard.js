
var dashboard_app = function (app, con, hasthaBean) {
    
    app.get('/rest/stats', (req, res) => {
        const orderCompletedQuery = 'Select count(*) from tracking_order where delivery_status =3;';
        const orderPendingQuery = 'Select count(*) from tracking_order where delivery_status=1;';
        const totalRevenueQuery = 'Select sum(total_amount) from transaction where t_status=2;';
        const allProductsCountQuery = 'Select count(*) from product where 1;';
        const masterQuery = orderCompletedQuery + orderPendingQuery + totalRevenueQuery + allProductsCountQuery;
        con.query(masterQuery, (err, result) => {
            res.send({type: 'success', result: {
                ordersCompleted: result[0][0]['count(*)'],
                ordersPending: result[1][0]['count(*)'],
                totalRevenue: result[2][0]['sum(total_amount)'],
                allProducts: result[3][0]['count(*)']
            }});
        });
    });

    app.get('/rest/messages', (req, res) => {
        con.query('Select * from messages', (err, result) => {
            res.send({type: 'success', result})
        });
    });

    app.delete('/rest/messages/:mid', (req, res) => {
        con.query(`delete from messages where id = ${mid}`, (err, result) => {
            if (err) {
                res.status(500);
                res.send({type: 'error', message: 'Internal server error. Please try later.', details: err});
            }
            res.send({type: 'success'});
        });
    });
} 

module.exports = dashboard_app;