/**
 * @swagger
 * /question:
 *  put:
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
 *         description: for edit question
 *         schema:
 *          type: object
 *          required:
 *            - questionId 
 *          properties:
 *           type:
 *            type: string
 *            enum: ['TEST', 'MULTICHOISE', 'LONGANSWER', 'SHORTANSWER']
 *           public:
 *            type: boolean
 *           question:
 *            type: string
 *           answers:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                  answer:
 *                      type:
 *                         - string(LONG & SHORT ANSWER)
 *                         - number(TEST & MULTICHOISE)
 *           options:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                  option:
 *                      type: string
 *           base:
 *            type: string
 *            enum: ['10', '11', '12']
 *           hardness:
 *            type: string
 *            enum: ['LOW', 'MEDIUM', 'HARD']
 *           course:
 *            type: string
 *            enum: ['MATH', 'PHYSIC', 'CHEMISTRY', 'BIOLOGY']
 *           chapter:
 *              type: string
 *              enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
 *
 *    responses:
 *      '200':
 *        description: edited question
 *      '400':
 *        description: Error
 *        
 */