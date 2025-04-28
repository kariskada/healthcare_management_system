#frontend stacks
#clerk as the auth
#nextjs as the framework
#nodejs as the package
#shadcn/ui as the component library 90% of my library components come from shadcn/ui
#recharts for chart library on react components

#backend stack

#postgress sql
#postgreSQL
#prisma as the database
#neon as the database hosting service
#prisma as the ORM
#prisma as the database client
#prisma as the database migration tool
#prisma as the database seeder
#prisma as the database schema generator
#prisma as the database client generator
#faker as the data generator

#installing prisma
<!-- npm install prisma
npx prisma init -->

#backend console-im not using prisma database  postgress console because of the vm  
<!-- neon console -->

#migrating prisma from the data model to the data schema
<!-- npx prisma migrate dev --name init -->

#to commit your datamodel to the data schema
<!-- npx prisma migrate dev -->

#running prisma on local host
<!-- npx prisma studio -->

#added prisma package.json to the project
<!-- 
  "prisma":{
    "seed": "node prisma/seed.ts"

  }, -->

#for testing of the database and the data model i used 
#faker library to generate fake data for the database
<!-- #npm install faker --save-dev-- -->

#to run the fake database model 
#to execute the seed after changing in the db 
<!-- npx prisma db seed -->

#date functions
##date functions are used to format the date and time in the database
#date-fns gives you lightweight, functional utilities for working with dates in JavaScrip
<!-- npm i date -fns -->

renamed and redited the imported file to the new file name
from appointment-actions to appointment-action-options.tsx


installed popover component from shadcn/ui
npx shadcn@latest add popover


installed react icons using
npm i react-icons


regenerating database schema and data model
npx prisma generate
npx prisma db push
