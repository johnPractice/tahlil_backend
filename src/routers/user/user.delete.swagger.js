//delete

/**
 * @swagger
 * /user/delete:
 *  delete:
 *    description: Used for user deletion
 *    consumes:
 *       - application/json
 *    parameters:
 *       - in: header
 *         name: Authorization
 *         description: token for check the auth
 *         schema:
 *          type: string
 *         required: true
 *
 *    responses:
 *      '200':
 *        description: user is deleted :)
 *      '503':
 *        description: Database error :)
 *        content:
            application/json:
              schema:
                type: object
                description: error
 *      '400':
 *        description: Error :)
 *        content:
            application/json:
              schema:
                type: object
                description: error
 */