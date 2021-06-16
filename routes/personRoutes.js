const router = require("express").Router();
const Person = require("../models/person");
const { personValidation } = require("../utils/Validation");

const errorMessage = (error, res) => {
  if (error.code === 11000) {
    res
      .status(406)
      .send(`Person with the same identity already exist! (${error.message})`);
  } else if (error.message) {
    res.status(401).send(error.message);
  } else {
    res.status(401).send("error: Unable to add a person!");
  }
  console.log(error);
};

//add person
router.post("/add", personValidation, async (req, res) => {
  const person = new Person(req.body);
  person
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      errorMessage(error, res);
    });
});

//add people
router.post("/addAll", async (req, res) => {
  //this will create multiple documents for all people

  const people = JSON.parse(req.body.people);
  Person.insertMany(people)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      errorMessage(error, res);
    });
});

//get person
router.get("/get/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(401).send("error: Unable to get a person!");
      console.log(error);
    });
});

//get all person
router.get("/getAll", (req, res) => {
  Person.find()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(401).send("error: Unable to get all people!");
      console.log(error);
    });
});

//update a person
router.patch("/update/:id", async (req, res) => {
  Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      errorMessage(error, res);
    });
});

//delete a person
router.delete("/delete/:id", async (req, res) => {
  const personExists = await person.findOne({ _id: req.params.id });
  if (!personExists) return res.status(406).send("person no longer exist!");

  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.send("person deleted!");
    })
    .catch((error) => {
      res.status(401).send("error: Unable to delete person!");
      console.log(error);
    });
});

module.exports = router;
