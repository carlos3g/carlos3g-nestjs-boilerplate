ARG UID=node
ARG GID=node
ARG USER=node

FROM node:16
# Required for Prisma Client to work in container
RUN apt-get update && apt-get install -y openssl

WORKDIR /app

COPY --chown=${UID}:${GID} package*.json .

RUN npm rebuild

RUN echo "${UID}:${GID}"

RUN npm i

COPY --chown=${UID}:${GID} . .

RUN npx prisma generate

USER ${USER}

#CMD ["npm", "run", "start:dev"]
