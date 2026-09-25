#!/bin/bash
# Delete contents inside the data directory

DIR="data"
if [ -z "$( ls --all $DIR )" ]; then
	echo "Log: $DIR directory is empty"
else
	rm -r ./$DIR/*
fi