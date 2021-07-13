FROM node:15.0.0

ENV NODE_PORT="3000" WAIT_VERSION="2.9.0"

# Make docker-compose wait for container dependencies be ready
# Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait


USER node

WORKDIR /usr/app

COPY . .
EXPOSE ${NODE_PORT}


CMD [ "npm", "run", "start" ]
