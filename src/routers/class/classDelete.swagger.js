/**
 * @swagger
 * /class/{classId}:
 *  delete:
 *    description: deletes a class
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
 *       - in: path
 *         name: classId
 *         description: to edit a class
 *         schema:
 *          type: string
 *         required: true
 *
 *    responses:
 *      '200':
 *        description: User deleted the class
 *      '400':
 *          description: error in classid or request body or something else!
 *          schema:
 *            type: object
 *            properties:
 *                error:
 *                    type: string
 *      '403':
 *          description: user is not the class owner
 *          schema:
 *            type: object
 *            properties:
 *                error:
 *                    type: string
 *
 */