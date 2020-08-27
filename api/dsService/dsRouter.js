const express = require('express');
const router = express.Router();
const dsModel = require('./dsModel');
const authRequired = require('../middleware/authRequired');

/**
 * @swagger
 * /data/predict/{x1}/{x2}/{x3}:
 *  get:
 *    description: Get prediction for 3 inputs
 *    summary: Returns a prediction result
 *    security:
 *      - okta: []
 *    tags:
 *      - data
 *    parameters:
 *      - x1:
 *        name: x1
 *        in: path
 *        description: a positive number
 *        required: true
 *        example: 3.14
 *        schema:
 *          type: number
 *      - x2:
 *        name: x2
 *        in: path
 *        description: a number
 *        required: true
 *        example: -42
 *        schema:
 *          type: number
 *      - x3:
 *        name: x3
 *        in: path
 *        description: label for prediction
 *        required: true
 *        example: banjo
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: A predition result object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                prediction:
 *                  type: boolean
 *                  description: is prediction true or false
 *                probability:
 *                  type: number
 *                  description: the probability between 0 and 1
 *              example:
 *                prediction: true
 *                probability: 0.9479960541387882
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        description: 'Error making prediction'
 */
router.get('/predict/:x1/:x2/:x3', authRequired, function (req, res) {
  const x1 = String(req.params.x1);
  const x2 = String(req.params.x2);
  const x3 = String(req.params.x3);

  dsModel
    .getPrediction(x1, x2, x3)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

/**
 * @swagger
 * /data/viz/{state}:
 *  get:
 *    description: plotly vizualization data
 *    summary: Returns a plotly data
 *    security:
 *      - okta: []
 *    tags:
 *      - data
 *    parameters:
 *      - state:
 *        name: state
 *        in: path
 *        description: get viz data for state
 *        required: true
 *        example: UT
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: A plotly result object. See [DS service](https://ds-bw-test.herokuapp.com/#/default/viz_viz__statecode__get) for detailed docs.
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      500:
 *        description: 'Error making prediction'
 */
router.get('/viz/:state', authRequired, function (req, res) {
  const state = String(req.params.state);

  dsModel
    .getViz(state)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      // console.error(error);
      res.status(500).json(error);
    });
});

router.post('/moneyflow', function (req, res) {
  dsModel
    .getMoneyFlow(req.body.user_ID, req.body.time_period)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      // console.error(error);
      res.status(500).json(error);
    });
});

router.post('/spending', function (req, res) {
  dsModel
    .getSpending(req.body.user_ID, req.body.graph_type, req.body.time_period)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      // console.error(error);
      res.status(500).json(error);
    });
});

router.post('/future_budget', function (req, res) {
  dsModel
    .getFutureBudget(
      req.body.user_id,
      req.body.monthly_savings_goal,
      req.body.placeholder
    )
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      // console.error(error);
      res.status(500).json(error);
    });
});

router.get('/current_month_spending/:user_id', function (req, res) {
  // console.log('Params: ', req.params)
  dsModel
    .getCurrentMonthSpending(req.params.user_id)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      // console.error(error);
      res.status(500).json(error);
    });
});

module.exports = router;
