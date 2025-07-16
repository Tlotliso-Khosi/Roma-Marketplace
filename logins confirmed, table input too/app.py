from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2 import sql

app = Flask(__name__)
CORS(app)

# Database configuration
DB_CONFIG = {
    "dbname": "agroaidatabase",
    "user": "postgres",
    "password": "thatohatsi",
    "host": "localhost"
}

def get_db_connection():
    conn = psycopg2.connect(**DB_CONFIG)
    return conn

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit-field', methods=['POST'])
def submit_field():
    data = request.get_json()
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Insert data with field_id as the primary key
        query = sql.SQL("""
            INSERT INTO recommendation_fields (field_name, length, width, location)
            VALUES (%s, %s, %s, %s)
            RETURNING field_id
        """)
        
        cursor.execute(query, (
            data['field_name'],
            float(data['length']),
            float(data['width']),
            data['location']
        ))
        
        field_id = cursor.fetchone()[0]
        conn.commit()
        
        return jsonify({
            "status": "success",
            "message": "Field data saved successfully",
            "field_id": field_id
        }), 201
        
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
        
    finally:
        if 'conn' in locals():
            conn.close()

# Get all fields
@app.route('/fields', methods=['GET'])
def get_fields():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM recommendation_fields")
        fields = cursor.fetchall()
        
        # Convert to list of dictionaries
        result = []
        for field in fields:
            result.append({
                'field_id': field[0],
                'field_name': field[1],
                'length': field[2],
                'width': field[3],
                'location': field[4]
            })
            
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    finally:
        if 'conn' in locals():
            conn.close()

# Delete a field
@app.route('/fields/<int:field_id>', methods=['DELETE'])
def delete_field(field_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("DELETE FROM recommendation_fields WHERE field_id = %s RETURNING field_name", (field_id,))
        deleted_field = cursor.fetchone()
        
        if not deleted_field:
            return jsonify({'status': 'error', 'message': 'Field not found'}), 404
            
        conn.commit()
        return jsonify({'status': 'success', 'message': f"Field '{deleted_field[0]}' deleted"}), 200
        
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500
    finally:
        if 'conn' in locals():
            conn.close()

if __name__ == '__main__':
    app.run(debug=True, port=5000)

