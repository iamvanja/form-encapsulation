import * as yup from 'yup'
import pick from 'lodash/pick'

export const createObjectSchema = obj => yup.object().shape(obj)

export const createPartialObjectSchema = (obj = {}, paths = []) => (
  createObjectSchema(pick(obj, paths))
)

export const createLazySchema = (...args) => yup.lazy(...args)
