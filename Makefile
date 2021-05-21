node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

unit-test:
	export NODE_ENV=test && jest tests

test:
	make verify
	make unit-test

test-debug:
	export NODE_ENV=test && jest tests --coverage --debug

demo-build:
	rm -rf ./dist
	webpack --config demos/webpack.config.js --progress --mode=development
	@$(DONE)

demo: demo-build
	node demos/app

a11y: demo-build
	@node .pa11yci.js
	@PA11Y=true node demos/app
	@$(DONE)

check-secret:
	secret-squirrel init

# quick hack to make local dev easier
articleBase=../next-article
articleTarget=${articleBase}/node_modules/@financial-times/n-magnet
articleBackup="${articleTarget}-backup"
linkSource=$(shell pwd)

article-link:
	mv ${articleTarget} ${articleBackup}
	ln -s ${linkSource} ${articleTarget}

article-unlink:
	rm -rf ${articleTarget}
	mv ${articleBackup} ${articleTarget}
