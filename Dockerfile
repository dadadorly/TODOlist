ARG NODE_VERSION=16.14.2

# L'image alpine est beaucoup plus légère en poid!
FROM node:${NODE_VERSION}-alpine as build

# On se place toujours dans un workdir afin de ne pas polluer la base de l'image
WORKDIR /opt

# On copy en premier les fichiers qui change pas trop souvent pour bénéficier du cache docker //yarn.lock
COPY package.json tsconfig.json tsconfig.compile.json package-lock.json ./

# On install les dépendences pour builder le code mais on demande à ne pas muter le .lock file (dans ton cas package-lock.json)
#RUN npm install --read-only-lockfile
RUN npm ci

# On copy les sources
COPY ./src ./src

# On build :p
RUN npm run build

# On refait un layer pour notre runtime
FROM node:${NODE_VERSION}-alpine as runtime
ENV WORKDIR /opt

WORKDIR $WORKDIR

# on install des outils de prod (optional)
#RUN apk update && apk add build-base git curl
#RUN npm install -g pm2

# on récupère les éléments déjà buildé par le layer précédent
COPY --from=build /opt .

# on réinstall les dépendances en purgeant celle de dev. Donc plus d'outil comme babel et typescript. 
#RUN npm install --read-only-lockfile --production
RUN npm ci --production


#RUN npm prune --production


# Ca c'est pour PM2. Mais t'embête pas avec ça pour le moment
#COPY processes.config.js .

EXPOSE 8081
ENV PORT 8081
ENV NODE_ENV production

# la commande a exécuter pour lancer l'image docker. dans ton cas: node dist/index.js

#ENTRYPOINT ["tail", "-f", "/dev/null"]
CMD ["node", "./dist/src/app.js"]
#CMD ["pm2-runtime", "start", "processes.config.js", "--env", "production"]
