FROM jrottenberg/ffmpeg:4.0-scratch AS ffmpeg

FROM node:12.16.1 as build

# Create app directory
WORKDIR /usr/src/build

COPY package*.json ./

RUN yarn install --production=true

# Bundle app source
COPY . .

# Build TS to JS
RUN yarn build

#----------------------------------------------#

FROM node:12.16.1 as release

WORKDIR /usr/src/app

ENV LD_LIBRARY_PATH=/usr/local/lib

COPY --from=ffmpeg / /
COPY --from=build /usr/src/build/node_modules ./node_modules
COPY --from=build /usr/src/build/dist ./dist
COPY --from=build /usr/src/build/sound ./sound

#HEALTHCHECK --interval=2m --timeout=3s \
#  CMD curl -f http://localhost:3000/ || exit 1

CMD [ "node", "dist/index.js" ]