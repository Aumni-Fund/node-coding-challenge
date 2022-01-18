<img src="https://aumni-public.s3.amazonaws.com/AumniLogoColor.png" alt="Aumni Logo" width="200" height="55">

# NodeJs Coding Challenge

The purpose of this coding challenge is to gauge knowledge in NodeJs and JavaScript. In the coding challenge, you will build a NodeJs api interface that an end user can consume to get a small subset of Aumni data. Below you will find some helpful terminology to help you understand what these domain-specific terms mean.

## Terminology

- **Fund** - A Fund is a type of [Investment Vehicle](https://www.investopedia.com/terms/i/investmentvehicle.asp) that invests the money that it has raised into various **Companies**.
- **Company** - A Company that a **Fund** invests in. Traditionally called a Portfolio Company from the perspective of the **Fund**. This is typically a start-up company that is trying to raise money.

## Setup/Notes

1. Clone/Download this repository. We have seeded some data for you in the database.

2. Make your first commit by filling out the `code-challenge-notes.md` file in the root of this directory.

3. Once you have made your first commit you will have 72 hours to make your final commit to complete the code challenge.

4. Please do **NOT** push your code challenge solution to a public repository.

5. This is a backend coding challenge. Please do **NOT** spend your time building out any kind of frontend UI.

6. You are allowed to install and use third-party packages.

## Getting Started

1. Run `yarn` to install dependencies.

2. Run `yarn start` to start the server. The default URL and Port is `http://localhost:3000`.

## Goals

- [ ] Build out 4 endpoints.
- [ ] `/funds/` - Will return all funds and companies data
- [ ] `/funds/:id` - Will return a specific fund
- [ ] `/funds/:id/:companyId` - Will return a specific fund and company data
- [ ] `/funds/:id/?minCost=100&maxCost=100000` - Filter the fund data

## Stretch Goals

- [ ] Setup and implement authentication with your endpoints
- [ ] Logging
- [ ] Expand the data set
- [ ] Better/more comprehensive filters

## Acceptance Criteria

- [ ] You have filled out the _required_ parts of the `code-challenge-notes.md` and made your first commit.
- [ ] The code is well organized.
- [ ] The code follows NodeJs/JavaScript best practices.
- [ ] Your Git commit history is clean and meaningful.

## Submission

1. ????
