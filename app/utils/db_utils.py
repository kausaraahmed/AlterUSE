import mysql.connector


def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost", user="root", passwd="", database="alteruse_db"
    )
    return connection
