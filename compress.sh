#! /bin/bash

DIR=$(dirname $(readlink -f $0));
OUTPUT="jquery-visual-password.min.js";
COMMAND="yui-compressor";

command -v $COMMAND >/dev/null 2>&1 || { echo >&2 "Error: this script requires the command '$COMMAND' to be available"; exit 1; }

if [[ $1"x" != "x" ]]; then
    OUTPUT=$1;
fi

OUTPUT=$DIR'/'$OUTPUT;

cat /dev/null > $OUTPUT;

$COMMAND $DIR"/jquery-visual-password.js" >> $OUTPUT
