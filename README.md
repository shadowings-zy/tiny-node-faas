# tiny-node-faas

Tiny node faas is a light-weight faas project coding by nodejs.
By using tiny-node-faas, you can focus on handling your http request, without worrying about the http server.

NOW THE API OF TINY-NODE-FAAS FINISHED.
BUT THE PROJECT IS NOT FINISHED!
THE FRONT END PAGE OF TINY-NODE-FAAS IS STILL DEVELOPING.

## Add function

request:
```
METHOD: POST 
PATH: /func/add
BODY: {
  namespace: string, // namespace of the function
  author: string, // author of the function
  func: string, // your function is here
  options?: FunctionOptions, // the options of the function, if you don't add this parameter, we will use default options
}
```

response:
```
{
  status: number, // status code, 0 is OK, 1 is ERROR
  message: string, // message of the result
  data: {
    id: string, // the id of the function
  }
}
```

## Update function

request:
```
METHOD: PUT
PATH: /func/update
BODY: {
  id: string, // the id of the function
  func: string, // your new function
  options?: FunctionOptions, // your new options of the function, if you don't add this parameter, we will use origin options
}
```

response:
```
{
  status: number, // status code, 0 is OK, 1 is ERROR
  message: string, // message of the result
}
```

## Get function

request:
```
METHOD: GET 
PATH: /func
PARAM: {
  namespace?: string, // namespace of the function. You can get all function in target namespace by adding this parameter 
  author?: string, // author of the function. You can get all function in target author by adding this parameter 
  id?: string, // the id of the function. You can get all function in target id by adding this parameter 
}
```

response:
```
{
  status: number, // status code, 0 is OK, 1 is ERROR
  message: string, // message of the result
  data: {
    funcs: [
      {
        namespace: string, // namespace of the function
        author: string, // author of the function
        id: string, // the id of the function
        content: string, // the content of the function
        options?: FunctionOptions
      }
    ],
  }
}
```

## Execute function

NOTE: the ctx of this http request will be the parameter of the faas function

request:
```
METHOD: POST 
PATH: /exec/:id 
```

response:
```
{
  status: number, // status code, 0 is OK, 1 is ERROR.
  message: string, // message of the result.
  data: {
    output: any, // the output of the function 
  }
}
```
