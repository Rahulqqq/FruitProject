// Do Not Run this code. This is just for understanding.
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/fruitDB");

Creating fruitSchema

const fruitSchema = new mongoose.Schema({
  name   : String,
  rating  : Number,
  review : String

});

//collection name Fruit 
//creating Schema
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name   : "pineapple",
  rating : 8,
  review : "good fruit"
  
}

);
fruit.save();



// 1. Add another fruits to use insertMany.

const mango = new Fruit({
  name : "mango",
  rating: 10,
  review : "Awesome"
});

const apple = new Fruit({
  name : "apple",
  rating: 9,
  review : "Awesome"
});

insertMany Method
inserMany method -it take two paras, first array and second para will be callback and it allows us to log any errors

Fruit.insertMany([mango,apple], function(err){
  if(err){
    console.log(err)

  }else{
    console.log("Successfully saved all fruits to fruitDB")
  }
})



// 2. find Method
 finding fruit name :apple,mango

Fruit.find(function(err,fruits){
  if(err){
    console.log(err);

  }else{

    mongoose.connection.close();  //close the connection Once you have done. Instead of (ctrl + c)

    fruits.forEach(function(fruit){
      console.log(fruit.name);      //finding fruit name :apple,mango
    });
  }
});


creating another schema

const PersonSchema = new mongoose.Schema({
  name : String,
  age : Number
});

const Person = mongoose.model("Person", PersonSchema);

const Person = new Person({
  name: "john",
  age : 24
});
Person.save();



// 3. Data Validation

const fruitSchema = new mongoose.Schema({
  name : String,
  type : {
    type: Number,
    min :1,
    max : 10
  },
  review : String
});

const Fruit = mongoose.model("Fruit", fruitSchema)

const fruit = new Fruit({
  name : "kiwi",
  rating : 10,                        //rating 10 if rating will give extend to 10 it will gives you error
  review : "good fruit"
})

fruit.save();   // save 





// 4. Data validation Built-in validator  -- required

const fruitSchema = new mongoose.Schema({
  name : {
    type : String,
    required :  [true, "Please check your data entry no name specified!"]
  },
  type : Number,
  review : String
});

const Fruit = mongoose.model("Fruit", fruitSchema)

const fruit = new Fruit({
  name : "Apple",              // if there is no name you have return an error --validation errror
  rating : 10,                        
  review : "good fruit"
})

fruit.save();   // save 







// 5.  Establishing Relationships with mongoose


// Creating fruitSchema

const fruitSchema = new mongoose.Schema({
  name   : String,
  rating  : Number,
  review : String

});

const Fruit = mongoose.model("fruit", fruitSchema);

const mango = new Fruit({
  name : "mango",
  score : 7,
  review : "Awesome fruit"
});
mango.save();




const PersonSchema = new mongoose.Schema({
  name : String,
  age : Number,
  favouriteFruit : fruitSchema        //!important
});

const Person  = mongoose.model("Person",PersonSchema)


const person= new Person({
  name: "AMY",
  age : 13,
  favouriteFruit : mango              //! important
});
person.save();



Person.updateOne({name : "john"}, {favouriteFruit : mango }, function(err){
  if(err){
    console.log(err)

  }else{
    console.log("Successfully Updated Document");
  }
  
});
