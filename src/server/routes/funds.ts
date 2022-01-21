import express, { Request, Response } from 'express';
import pool from '../../db/pool';
import { Fund, Company } from '../../types';

const app = express();

const getFunds = (): Promise<Fund[]> => pool.query('SELECT * from funds').then(results => results.rows);
const getFund = (id: number): Promise<Fund> =>
  pool.query(`SELECT * FROM funds WHERE id = ${id}`).then(results => results.rows[0]);
const getCompanies = (): Promise<Company[]> => pool.query('SELECT * from companies').then(results => results.rows);

const getAndConstructFundsWithCompanies = async () => {
  const allFunds = await getFunds();
  const allCompanies = await getCompanies();

  const constructedFunds = allFunds.map((fund: Fund) => {
    const fundPortCos = allCompanies.filter(company => company.fund_id === fund.id);
    return { ...fund, companies: fundPortCos };
  });
  return constructedFunds;
};

app.get('/', async (req: Request, res: Response) => {
  const constructedData = await getAndConstructFundsWithCompanies();
  res.json(constructedData);
});

app.get('/:id', async (req: Request, res: Response) => {
  const fund = await getFund(Number(req.params.id));
  const { minCost, maxCost } = req.query;
  const minCostNumber = Number(minCost);
  const maxCostNumber = Number(maxCost);

  const allCompanies = await getCompanies();
  const filteredCompanies = allCompanies.filter(company => {
    const companyCost = Number(company.cost);
    if (minCost && companyCost < minCostNumber) return false;
    if (maxCost && companyCost > maxCostNumber) return false;
    return true;
  });

  const constructedData = { ...fund, companies: filteredCompanies.filter((c: Company) => c.fund_id === fund.id) };
  res.json(constructedData);
});

app.get('/:id/:companyId', async (req: Request, res: Response) => {
  const fund = await getFund(Number(req.params.id));
  const allCompanies = await getCompanies();
  const constructedData = {
    ...fund,
    companies: allCompanies.find((c: Company) => c.fund_id === fund.id && c.id === Number(req.params.companyId)),
  };
  res.json(constructedData);
});

export default app;
