const {check, validationResult } = require('express-validator');

const validator = () => {

  return [
    [
      check('year').isInt(),
      check('month').isInt(),
      check('base_price').isInt(),
      check('high_diff').custom((value) => {
        return value && value.hasOwnProperty('from') && value.hasOwnProperty('to')
      }),
      check('mid_diff').custom((value) => {
        return value && value.hasOwnProperty('from') && value.hasOwnProperty('to')
      }),
      check('low_diff').custom((value) => {
        return value && value.hasOwnProperty('from') && value.hasOwnProperty('to')
      }),
      check('no_of_pos').isInt(),
      check('no_of_providers').isInt(),
      check('no_of_rates').isInt(),
      check('no_of_los').isInt()
    ],
    (req,res,next)=> {
      const result = validationResult(req);
      if (!result.isEmpty()){
        return res.status(400).json({
          errors: {
            description: result.errors,
          },
        });
      }
      next()
    }
  ]

};


const losOptions = [
  1,2,3,5,10,15,20,30
];

const mealOptions = [
  'NONE',
  'BREAKFAST',
  'HALF',
  'FULL'
];

const prices = [
  'low',
  'mid',
  'high'
];

const posOptions = [
  'US',
  'EU',
  'IL',
  'RUS',
  'UK'
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generatePrice = (price, diff_price) => {
    return price / 100 * (100 + getRandomInt(diff_price.from, diff_price.to));
  }



const controller = async (req, res, next) => {
  const {body: {
    year, month, base_price, high_diff, mid_diff, low_diff, no_of_pos, no_of_providers, no_of_rates, no_of_los
  }} = req;

  let documents = new Array(no_of_providers * prices.length * no_of_los).fill(undefined);

  let poss = posOptions.slice(0, no_of_pos);

  let ids = [];

  for (let i = 0; i < prices.length ; i++) {
    for (let j = 0; j < no_of_providers; j++) {
      for (let y = 0; y < no_of_los; y++) {
        ids.push({
          compset: i,
          provider: j,
          los: y
        })
      }

    }
  }

  const numberOfDays = new Date(year, month, 0).getDate();
  const daysArray = new Array(numberOfDays).fill(undefined);
  let checkin_dates = []

  for (let i = 0; i<documents.length; i++) {

      let priceFn;

      if (i < documents.length / 3) {
        priceFn = () => generatePrice(base_price, low_diff )
      } else if (i < (documents.length / 3) * 2) {
        priceFn = () => generatePrice(base_price, mid_diff )
      } else  {
        priceFn = () => generatePrice(base_price, high_diff )
      }

      checkin_dates[i] = daysArray.map((val, j) => {

        let customer_rates = [];
        let competitors_rates = [];

        for (let x = 0; x<no_of_rates; x++) {

          const meal_plan = mealOptions[Math.floor(Math.random() * mealOptions.length)];
          const available = [true, false][Math.floor(Math.random()*2)];
          const free_cancelation = [true, false][Math.floor(Math.random()*2)];

          customer_rates.push(
            {
              room_rate_name_id : x,
              free_cancelation,
              meal_plan,
              available,
              price : priceFn(),
            }
          );
          competitors_rates.push({
            room_rate_name_id : x,
            free_cancelation,
            meal_plan,
            available,
            price : priceFn(),
          })
        }

        const pos = poss[Math.floor(Math.random()*poss.length)];

          return {
            day: j,
            currency: 'USD',
            room_types: {
              customer_rates,
              competitors_rates,
              pos
            },
          }
      })
  }



  let documents2 =  documents.map((value, i) => {
    return {
      year,
      month,
      compset_id: ids[i].compset,
      provider_id: ids[i].provider,
      los: losOptions[ids[i].los],
      checkin_dates: checkin_dates[i]
    }
  })

  return res.status(200).json(documents2)
}


module.exports = {
  validator,
  controller
};
