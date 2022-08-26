#!/bin/bash
#----------------------------------------
# OPTIONS
#----------------------------------------
USER='root'       # MySQL User
PASSWORD='Myp@ss123456789' # MySQL Password
BACKUP_PATH='/home/sgbd/Desktop/toBackup/back/backups'
#----------------------------------------

for db in $BACKUP_PATH/*.sql; do
    echo "Restore database: $db "      
    mysql -u $USER -p$PASSWORD  < $db
 done
