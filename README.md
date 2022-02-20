HBS - BattleTech - by: Chad Gooch

made for Eleven Fifty Red Badge final project

This web application is created as a companion to the game Battletech published by Hairbrained Schemes.  It is also a test in data density stored at a database.

Instead of creating a new column in the database for each individual piece of data, it uses variable and fixed length arrays to increase density saving network bandwidth as well as database size. 

The data is saved in 3 tables.

The user table contains the "collection" which is a variable length array that contains the primary keys of the Mech Table.  It also contains 4 Mech arrays.  Each of the mech arrays are 55 values long with a meaning based on its location.
index: 0        primary key from the Mech database.(indicating selected mech)
index: 1-49     primary key from the Wpn database.(indicating equipment at location on mech)
index: 50-54    calculated values based on the equipment in index 1-49(calculated based on values from Wpn database of the primary keys)

The Mech table contains several locations, each location is an array with 4 datapoints.
index: 0        number of items from the Wpn array with a "type" of "ballistic" allowed at that location on the mech.
index: 1        number of items from the Wpn array with a "type" of "energy" allowed at that location on the mech.
index: 2        number of items from the Wpn array with a "type" of "missile" allowed at that location on the mech.
index: 3        number of items from the Wpn array with a "type" of "support" allowed at that location on the mech.



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
