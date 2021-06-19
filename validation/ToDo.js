const { Joi, Segments } = require('celebrate')

exports.toDoSchema = {
    [Segments.BODY]: Joi.object().keys({
        taskname: Joi.string().required()
    })
}

exports.toDoSchemaApi = {
    [Segments.BODY]: Joi.object().keys({
        oldname: Joi.string().required(),
        newname: Joi.string().required(),
    })
}