#!/bin/bash
#----------------------------------------
# OPTIONS
#----------------------------------------
USER='root'       # MySQL User
PASSWORD='houda' # MySQL Password
DAYS_TO_KEEP=30    # 0 to keep forever
GZIP=0            # 1 = Compress
BACKUP_PATH='/home/houda/stage_i4tech/toBackup/backups'
#----------------------------------------

# Create the backup folder
#if [ ! -d $BACKUP_PATH ]; then
#  mkdir -p $BACKUP_PATH
#fi
echo 'hello 1 '
# Get list of database names

databases=`mysql -u $USER -p$PASSWORD -e "SHOW DATABASES;" | tr -d "|" | grep -v Database`
echo 'hello 2' 
echo $databases
for db in $databases; 
do
  echo 'hello 3 '
  if [ $db == 'information_schema' ] || [ $db == 'performance_schema' ] || [ $db == 'mysql' ] || [ $db == 'sys' ] || [ $db == 'phpmyadmin' ]; then
    echo "Skipping database: $db"
    continue
  fi

  date=$(date -I)
  
  echo "retoring up database: $db without compression"      
  mysql -u $USER -p$PASSWORD  $db  < $BACKUP_PATH/$db-$date.sql
  
done