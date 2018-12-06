#!/bin/bash

# this has errors
# but...
# given folder names that have 6 characters for hex first, then the proper variable name,
# it will create the proper svg files

if [ -z "$1" ]
  then
    echo "Using file filter '$1'";
    filefilter=$1;
  else
    echo "Using file filter 'nys'";
    filefilter="nys";
fi

for icons in $(ls black); 
  do


    for groups in $(ls | grep -v -e '^$filefilter' | grep $filefilter);
      do
        groupcolor=$(echo $groups | cut -c 1-6;)
        grouppath=$(echo $groups | cut -c 7-100;)
	mkdir $grouppath;
	cat black/$icons | sed -e "s/000000/$groupcolor/g" >> $grouppath/$icons
      done


done
