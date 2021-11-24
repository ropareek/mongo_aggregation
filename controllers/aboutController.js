const { Mongoose } = require("mongoose");
const Logs = require("../models/logData");
const { post } = require("../route/aboutRoute");

exports.postAbout = async (req, res, next) => {
  const data = ({
    _id,
    website,
    url,
    user_id,
    ip_address,
    country,
    state,
    city,
    pincode,
    referrer,
    timestamp,
  } = { ...req.body });
  console.log(
    data,
    "---------------------------------fetched from request body----------------------------------------------"
  );

  try {
    // check if id already exists
    const isDuplicate = await Logs.findOne({ _id });
    if (isDuplicate)
      return res
        .status(404)
        .json({ msg: "_id already exists can not be same" });
    // use schema to make new document, then enter the timestamp
    const postData = await new Logs({ ...data });
    postData.timestamp = Math.floor(new Date().getTime() / 1000.0);

    // save the document using mongoose save() method
    postData.save();
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};

exports.getAbout = async (req, res, next) => {
  const { from, to, groupBy } = req.query;
  console.log(`from: ${from}, to: ${to}, groupBy:${groupBy}`);

  try {
    // groupBy visit
    if (groupBy == "visit") {
      let docsVisit = await Logs.find({});
    }

    // groupBy location
    else if (groupBy == "location") {
      const location1 = await Logs.aggregate([
        // 1) group----------------------------
        {
          $group: {
            _id: {
              country: {
                countries: "$country",
                state: {
                  states: "$state",
                  city: {
                    cities: "$city",
                    pincode: {
                      pincodes: "$pincode",
                    },
                  },
                },
              },
              id: {
                id: "$_id",
              },
            },
          }, //group brace closing
        },

        // 2) $group----------------------------------------------
        {
          $group: {
            _id: "$_id.country",
            idArray: {
              $push: {
                idInsidePush: "$_id.id.id",
              },
            },
          },
        },

        //3) $project---------------------------------------------------
        // {
        //   $project: {
        //     countries: {
        //       country: "$_id.countries",
        //       states: {
        //         state: "$_id.state.states",
        //         cities: {
        //           city: "$city",
        //           pincodes: {
        //             pincode: "$pincode",
        //             id: {
        //               id: "$_id",
        //             },
        //           },
        //         },
        //       },
        //     },
        //   },
        // },
      ]);

      console.log(location1);
      res.status(200).send(location1);
    }

    // groupBy browser
    else if (groupBy == "browser") {
    }
  } catch (err) {
    console.error(err);
  }
};
