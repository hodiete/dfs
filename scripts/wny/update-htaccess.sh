patchfile=$1  # The patch to apply.

DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

patch -p1 -N --dry-run --silent < $patchfile 2>/dev/null
#If the patch has not been applied then the $? which is the exit status
#for last command would have a success status code = 0
if [ $? -eq 0 ];
then
    #apply the patch
    patch -p1 -N < $patchfile
fi
