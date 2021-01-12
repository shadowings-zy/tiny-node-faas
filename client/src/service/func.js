import { http } from './axios'
import { cleanObject } from "../utils/objectUtils";

export const getFuncList = (req) => {
  const { author, namespace, id } = req
  return http
    .get("/func", {
      params: cleanObject({
        author,
        namespace,
        id,
      })
    })
}

export const addFunction = (req) => {
  const { author, namespace, func, options } = req
  return http
    .post("/func/add", cleanObject({
      func,
      options,
      namespace,
      author
    }))
}

export const updateFunction = (req) => {
  const { id, func, options } = req
  return http
    .put("/func/update", cleanObject({
      func,
      options,
      id
    }))
}