import minifaker from 'minifaker';
import 'minifaker/locales/en';
import { CsvParserStream, parse, Row } from '@fast-csv/parse';
import { PoolClient } from 'pg';

import pool from './pool';

minifaker.setSeed('dev');

const createFunds = () => `${minifaker.lastName()}-${minifaker.lastName()} Ventures\n`;

const createCompanies = () => {
  const fundId = minifaker.number({ min: 1, max: 30 });
  const name = `${minifaker.lastName()} ${minifaker.jobArea()} ${minifaker.jobType()}s`;
  const logo = minifaker.imageUrlFromPlaceholder({ width: 200 });
  const cost = minifaker.number({ min: 1000000, max: 9999999 });
  const impliedValue = minifaker.number({ min: 10000000, max: 99999999 });
  const ownershipPercentage = impliedValue / cost / 100;
  const founded = new Date(minifaker.date({ from: new Date('2010/1/1') })).toISOString();

  return `${fundId},${name},${logo},${cost},${ownershipPercentage},${impliedValue},${founded}\n`;
};

const createWriteStream = (client: PoolClient, query: string) =>
  parse({ ignoreEmpty: true })
    .on('error', error => console.error(error))
    .on('data', row => {
      client.query(query, row, (err: Error) => {
        if (err) throw err;
      });
    })
    .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

const insertFundsQuery = 'INSERT INTO funds (name) VALUES ($1)';

const insertCompaniesQuery =
  'INSERT INTO companies (fund_id, name, logo, cost, ownership_percentage, implied_value, founded) VALUES ($1, $2, $3, $4, $5, $6, $7)';

const writeToStream = async (createContent: () => string, stream: CsvParserStream<Row, Row>, rows = 30) => {
  for (let i = 0; i < rows; i += 1) {
    stream.write(createContent());
  }
  stream.end();
};

pool
  .connect()
  .then(client => {
    const fundsWriteStream = createWriteStream(client, insertFundsQuery);
    writeToStream(createFunds, fundsWriteStream);

    const companiesWriteStream = createWriteStream(client, insertCompaniesQuery);
    writeToStream(createCompanies, companiesWriteStream, 300);
    client.release();
  })
  .catch(err => {
    if (err) throw err;
  });
