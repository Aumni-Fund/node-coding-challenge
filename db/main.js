const minifaker = require('minifaker');
require('minifaker/locales/en');
const fs = require('fs');
const fastcsv = require('fast-csv');
const db = require('./db');
const contains = require('validator/lib/contains');

// Create some fake data using the minifaker lib. Returns a template string to be inserted into a csv file as a single line
function createFunds() {
    const name = `${minifaker.lastName()}-${minifaker.lastName()} Ventures`;
    const content = minifaker.word();

    return `${name},${content}\n`;
}

// The insert statement
const insertFundsQuery =
'INSERT INTO funds (name, content) VALUES ($1, $2)';

function createCompanies() {
  const fundId = minifaker.number({ min:1, max: 30 });
  const name = `${minifaker.lastName()} ${minifaker.jobArea()} Inc.`;
  const logo = minifaker.imageUrlFromPlaceholder({ width: 200 });
  const cost = minifaker.number({ min: 1000000, max: 9999999 });
  const impliedValue = minifaker.number({ min: 10000000, max: 99999999 });
  const ownershipPercentage = impliedValue / cost / 100;
  const founded = new Date(minifaker.date({ from: new Date('2010-01-01')})).toISOString();

  return `${fundId},${name},${logo},${cost},${ownershipPercentage},${impliedValue},${founded}\n`;
}

const insertCompaniesQuery =
'INSERT INTO companies (fundId, name, logo, cost, ownershipPercentage, impliedValue, founded) VALUES ($1, $2, $3, $4, $5, $6, $7)';

// The path to write the csv file to
const fundsOutput = './funds.csv';
const companiesOutput = './companies.csv';

// Create a stream to write to the csv file
const fundsStream = fs.createWriteStream(fundsOutput);
const companiesStream = fs.createWriteStream(companiesOutput);

async function writeToCsvFile(create, stream, rows = 30) {
  // Iterate x number of times and write a new line to the csv file using the createFunds function
  for (let index = 0; index < rows; index++) {
      stream.write(create(), 'utf-8');
  }
  stream.end();
}

function insertFromCsv(query) {
  let csvData = [];
  return (
      fastcsv
          .parse()
          // validate that the column key doesn't contain any commas, as some countries do. This will break our insertion as it would be treated as an extra column and our table expects only 3 columns
          .validate((data) => !contains(data[0], ','))
          // triggered when a new record is parsed, we then add it to the data array
          .on('data', (data) => {
              csvData.push(data);
          })
          .on('data-invalid', (row, rowNumber) =>
              console.log(
                  `Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`
              )
          )
          // once parsing is finished and all the data is added to the array we can then insert it into the db table
          .on('end', () => {
              // Connect to the db instance
              db.connect((err, client, done) => {
                  if (err) throw err;
                  try {
                      // loop over the lines stored in the csv file
                      csvData.forEach((row) => {
                          // For each line we run the insert query with the row providing the column values
                          client.query(query, row, (err, res) => {
                              if (err) {
                                  // We can just console.log any errors
                                  console.log(err.stack);
                              } else {
                                  console.log('inserted ' + res.rowCount + ' row:', row);
                              }
                          });
                      });
                  } finally {
                      done();
                  }
              });
          })
  );
}

async function seed() {
  await writeToCsvFile(createFunds, fundsStream);
  let stream1 = fs.createReadStream(fundsOutput);
  stream1.pipe(insertFromCsv(insertFundsQuery));

  await writeToCsvFile(createCompanies, companiesStream, 300);
  let stream2 = fs.createReadStream(companiesOutput);
  stream2.pipe(insertFromCsv(insertCompaniesQuery));
}

seed();
