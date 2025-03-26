from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error
import os
from groclake.modellake import ModelLake
from groclake.vectorlake import VectorLake

GROCLAKE_API_KEY = '72b32a1f754ba1c09b3695e0cb6cde7f'
GROCLAKE_ACCOUNT_ID = '8d0bf0989286ab5d4bde4b4426c37149'

os.environ['GROCLAKE_API_KEY'] = GROCLAKE_API_KEY
os.environ['GROCLAKE_ACCOUNT_ID'] = GROCLAKE_ACCOUNT_ID

model = ModelLake()
vector = VectorLake()

app = Flask(__name__)

DATABASE_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'Ecommerce'
}

def generate_search_prompt(query):
    pass

@app.route('/llm_groclake', methods=['POST'])
def execute_llm_prompt():
    data = request.get_json()
    query = data.get('query')
    print(query)
    payload = {
    "messages":[
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": query
            }
        ]
    }

    try:
        chat_response = model.chat_complete(payload)['answer']
        print("Chat Answer:", chat_response)
        return jsonify({"result":chat_response}), 200
    except Exception as e:
        return jsonify({"error": "I'm sorry, there was an error processing your request."}), 400

def execute_query(query, params=()):
    try:
        with mysql.connector.connect(**DATABASE_CONFIG) as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                result = cursor.fetchall()
                print(result)
                return result
                
    except Error as e:
        print(f"Error executing query: {e}")
        return None
    
def execute_query_write(query, params=()):
    try:
        with mysql.connector.connect(**DATABASE_CONFIG) as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, params)
                conn.commit()
                result = cursor.fetchall()
                return result
    except Error as e:
        print(f"Error executing query: {e}")
        return None

def check_order_exists(order_id):
    query = "SELECT * FROM orders WHERE orderid = %s"
    result = execute_query(query, (order_id,))
    return len(result) > 0

def convert_product_data(products):
    result = []
    
    for product in products:
        product_id = product["ProductID"]
        name = product["name"]
        price = product["price"]
        currency = product["currency"]

        metafields = {key: value for key, value in product.items() if key not in ["ProductID", "name", "price", "currency"]}

        metadata = ", ".join([f"{key}: {value}" for key, value in metafields.items()])
        
        result.append({
            "productId": product_id,
            "name": name,
            "price": price,
            "currency": currency,
            "metadata": metadata
        })
    
    return result

@app.route('/search_product', methods=['POST'])
def search_product():
    data = request.get_json()
    query = data.get('query')
    if not query:
        return jsonify({"error": "Query parameter 'query' is required."}), 400

    try:
        search_query = query
        vector_search_data = vector.generate(search_query)
        search_vector = vector_search_data.get('vector')

        search_payload = {
            "vector": search_vector,
            "vectorlake_id": "o3tfjpgpm7gpvxtd",
            "vector_type": "text",
        }

        search_response = vector.search(search_payload)['results']
        products = [row['metadata'] for row in search_response[:4]]
        products = convert_product_data(products[i] for i in range(len(products)) if i % 2 != 0)
        print("Search results:", products)
        return jsonify({"results": products})
    except Exception as e:
        print("Error while performing vector search:", e)
        return f'Error while performing search for {query}'
    
@app.route('/check_order_status', methods=['POST'])
def check_order_status():
    data = request.get_json()
    print(data)
    order_id = data.get('orderId')
    if not order_id:
        return jsonify({"error": "Order ID is required."}), 400

    query = "SELECT status, estimated_delivery FROM orders WHERE orderid = %s"
    result = execute_query(query, (order_id,))
    print(query, order_id, type(order_id))
    if not result:
        return jsonify({"error": f"Order ID {order_id} not found."}), 404
    
    status, estimated_delivery = result[0]
    return jsonify({"status": status, "estimatedDelivery": estimated_delivery})

@app.route('/raise_issue', methods=['POST'])
def raise_issue():
    data = request.get_json()
    print(data)
    order_id = data.get('orderId')
    issue = data.get('issue')
    action = data.get('action')
    
    if not order_id or not issue or not action:
        return jsonify({"error": "Order ID, issue, and action are required."}), 400

    if action not in ['return', 'replace']:
        return jsonify({"error": "Action must be 'return' or 'replace'."}), 400

    if not check_order_exists(order_id):
        return jsonify({"error": "Order ID not found in the orders table."}), 404

    try:
        query = "INSERT INTO issues (orderid, issue, action) VALUES (%s, %s, %s)"
        execute_query_write(query, (order_id, issue, action))

        query = "SELECT * FROM issues WHERE orderid = %s ORDER BY ticketid DESC LIMIT 1;"
        ticket_id_result = execute_query(query,(order_id,))

        if ticket_id_result:
            ticket_id = ticket_id_result[0][0]
            return jsonify({"ticketId": ticket_id, "status": "open"})
        else:
            return jsonify({"error": "Failed to retrieve ticket ID."}), 500

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to raise issue."}), 500


@app.route('/check_issue_status', methods=['POST'])
def check_issue_status():
    data = request.get_json()
    ticket_id = data.get('ticketId')
    if not ticket_id:
        return jsonify({"error": "Ticket ID is required."}), 400

    query = "SELECT status, resolution_details FROM issues WHERE ticketid = %s"
    result = execute_query(query, (ticket_id,))

    if not result:
        return jsonify({"error": f"Ticket ID {ticket_id} not found."}), 404

    status, resolution_details = result[0]
    return jsonify({"status": status, "resolutionDetails": resolution_details})

@app.route('/numberbyissue', methods=['POST'])
def numberbyissue():
    data = request.get_json()
    ticket_id = data.get('ticketId')
    if not ticket_id:
        return jsonify({"error": "'ticketId' is required."}), 400

    query = "SELECT c.phone FROM issues i JOIN orders o ON i.orderid = o.orderid JOIN customers c ON o.customerid = c.customerid WHERE i.ticketid = %s"
    result = execute_query(query, (ticket_id,))

    if not result:
        return jsonify({"error": f"Ticket ID {ticket_id} not found."}), 404

    user_contact = result[0][0]
    if user_contact:
        return jsonify({"userNum": user_contact})
    else:
        return jsonify({"error": "Number mismatch."}), 400

@app.route('/numberbyorder', methods=['POST'])
def numberbyorder():
    data = request.get_json()
    order_id = data.get('orderId')
    if not order_id:
        return jsonify({"error": "'orderId' is required."}), 400

    query = "SELECT c.phone FROM orders o JOIN customers c ON o.customerid = c.customerid WHERE o.orderid = %s"
    result = execute_query(query, (order_id,))

    if not result:
        return jsonify({"error": f"Order ID {order_id} not found."}), 404

    user_contact = result[0][0]
    if user_contact:
        return jsonify({"userNum": user_contact})
    else:
        return jsonify({"error": "Number mismatch."}), 400

if __name__ == '__main__':
    app.run(debug=True)
