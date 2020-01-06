run:
	SKIP_PREFLIGHT_CHECK=true npm run start

f_config_get:
	./node_modules/.bin/firebase functions:config:get
