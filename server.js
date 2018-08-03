const { ApolloServer, gql } = require('apollo-server');


const Arms = require('./data/arms');
const Back = require('./data/back');
const Calves = require('./data/calves');
const Chest = require('./data/chest');
const Legs = require('./data/legs');
const Shoulders = require('./data/shoulders');


const typeDefs = gql`
  type Category {
    id: Int
    name: String
  }

  type Equipe {
    id: Int
    name: String
  }

  type Muscle {
    id: Int
    name: String
    is_front: Boolean
  }

  type Workout {
    name: String
    category: Category
    description: String
    muscles:[Muscle]
    muscles_secondary:[Muscle]
    equipment:[Equipe]
  }

  type Query {
    arms: [Workout]
    back: [Workout]
    chest: [Workout]
    calves:[Workout]
    shoulders: [Workout]
    legs: [Workout]
    workoutByName(type:String!, name:String!):Workout
  }
`;

const resolvers = {
  Query: {
    arms: () => Arms,
    back: () => Back,
    chest: () => Chest,
    calves: () => Calves,
    shoulders: () => Shoulders,
    legs: () => Legs,
    workoutByName: (root, { type, name }) => {
      switch(type){
        case 'legs':
          return Legs.find(workout => workout.name === name);
        case 'arms':
          return Arms.find(workout => workout.name === name);
        case 'back':
          return Back.find(workout => workout.name === name);
        case 'chest':
          return Chest.find(workout => workout.name === name);
        case 'shoulders':
          return Shoulders.find(workout => workout.name === name);
        case 'calves':
          return Calves.find(workout => workout.name === name);
        default:
          return 'Nothing found!';
      }
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})
