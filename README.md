# UCSPaper Back-End App

## Set Up

### Run Docker Postgres image

```
# build image from Dockerfile in this directory
sudo docker build --tag 'postgres' ./

# run docker container from built image, in localhost, port 5432
sudo docker run -p 5432:5432 -h localhost postgres
```

### Install node packages

```
yarn
```

### Run Migrations

With the Postgres Docker container running, execute the following

```
yarn migration:run
```

## Run Project

```
yarn dev
```
