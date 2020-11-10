/**
 * @swagger
 * /bank:
 *  post:
 *    description: get question from bank
 *    consumes:
 *       - application/json
 *    tags: 
 *       - bank
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: Auth token ( Bearer + " " + token )
 *         schema:
 *          type: string
 *         required: true
 *       - in: query
 *         name: page
 *         schema:
 *          type: string
 *       - in: query
 *         name: limit
 *         schema:
 *          type: string
 *       - in: body
 *         name: searchBank
 *         schema:
 *          type: object
 *          properties:
 *           type:
 *            type: array
 *            items:
 *             type: string
 *           course:
 *            type: array
 *            items:
 *             type: string
 *           hardness:
 *            type: array
 *            items:
 *             type: string
 *           base:
 *            type: array
 *            items:
 *             type: string
 *    responses:
 *      '200':
 *        description: User joined the class
 *        schema:
 *          type: object
 *          properties:
 *              questions:
 *                  type: object
 *        
 */