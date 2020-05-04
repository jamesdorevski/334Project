## Start backend
1. Download maven
2. Add maven/bin to environment variables
3. Starting maven
```
cd restapp
mvn spring-boot:run
```

## Start frontend
1. Starting react
```
cd restapp/localite-app
npm start
```

### Issues running
1. Solution 1
```
cd restapp/localite-app
npm install
``` 
2. Solution 2 (reinstalling modules)
	- In restapp/localite-app, **delete** node_modules and package-lock.json
```
cd restapp/localite-app
npm install
```
