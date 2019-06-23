Foster Dog Matchmaker - Backend

Getting Started:

Fork this repository and clone locally
Install dependencies with "npm install" or "npm i"
Start server with "npm start"
Run tests with "npm test"

Description:

This app is in charge of
1) Gathering foster dog data using the PetFinder API v2
2) Assigning each dog a score grid based on dog and breed info scraped from American Kennel Club
3) Faciliting POST requests from the front end. Front end will send quiz results from a user
and back end will respond with an array of dogs that best match the lifestyle of the quiz taker

Details of file structure:

2 main folders - server and test. Server folder houses all app files and test folder houses all tests for those app files.

Server folder has 3 subfolders - database, logic, and routers.

Database folder houses models and connection information.
Logic folder houses all dog matchmaking functionality.
Routers folder houses all server routing information.
server.js file is the main entrypoint, and the file that is invoked to run the server.

Matchmaking Logic:

There are two main entities in charge of handling the quiz taker to dog matchmaking. They are the MatchScorrer and the MatchMaker. The MatchScorrer is used as soon as a new dog record is created in the database. The MatchScorrer looks at attributes about the dog provided by the rescue and attributes about the breed scraped from the American Kennel Club website. The output of the MatchScorrer is an object with 6 keys, each of which is an array of values that correspond to the quiz results from the front end. 

Score Grid example:

"scoreGrid": {
            "housing": [
                6,
                6,
                2
            ],
            "kidsPets": [
                3,
                3,
                3,
                3
            ],
            "lifestyleActivity": [
                0,
                2,
                6
            ],
            "age": [
                6,
                0,
                0
            ],
            "size": [
                2,
                6,
                2
            ],
            "timeCommitment": [
                0,
                0,
                6
            ]
        }

Tech Specs:

Express.js server
MongoDB, mongoose.js ODM
PetFinder API v2
