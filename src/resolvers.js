let users = [
  { id: 1, name: "Jake", email: "jake@gmail.com", age: 17 },
  { id: 2, name: "Paul", email: "paul@gmail.com", age: 20 },
];

const messageHello = "Hello !";

const resolvers = {
  Query: {
    hello: (parent, args, context, info) => messageHello,
    users: () => users, // query{users{id, name, email, age}}
    user: (parent, { id }) => users.find((user) => user.id == id), //same
  },
  Mutation: {
    createUser: (parent, { id, name, email, age }) => {
      let checkID = users.findIndex((user) => user.id == id);
      if (checkID == -1) {
        let newUser = { id, name, email, age };
        users.push(newUser);
        return newUser;
      } else {
        throw new Error("ID aleady taken");
      }
    },
    deleteUser: (parent, { id }) => {
      let checkID = users.findIndex((user) => user.id == id);
      if (checkID != -1) {
        users.splice(checkID, 1);
        return true;
      } else {
        throw new Error("Unknown ID");
      }
    },
  },
};

export default resolvers;

//parent : type d'objet précédent
//args : paramêtres
//context : list d'objet
//info : infos sur la requete

/*
query {
  hello 
}

query {
  users {
    id
    name
    email
    age
  }
}

query {
  user(id:1) {
    id
    name
    email
    age
  }
}

mutation {
  deleteUser(id: 2)
}


mutation {
  createUser(id: 3, name: "Paul", email: "paul@gmail.com", age: 20) {
    name
    email
    age
  }
}*/
