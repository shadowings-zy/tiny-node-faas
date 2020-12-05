# tiny-node-faas

Tiny node faas is a light-weight faas project coding by nodejs.
By using tiny-node-faas, you can focus on handling your http request, without worrying about the http server.

NOW TINY-NODE-FAAS STILL DEVELOPING!!! 
THE PROJECT IS NOT FINISHED.

## Add function

request:
```
METHOD: POST 
PATH: /func/add
BODY: {
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
    func: {
      id: number, // the id of the function
      path: string, // the path of the function
      fullPath: string, // the full path of the function
    }
  }
}
```

## Update function

request:
```
METHOD: PUT
PATH: /func/update
BODY: {
  author: string, // author of the function
  id: number, // the id of the function
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
BODY: {
  author: string, // author of the function
  id?: number, // the id of the function. You can get all your function by not adding this parameter 
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
        id: number, // the id of the function
        path: string, // the path of the function
        fullPath: string, // the full path of the function 
        content: string, // the content of the function
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
PATH: /exec/:funcPath 
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
