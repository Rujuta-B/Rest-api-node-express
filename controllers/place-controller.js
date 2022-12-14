const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-errors");
const { validationResult } = require("express-validator");
// const getCoordsForAddress = require("../utils/location");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "eiffel tower",
    description:
      "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    location: {
      lat: "48.8583701",
      long: "2.2922926,",
    },
    address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris, France",
    creator: "u1",
  },
  {
    id: "p2",
    title: "Qutub Minar",
    description:
      "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    location: {
      lat: "48.8583701",
      long: "2.2922926,",
    },
    address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris, France",
    creator: "u1",
  },
  {
    id: "p3",
    title: "Taj Mahal",
    description:
      "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
    location: {
      lat: "48.8583701",
      long: "2.2922926,",
    },
    address: "Champ de Mars, 5 Av. Anatole France, 75007 Paris, France",
    creator: "u2",
  },
];

const placeIdController = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId; //this will return true or false
  });
  if (!place) {
    throw new HttpError("could not find a place for the provided id", 404);
  }
  res.json({ place });
};

const userIdController = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId; //this will return true or false
  });

  if (!places || places.length === 0) {
    return next(
      new HttpError("could not find a place for the provided id", 404)
    );
  }

  res.json({ place: places });
};

const createPlaceController = async (req, res, next) => {
  // const errors = validationResult(req);
  // console.log(errors);
  // if (!errors.isEmpty()) {
  //   next(new HttpError("Invalid input passed, please check your data", 422));
  // }

  const { title, description, coordinates, address, creator } = req.body;

  // let coordinates;
  // try {
  //   coordinates = await getCoordsForAddress(address);
  // } catch (error) {
  //   return next(error);
  // }

  const createdPlaced = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  DUMMY_PLACES.push(createdPlaced);

  res.status(201).json({ place: createdPlaced });
};

const updatePlaceController = (req, res, next) => {
  const errors = validationResult(req);
  // console.log(errors);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input passed, please check your data", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlaceController = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("couldnt find place for this id", 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId); //will select all places who's id is not equal to the requsted id from params
  res.status(200).json({ message: "Place deleted!" });
};

exports.userIdController = userIdController;
exports.placeIdController = placeIdController;
exports.createPlaceController = createPlaceController;
exports.updatePlaceController = updatePlaceController;
exports.deletePlaceController = deletePlaceController;
