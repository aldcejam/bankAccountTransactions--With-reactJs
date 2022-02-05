import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import { App } from './App';

createServer({
  models: {
    transaction: Model
  },
  seeds(server) {
    server.db.loadData({
      transactions: [{
        id: 1,
        title: 'developer node',
        type: 'deposit',
        category: 'dev',
        amount: 2900,
        createdAt: new Date('2021-02-01 09:00:00')
      }, {
        id: 2,
        title: 'developer react',
        type: 'deposit',
        category: 'engenheiro ',
        amount: 2900,
        createdAt: new Date('2021-02-01 09:00:00')
      }
      ],
    })
  },
  routes() {
    this.namespace = 'api';

    this.get('/transactions', (schema, request) => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

