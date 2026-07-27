from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)


def get_connection():
    return psycopg2.connect(os.getenv("DATABASE_URL"))


@app.route("/")
def home():
    return jsonify({
        "message": "General Store Backend Connected Successfully"
    })


# =====================================================
# PRODUCTS
# =====================================================

@app.route("/products", methods=["GET"])
def get_products():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            product_id,
            product_name,
            category,
            quantity,
            price
        FROM products
        ORDER BY product_id
    """)

    products = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(products)


@app.route("/products", methods=["POST"])
def add_product():

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO products
        (product_name, category, quantity, price)
        VALUES (%s,%s,%s,%s)
    """, (
        data["product_name"],
        data["category"],
        data["quantity"],
        data["price"]
    ))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "message": "Product Added Successfully"
    })


@app.route("/products/<int:id>", methods=["PUT"])
def update_product(id):

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE products
        SET
            product_name=%s,
            category=%s,
            quantity=%s,
            price=%s
        WHERE product_id=%s
    """, (
        data["product_name"],
        data["category"],
        data["quantity"],
        data["price"],
        id
    ))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "message": "Product Updated Successfully"
    })


@app.route("/products/<int:id>", methods=["DELETE"])
def delete_product(id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "DELETE FROM products WHERE product_id=%s",
        (id,)
    )

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "message": "Product Deleted Successfully"
    })
# =====================================================
# SALES HISTORY
# =====================================================

@app.route("/sales", methods=["GET"])
def get_sales():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            s.sale_id,
            p.product_name,
            p.category,
            s.quantity_sold,
            s.total_amount
        FROM sales s
        JOIN products p
        ON s.product_id = p.product_id
        ORDER BY s.sale_id DESC
    """)

    sales = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(sales)


# =====================================================
# DASHBOARD
# =====================================================

@app.route("/dashboard", methods=["GET"])
def dashboard():

    conn = get_connection()
    cur = conn.cursor()

    # Total Products
    cur.execute("SELECT COUNT(*) FROM products")
    total_products = cur.fetchone()[0]

    # Total Revenue
    cur.execute("SELECT COALESCE(SUM(total_amount),0) FROM sales")
    revenue = cur.fetchone()[0]

    # Total Sales
    cur.execute("SELECT COUNT(*) FROM sales")
    total_sales = cur.fetchone()[0]

    # Low Stock
    cur.execute("SELECT COUNT(*) FROM products WHERE quantity < 10")
    low_stock = cur.fetchone()[0]

    cur.close()
    conn.close()

    return jsonify({
        "products": total_products,
        "revenue": float(revenue),
        "sales": total_sales,
        "low_stock": low_stock
    })
# =====================================================
# RECORD SALE
# =====================================================

@app.route("/sales", methods=["POST"])
def record_sale():

    data = request.json

    product_id = data["product_id"]
    quantity_sold = data["quantity_sold"]

    conn = get_connection()
    cur = conn.cursor()

    # Get Product
    cur.execute("""
        SELECT quantity, price
        FROM products
        WHERE product_id = %s
    """, (product_id,))

    product = cur.fetchone()

    if product is None:
        cur.close()
        conn.close()
        return jsonify({"error": "Product not found"}), 404

    available_stock = product[0]
    price = float(product[1])

    # Check Stock
    if quantity_sold > available_stock:
        cur.close()
        conn.close()
        return jsonify({"error": "Not enough stock available"}), 400

    total_amount = quantity_sold * price

    # Insert Sale
    cur.execute("""
        INSERT INTO sales
        (
            product_id,
            quantity_sold,
            total_amount
        )
        VALUES (%s,%s,%s)
    """, (
        product_id,
        quantity_sold,
        total_amount
    ))

    # Update Stock
    cur.execute("""
        UPDATE products
        SET quantity = quantity - %s
        WHERE product_id = %s
    """, (
        quantity_sold,
        product_id
    ))

    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "message": "Sale Recorded Successfully",
        "total_amount": total_amount
    })
if __name__ == "__main__":
    app.run(debug=True)