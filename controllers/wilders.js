const WilderModel = require("../models/Wilder");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  city: Joi.string().required(),

  skills: {
    title: Joi.string().required(),
    votes: Joi.number().required(),
  },
});

const createWilder = async (req, res) => {
  const value = await schema.validateAsync({
    name: req.body.name,
    city: req.body.city,
    skills: {
      title: req.body.skills.title,
      votes: req.body.skills.votes,
    },
  });
  try {
    const newWilder = new WilderModel({
      name: value.name,
      city: value.city,
      skills: { title: value.title, votes: value.votes },
    });
    newWilder.save().then((result) => {
      res.send({ success: true, result: newWilder });
    });
  } catch (err) {
    res.send({ success: false, result: err });
  }
};

const getWilders = async (req, res) => {
  try {
    await WilderModel.find({}).then((result) => {
      res.send({ success: true, result: result });
    });
  } catch (err) {
    res.send({ success: false, result: err });
  }
};

const getWilderById = async (req, res) => {
  try {
    await WilderModel.findById(req.params._id).then((wilder) => {
      if (!wilder) {
        return res.status(404).send({
          success: false,
          result: "There is no Wilder with the given ID",
        });
      }

      res.send({
        success: true,
        result: wilder,
      });
    });
  } catch (err) {
    res.send({ success: false, result: err });
  }
};

const updateWilder = async (req, res) => {
  try {
    await WilderModel.updateOne({ name: req.body.name }, req.body).then(
      (wilder) => {
        if (!wilder)
          res.send({
            success: false,
            result: "There is no Wilder with that name",
          });

        res.send({
          success: true,
          result: wilder,
        });
      }
    );
  } catch (err) {
    res.send({ success: false, result: err });
  }
};

const deleteWilder = async (req, res) => {
  try {
    await WilderModel.deleteOne({ name: req.body.name }).then((result) => {
      res.send({ success: true, result: result });
    });
  } catch (err) {
    res.send({ success: false, result: err });
  }
};

module.exports = {
  createWilder,
  getWilders,
  getWilderById,
  updateWilder,
  deleteWilder,
};
