const argv = require('yargs');
const accounts = require('./account');
const transaction = require('./transaction');

// Set up command-line interface
argv
  .scriptName('kit')
  .usage('$0 <cmd> [args]')
  .command('get-account', 'Get account if it exists', {}, accounts.getAccount)
  .command('create-account', 'Create a new account', {}, accounts.createAccount)
  .command('get-balances','Get token balances for account',{},transaction.getBalances)
  .command(
    'send-payment',
    'Send a payment to an address',
    yargs => {
      return yargs
        .option('to', {
          describe: 'Recipient address',
          demand: true,
        })
        .option('amount', {
          alias: 'a',
          describe: 'Amount to send',
          demand: true,
        })
        .option('token', {
          alias: 't',
          describe: 'Token to send (cUSD or cGLD)',
          demand: true,
        });
    },
    transaction.sendPayment
  )
  .help()
  .demandCommand().argv;
