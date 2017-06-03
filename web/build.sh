#!/bin/bash

PACKAGE=LottoWeb.zip
DEST_PATH=/var/www/html/lotto/web

gulp --env prod

zip -r $PACKAGE build/

# how to push to server
# scp sample2.zip root@107.170.25.71:/var/www/html/ditched

scp $PACKAGE root@107.170.25.71:$DEST_PATH

rm $PACKAGE 

