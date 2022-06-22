FROM node:18 as build
WORKDIR ./
ENV PATH ./node_modules/.bin:$PATH
COPY package.json ./
RUN npm i --silent
RUN npm install vue@2 -g --silent
COPY . ./
# ENV REACT_APP_HOST_IP_ADDRESS $API_URL
RUN npm run build

# Build step 2(Deploying build on NGINX)
FROM nginx:latest
RUN  apt-get update \
  && apt-get install -y wget \
  && rm -rf /var/lib/apt/lists/*
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build ./nginx/nginx.conf /etc/nginx/conf.d/default.conf:ro
COPY --from=build ./dist /usr/share/nginx/html