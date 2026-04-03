# pymongo_crud.py - PyMongo CRUD operations on Customer collection
# Generated with assistance from Claude (Anthropic)

from pymongo.mongo_client import MongoClient

# Connect to MongoDB Atlas
uri = "mongodb+srv://aishapat:Maui808@cluster0.fu0lo1k.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client["luminousStays"]
customer_collection = db["Customer"]

# 1. Delete all records to clean up
print("Deleting all existing records...")
customer_collection.delete_many({})

# 2. Insert 3 customer records
print("Inserting 3 customers...")
customers = [
    {"firstName": "Aisha", "lastName": "Patterson", "email": "aishapat@hawaii.edu", "phone": "808-825-5212"},
    {"firstName": "Jessa", "lastName": "Sagario", "email": "js2000@gmail.com", "phone": "808-555-1234"},
    {"firstName": "Abe", "lastName": "Kamaka", "email": "abe808@yahoo.com", "phone": "808-419-3333"}
]
customer_collection.insert_many(customers)
print("3 customers inserted!")

# 3. Update Aisha's email
print("Updating Aisha's email...")
customer_collection.update_one({"firstName": "Aisha"}, {"$set": {"email": "aisha.new@hawaii.edu"}})

# 4. Update Jessa's phone
print("Updating Jessa's phone...")
customer_collection.update_one({"firstName": "Jessa"}, {"$set": {"phone": "808-999-9999"}})

# 5. Query by last name
print("Querying by last name 'Sagario'...")
result = customer_collection.find_one({"lastName": "Sagario"})
print(result)

# 6. Query by first name
print("Querying by first name 'Abe'...")
result = customer_collection.find_one({"firstName": "Abe"})
print(result)

# 7. Drop the Customer collection
print("Dropping Customer collection...")
customer_collection.drop()
print("Done!")

client.close()