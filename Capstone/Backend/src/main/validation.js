import Joi from 'joi'

export const featureQuerySchema = Joi.object({
  entityId: Joi.string().required(),
  set: Joi.string().required(),
  as_of: Joi.string().isoDate().optional()
})

export const batchQuerySchema = Joi.object({
  entityIds: Joi.string().required(),
  set: Joi.string().required()
})
