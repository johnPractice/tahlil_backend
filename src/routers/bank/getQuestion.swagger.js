/**
 * @swagger
 * /bank:
 *  get:
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
 *         name: limit
 *         schema:
 *          type: string
 *       - in: query
 *         name: page
 *         schema:
 *          type: string
 *          required: true
 *       - in: query
 *         name: TEST
 *         schema:
 *          type: string
 *          required: true
 *       - in: query
 *         name: MULTICHOISE
 *         schema:
 *          type: string
 *          required: true
 *       - in: query
 *         name: LONGANSWER
 *         schema:
 *          type: string
 *          required: true
 *       - in: query
 *         name: SHORTANSWER
 *         schema:
 *          type: string
 *          required: true
 *       - in: query
 *         name: MATH
 *         schema:
 *          type: string
 *          required: true
 *       - in: query
 *         name: PHYSIC
 *         schema:
 *          type: string
 *          required: true
 *       - in: query
 *         name: CHEMISTRY
 *         schema:
 *          type: string
 *          required: true
 *       - in: query
 *         name: LOW
 *         schema:
 *          type: string
 *          required: true
 *       - in: query
 *         name: MEDIUM
 *         schema:
 *          type: string
 *          required: true
 *       - in: query
 *         name: HARD
 *         schema:
 *          type: string
 *          required: true
 *       - in: query
 *         name: 10
 *         schema:
 *          type: string
 *          required: true
 *       - in: query
 *         name: 11
 *         schema:
 *          type: string
 *          required: true
 *       - in: query
 *         name: 12
 *         schema:
 *          type: string
 *          required: true
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