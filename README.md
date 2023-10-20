
# Hello movies

### Installation

```
git clone git@github.com:aram1l7/hellomovies.git

nvm use

Frontend:
cd frontend
yarn install
yarn start

Backend:
cd backend
yarn install 
npx prisma generate
npx prisma migrate dev (Run existing migrations)
npx prisma db seed (Run seeders)

yarn dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Backend

`DATABASE_URL=postgresql://user:password@localhost:5432/dbname`

### Frontend

`REACT_APP_API_HOST=http://localhost:4000/api`


### Testing
`npx cypress open`