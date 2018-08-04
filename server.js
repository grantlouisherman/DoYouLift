const { ApolloServer, gql } = require('apollo-server');


const Arms = require('./data/arms');
const Back = require('./data/back');
const Calves = require('./data/calves');
const Chest = require('./data/chest');
const Legs = require('./data/legs');
const Shoulders = require('./data/shoulders');

const workoutLookUpTable = {
  'arms':Arms,
  'legs':Legs,
  'chest': Chest,
  'back':Back,
  'shoulders':Shoulders,
  'calves': Calves
}
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
      return workoutLookUpTable[type] &&
      workoutLookUpTable[type].find(workout => workout.name === name);
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})
