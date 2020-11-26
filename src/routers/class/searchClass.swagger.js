/**
 * @swagger
 * /class/search:
 *  get:
 *    description: Search for a class
 *    consumes:
 *       - application/json
 *    tags:
 *       - class
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: Auth token ( Bearer + " " + token )
 *         schema:
 *          type: string
 *         required: true
 *       - in: body
 *         name: class info
 *         description: to find a class
 *         schema:
 *          type: object
 *          required:
 *            - classId
 *          properties:
 *           classId:
 *            type: string
 *
 *    responses:
 *      '200':
 *        description: Found the class
 *        schema:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              classId:
 *                  type: string
 *              owner:
 *                  type: string
 *              image:
 *                  type: string
 *
 */