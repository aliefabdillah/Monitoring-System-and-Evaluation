# API Monitoring & Evaluation System

## Setup

```
cp .env.example .env //create .env file
npm install
```

## Migrate Database
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

## Lint

```
npm run lint
```

## Test

```
npm test
```

## Development

```
npm run dev
```
