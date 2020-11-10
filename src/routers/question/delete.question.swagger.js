/**
 * @swagger
 * /question:
 *  delete:
 *    description: edit question
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
 *       - in: body
 *         name: question info
 *         description: for delete  question
 *         schema:
 *          type: object
 *          required:
 *            - questionId 
 *          properties:
 *           questionId:
 *            type: string
 * 
 *    responses:
 *      '200':
 *        description: delete question 
 *      '400':
 *        description: Erro
 *        
 */