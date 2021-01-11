import axios from 'axios'
import { cleanObject } from "../utils/objectUtils";

export const getFuncList = (req) => {
  const { author, namespace, id } = req
  return axios
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
  return axios
    .post("/func/add", cleanObject({
      func,
      options,
      namespace,
      author
    }))
}

export const updateFunction = (req) => {
  const { id, func, options } = req
  return axios
    .put("/func/update", cleanObject({
      func,
      options,
      id
    }))
}