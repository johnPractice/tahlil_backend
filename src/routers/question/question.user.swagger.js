/**
 * @swagger
 * /question:
 *  get:
 *    description: get all users question with pagination
 *    consumes:
 *       - application/json
 *    tags: 
 *       - question
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
 *
 *    responses:
 *      '200':
 *        description: create new question
 *        schema:
 *          type: object
 *          properties:
 *              questions:
 *                  type: array
 *                  items:
 *                      type: object
 *              totalPages:
 *                  type: number
 *              currentPage:
 *                  type: number
 *        
 */