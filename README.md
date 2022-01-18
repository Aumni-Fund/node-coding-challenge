<img src="https://aumni-public.s3.amazonaws.com/AumniLogoColor.png" alt="Aumni Logo" width="200" height="55">

# Node.js Coding Challenge

The purpose of this coding challenge is to gauge knowledge in Node.js and TypeScript. In the coding challenge, you will build a Node.js api interface that an end user can consume to get a small subset of Aumni data. Below you will find some helpful terminology to help you understand what these domain-specific terms mean.

## Terminology

- **Fund** - A Fund is a type of [Investment Vehicle](https://www.investopedia.com/terms/i/investmentvehicle.asp) that invests the money that it has raised into various **Companies**.
- **Company** - A Company that a **Fund** invests in. Traditionally called a Portfolio Company from the perspective of the **Fund**. This is typically a start-up company that is trying to raise money.

## Setup/Notes

1. Clone/Download this repository. We have seeded some data for you in the database.

2. Checkout branch and name it after yourself.

3. Make your first commit by filling out the `code-challenge-notes.md` file in the root of this directory.

4. Once you have made your first commit you will have 72 hours to make your final commit to complete the code challenge.

5. Please do **NOT** push your code challenge solution to a public repository.

6. This is a backend coding challenge. Please do **NOT** spend your time building out any kind of frontend UI.

7. You are allowed to install and use third-party packages.

## Getting Started

1. Run `yarn` to install dependencies.

2. Run `yarn start` to seed the database and start the server. The default URL and Port is `http://localhost:3000`.

## Goals

- [ ] Build out 4 endpoints.
- [ ] `/funds/` - Will return all funds and companies data
- [ ] `/funds/:id` - Will return a specific fund
- [ ] `/funds/:id/:companyId` - Will return a specific fund and company data
- [ ] `/funds/:id/?minCost=100&maxCost=100000` - Filter the fund data

### Example of an Endpoint Schema Structure

For an endpoint like `/funds/1/33`, you would return a response:

```json
{
  "id": 1,
  "name": "Hodkiewicz-Veum Ventures",
  "companies": [
    {
      "id": 62,
      "name": "Hauck Infrastructure Inc.",
      "logo": "https://via.placeholder.com/200",
      "cost": 9638817,
      "ownershipPercentage": 0.06402042802555542,
      "impliedValue": 61708119,
      "founded": "2012-10-28"
    }
  ]
}
```

## Stretch Goals

- [ ] Setup and implement authentication with your endpoints
- [ ] Logging
- [ ] Expand the data set
- [ ] Additional comprehensive filters

## Acceptance Criteria

- [ ] You have filled out the _required_ parts of the `code-challenge-notes.md` and made your first commit.
- [ ] The code is well organized.
- [ ] The code follows Node.js/TypeScript best practices.
- [ ] Your Git commit history is clean and meaningful.

## Submission

1. When you have your final commit complete. Push up your branch back up to the repository.
2. We will review it and contact you shortly with the next steps.
