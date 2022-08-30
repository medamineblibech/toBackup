#!/bin/bash
#----------------------------------------
# OPTIONS
#----------------------------------------
USER='root'       # MySQL User
PASSWORD='Myp@ss123456789' # MySQL Password
DAYS_TO_KEEP=30    # 30 days to keep db
BACKUP_PATH='/home/sgbd/Desktop/toBackup/back/backups'
#----------------------------------------

# Create the backup folder
if [ ! -d $BACKUP_PATH ]; then
  mkdir -p $BACKUP_PATH
fi

# Get list of database names
databases=`mysql -u $USER -p$PASSWORD -e "SHOW DATABASES;" | tr -d "|" | grep -v Database`

for db in $databases; do

  if [ $db == 'information_schema' ] || [ $db == 'phpmyadmin' ] || [ $db == 'performance_schema' ] || [ $db == 'mysql' ] || [ $db == 'sys' ]; then
    echo "Skipping database: $db"
    continue
  else
    echo "Backing up database: $db "      
    mysqldump -u $USER -p$PASSWORD --databases $db >> $BACKUP_PATH/`date +%F`-$db.sql
  fi
done


# Delete old backups
if [ "$DAYS_TO_KEEP" == 30 ] ; then
  echo "Deleting backups older than $DAYS_TO_KEEP days"
  find $BACKUP_PATH/* -mtime +$DAYS_TO_KEEP -exec rm {} \;
fi



