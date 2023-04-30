# Social_Network_API

![MIT license](https://img.shields.io/badge/license-MIT-blue)
## Description 

Complete e-commerce CRUD backend that inserts, updates and deletes data in a mysql database. This backend can be paired with a front-end to make a e-commerce website that sells a variety of products where the user can group products into categories and search and filter products based on associated tags.

## Table of Contents
* [installation](#installation)
* [Usage](#usage)
* [License](#license)

## Installation
To install necessary dependencies, run the following command:
```
npm i
```

## Usage
First clone the repo and from the command line CD into the directory. Once in the directory follow the [install instructions](#installation) and then follow the following steps:

### Steps

1. Once the database is made and seeded and the configuration is corrected you can then run ```npm start```
2. The end points are as follows:
    * Get all User **GET:** http://localhost:3001/api/users
    * Get a specific User **GET:** http://localhost:3001/api/users/:userId
    * Create a new User **POST:** http://localhost:3001/api/users
    * Delete a User **DELETE:** http://localhost:3001/api/users/:userId
    * Add a new Fried **POST:** http://localhost:3001/api/users/friends/:friendId
    * Delete a Friend **DELETE:** http://localhost:3001/api/users/:userId/friends/:friendId
    * Get all thoughts **GET:** http://localhost:3001/api/thoughts
    * Get a specific thoughts **GET:** http://localhost:3001/api/thoughts/:thoughtId
    * Create a new thoughts **POST:** http://localhost:3001/api/thoughts
    * Update a thoughts **PUT:** http://localhost:3001/api/thoughts/:thoughtId
    * Delete a thoughts **DELETE:** http://localhost:3001/api/thoughts/:thoughtId
    * Create a new reaction **POST:** http://localhost:3001/api/thoughts/:thoughtId/reactions
    * Delete a reaction **DELETE:** http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId

Please refer to this [video demonstration](https://drive.google.com/file/d/1mCv0J0bzG6JY3E1wjfK2wDLb_bCOEyoL/view?usp=sharing) for a full demo of the application

## License
This project is licensed under the MIT.
