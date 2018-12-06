#!/bin/bash

# going into each folder and changing pngs


    for groups in $(ls | grep -e '^nys'); 
      do 
	echo $groups;
	cd $groups;
#	mkdir works;
        find . -name \*.svg -print0 | xargs -0 -n1 -P4 -I{} bash -c 'X={}; svg2png -w 128 "$X" "${X%.svg}.png"'
	cd ..

      done


