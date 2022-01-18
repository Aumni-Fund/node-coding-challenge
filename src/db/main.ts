import minifaker from 'minifaker';
import 'minifaker/locales/en';
import { CsvParserStream, parse } from '@fast-csv/parse';
import { PoolClient } from 'pg';

import db from './db';

const createFunds = () => {
    const name = `${minifaker.lastName()}-${minifaker.lastName()} Ventures`;
    const content = minifaker.word();
    return `${name},${content}\n`;
};

const createCompanies = () => {
  const fundId = minifaker.number({ min:1, max: 30 });
  const name = `${minifaker.lastName()} ${minifaker.jobArea()} Inc.`;
  const logo = minifaker.imageUrlFromPlaceholder({ width: 200 });
  const cost = minifaker.number({ min: 1000000, max: 9999999 });
  const impliedValue = minifaker.number({ min: 10000000, max: 99999999 });
  const ownershipPercentage = impliedValue / cost / 100;
  const founded = new Date(minifaker.date({ from: new Date('2010/1/1')})).toISOString();

  return `${fundId},${name},${logo},${cost},${ownershipPercentage},${impliedValue},${founded}\n`;
}

interface FundRow {
  name: string;
  content: string;
}

const createWriteStream = (client: PoolClient, query: string) =>
  parse({ ignoreEmpty: true })
    .on('error', error => console.error(error))
    .on('data', row => {
      client.query(query, row, (err: Error, res: { rowCount: number; }) => {
          if (err) {
              console.log(err.stack);
          } else {
              console.log(`inserted ${  res.rowCount  } row:`, row);
          }
      });
    })
    .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

const insertFundsQuery =
'INSERT INTO funds (name, content) VALUES ($1, $2)';

const insertCompaniesQuery =
'INSERT INTO companies (fundId, name, logo, cost, ownershipPercentage, impliedValue, founded) VALUES ($1, $2, $3, $4, $5, $6, $7)';

const writeToStream = async (createContent: () => string, stream: CsvParserStream<FundRow, FundRow>, rows = 30) => {
  for (let index = 0; index < rows; index += 1) {
    stream.write(createContent());
  }
  stream.end();
};

db.connect(async (err, client, release) => {
  if (err) throw err;
  const fundsWriteStream = createWriteStream(client, insertFundsQuery);
  await writeToStream(createFunds, fundsWriteStream);

  const companiesWriteStream = createWriteStream(client, insertCompaniesQuery);
  await writeToStream(createCompanies, companiesWriteStream, 300);
  release();
});
