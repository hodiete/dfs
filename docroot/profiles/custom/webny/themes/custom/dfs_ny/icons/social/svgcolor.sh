#!/bin/bash

# this has errors
# but...
# makes a copy of all icons in black directory,
# replaces the 000000 in the black svg file with the color specified ($1),
# and puts them in a folder specified ($2)

# TEST FOR ARGUMENTS
if [ ! $# > 1 ]
  then
    echo "Please include:";
    echo "1. hex color (without parentheses)";
    echo "2. new folder name";
    echo "3. png size (optional - won't create png's unless included)"
    exit;
fi

# SET VARIABLES
groupcolor=$1;
grouppath=$2;

# CREATE DIRECTORY FROM SECOND ARGUMENT
mkdir $grouppath;

# LOOP OVER SVG's IN FOLDER 'BLACK'
for icons in $(ls black | grep ".svg");
  do
  # check for 000000 in svg icon and replace with color specified in argument
	cat black/$icons | sed -e "s/000000/$groupcolor/g" > $grouppath/$icons
done

# if 3rd variable exists, use that as the size of the png in pixels
if [ ! -z "$3" ]
  then
    export pngsize=$3;
    find $grouppath -name \*.svg -print0 | xargs -0 -P4 -I{} bash -c 'X={};  svg2png -w $pngsize "$X" "${X%.svg}.png"';
fi
