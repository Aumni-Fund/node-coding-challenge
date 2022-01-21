interface Fund {
  id: number;
  name: string;
  companies: Company[];
}

interface Company {
  id: number;
  name: string;
  logo: string;
  cost: number;
  ownershipPercentage: number;
  impliedValue: number;
  founded: string;
  fund_id: number;
}

export { Fund, Company };
