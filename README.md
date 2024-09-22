# Angular18

this project generated with [Angular CLI]

# dss-portal

## Create a new Project
```ng new dss-portal```

## Development server
To start a project in dev server use following command.<br>
```ng serve```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code generator 
To generate a new component or other Angular module use following command. <br>
```ng g c component-name```

You can also use 
```ng g directive | pipe | service | class | guard | interface |  enum | module name-of-element```.

## Build
To build the project use following command.<br>
```ng build --configuration production``` <br>
The build artifacts will be stored in the `dist/` directory.



## Docker
To create an image use following command.<br>
```docker build -t dss-portal . ``` <br><br>

To run your container use following command. <br>
```docker run -d -p 80:80  --name dss-portal  dss-portal:latest```


Now navigate to `http://localhost:80/`. The application will started.


## Running unit tests
To start test run<br>
```ng test```