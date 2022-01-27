git pull origin master || exit 1
npm ci --production || exit 1
npm run reload