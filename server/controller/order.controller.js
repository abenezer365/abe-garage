import connection from "../config/database.config.js";
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
//Add Order controller
export async function addOrder(req, res) {
    const {customer_id,vehicle_id,employee_id,status} = req.body;
    //check if all fields are provided
    if (!customer_id || !vehicle_id || !employee_id || !status) {
    return res.status(400).json({
        message: "Please enter all required fields, which are required",
        success : false    
        });
    }
    try {
    const [customer] = await connection.execute(
      "SELECT * FROM customers WHERE customer_id = ?",[customer_id]
    );

    if (customer.length === 0) {
      return res.status(200).json({
        error: "No customer found!",
        success: true
      });
    }
    const orderHash = (await bcrypt.genSalt(10)).replace(/\W/g, '').slice(-10);
    const [result] = await connection.execute(
      "INSERT INTO orders (customer_id,vehicle_id,employee_id, status, order_hash) VALUES (?,?,?,?,?)",
      [customer_id,vehicle_id,employee_id, status, orderHash]
    );

    const insertedOrderId = result.insertId;

    return res.status(201).json({
        message: "Order placed succesfully",
        order_id: insertedOrderId,
        success: true
    });
    } catch (error) {
    return res.status(500).json({
     message: "Internal server error, Something went wrong!",
     success: false,
     error : error.message
    });
  }
}
//Get All Order controller
export async function getAllOrders(req, res) {
  const selectQuery = `SELECT 
  o.order_id,
  o.status,
  o.created_at AS order_created_at,
  o.order_hash,

  -- Customer Info
  c.customer_id,
  c.first_name AS customer_first_name,
  c.last_name AS customer_last_name,
  c.phone AS customer_phone,
  c.email AS customer_email,

  -- Vehicle Info
  v.vehicle_id,
  v.brand,
  v.model,
  v.color,
  v.year,
  v.tag,
  v.type,

  -- Assigned Employee Info
  u.user_id AS employee_id,
  u.first_name AS employee_first_name,
  u.last_name AS employee_last_name,
  u.email AS employee_email,

  -- Order Info Table
  oi.order_total_price,
  oi.order_estimated_completion_date,
  oi.order_actual_completion_date,
  oi.order_additional_requests,
  oi.order_additional_requests_completed

  FROM orders o
  LEFT JOIN customers c ON o.customer_id = c.customer_id
  LEFT JOIN vehicles v ON o.vehicle_id = v.vehicle_id
  LEFT JOIN users u ON o.employee_id = u.user_id
  LEFT JOIN order_info oi ON o.order_id = oi.order_id
  ORDER BY o.created_at DESC
  LIMIT 15;
  `
    try {
    const [orders] = await connection.execute(selectQuery);

    if (orders.length === 0) {
      return res.status(200).json({
        error: "No order found!",
        success: true
      });
    }

    res.status(200).json({
      message: "Orders retrieved successfully",
      success: true,
      orders: orders
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to qeury orders! Internal server error!",
       success: false,
      error: error.message
    });
  }
}

//Get Single Order controller
export async function getSingleOrder(req, res) {
    // req.params.user_id comes from reqeust parameter
  const {order_id} = req.params;

  try {
    const selectQuery = `SELECT 
  o.order_id,
  o.status,
  o.created_at AS order_created_at,
  o.order_hash,

  -- Customer Info
  c.customer_id,
  c.first_name AS customer_first_name,
  c.last_name AS customer_last_name,
  c.phone AS customer_phone,
  c.email AS customer_email,

  -- Vehicle Info
  v.vehicle_id,
  v.brand,
  v.model,
  v.color,
  v.year,
  v.tag,
  v.type,
  v.mileage,

  -- Assigned Employee Info
  u.user_id AS employee_id,
  u.first_name AS employee_first_name,
  u.last_name AS employee_last_name,
  u.email AS employee_email,

  -- Order Info Table
  oi.order_total_price,
  oi.order_estimated_completion_date,
  oi.order_actual_completion_date,
  oi.order_additional_requests,
  oi.order_additional_requests_completed

  FROM orders o
  LEFT JOIN customers c ON o.customer_id = c.customer_id
  LEFT JOIN vehicles v ON o.vehicle_id = v.vehicle_id
  LEFT JOIN users u ON o.employee_id = u.user_id
  LEFT JOIN order_info oi ON o.order_id = oi.order_id
  WHERE o.order_id = ?
  LIMIT 1;
`
    const [order] = await connection.execute(selectQuery,[order_id]);

    if (order.length === 0) {
      return res.status(200).json({
        error: "No order found!",
        success: true
      });
    }

    res.status(200).json({
      message: "Order data retrieved successfully",
      success: true,
      order: order[0]
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to qeury order! Internal server error!",
       success: false,
      error: error.message
    });
  }
}
//Get All Order For One Customer controller
export async function getAllOrderForOneCustomer(req, res) {
    // req.params.user_id comes from reqeust parameter
  const {customer_id} = req.params;

  try {
    const selectQuery = `SELECT 
  o.order_id,
  o.status,
  o.created_at AS order_created_at,
  o.order_hash,

  -- Vehicle Info
  v.vehicle_id,
  v.brand,
  v.model,
  v.color,
  v.year,
  v.tag,
  v.type,
  v.mileage,

  -- Assigned Employee Info
  u.user_id AS employee_id,
  u.first_name AS employee_first_name,
  u.last_name AS employee_last_name,
  u.email AS employee_email,

  -- Order Info Table
  oi.order_total_price,
  oi.order_estimated_completion_date,
  oi.order_actual_completion_date,
  oi.order_additional_requests,
  oi.order_additional_requests_completed

  FROM orders o
  LEFT JOIN vehicles v ON o.vehicle_id = v.vehicle_id
  LEFT JOIN users u ON o.employee_id = u.user_id
  LEFT JOIN order_info oi ON o.order_id = oi.order_id
  WHERE o.customer_id = ?;
`
    const [orders] = await connection.execute(selectQuery,[customer_id]);

    if (orders.length === 0) {
      return res.status(200).json({
        error: "No order found!",
        success: true
      });
    }

    res.status(200).json({
      message: "Order data retrieved successfully",
      success: true,
      orders: orders
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to qeury orders! Internal server error!",
       success: false,
      error: error.message
    });
  }
}
//Delete Order controller
export async function deleteOrder(req, res) {
    const {order_id} = req.params;

  try {
    const [order] = await connection.execute(
      "SELECT * FROM orders WHERE order_id = ?",[order_id]
    );

    if (order.length === 0) {
      return res.status(200).json({
        message: "Order not found",
        success: true
      });
    }
    await connection.execute("DELETE FROM order_info WHERE order_id = ?", [order_id]);
       // Perform deletion
    await connection.execute(
      "DELETE FROM orders WHERE order_id = ?",
      [order_id]
    );

     res.status(200).json({
      message: "Order Deleted ✅",
      success: true
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to Delete order! Internal server error!",
       success: false,
       error: error.message
    });
  }
}

//Update Order status 
export async function updateStatus(req, res) {
  const {order_id} = req.params;
  const {status} = req.body;

  try {
    const [order] = await connection.execute(
      "SELECT * FROM orders WHERE order_id = ?",[order_id]
    );

    if (order.length === 0) {
      return res.status(200).json({
        error: "No order yet!",
        success: true
      });
    }
    if(status === 'Completed'){
        function time() {
            const now = new Date();            
            // Format components
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            // Combine into MySQL DATETIME format
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
        const now = time()
      await connection.execute(
            "UPDATE order_info SET order_actual_completion_date = ?, order_additional_requests_completed = true WHERE order_id = ?",[now,order_id]
        );

    // 1. Get customer info (joined from orders)
    const [customerRows] = await connection.execute(
      `SELECT c.first_name, c.last_name, c.email
       FROM orders o
       JOIN customers c ON o.customer_id = c.customer_id
       WHERE o.order_id = ?`,
      [order_id]
    );

    if (customerRows.length === 0) {
      return res.status(404).json({ message: "Customer not found", success: false });
    }

    const customer = customerRows[0];
    // 3. Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    // 4. Email content with custom styling
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customer.email,
      subject: `Your Vehicle is Ready for Pickup 🚘`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #F6F7FA; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <div style="background-color: #091436; color: white; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">Abe Garage</h2>
              <p style="margin: 5px 0 0;">🚘 Vehicle Service Completed</p>
            </div>
            <div style="padding: 20px;">
              <p>Dear <strong>${customer.first_name} ${customer.last_name}</strong>,</p>
              <p>We’re excited to inform you that your vehicle is ready for pickup!</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background-color: #F6F7FA;">
                  <td style="padding: 10px; font-weight: bold;">Order ID:</td>
                  <td style="padding: 10px;">#${order_id}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold;">Total Amount:</td>
                  <td style="padding: 10px; color: #EE0D09; font-weight: bold; font-size: 1.2em;">--</td>
                </tr>
              </table>
              <p style="margin-top: 30px;">Please go to our garage and pick your super car, as you remembered the payment is covered earlier.</p>
              <p>If you have any questions or need support, feel free to reach out.</p>
              <a href="mailto:info.abegarage@gmail.com" style="display: inline-block; margin-top: 20px; padding: 12px 20px; background-color: #EE0D09; color: white; text-decoration: none; border-radius: 4px;">Contact Support</a>
            </div>
            <div style="background-color: #091436; color: white; text-align: center; padding: 10px;">
              <small>&copy; ${now} Abe Garage. All rights reserved.</small>
            </div>
          </div>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
    }
    await connection.execute(
      "UPDATE orders SET status = ? WHERE order_id = ?",[status,order_id]
    );
        return(
            res.status(200).json({
                message: "Order status updated!",
                success: true
            })
        )
  } catch (error) {
     return res.status(500).json({
       message: "Unable to update order status! Internal server error!",
       success: false,
       error: error.message
    });
  }
}

//Add Order Info controller
export async function addOrderInfo(req, res) {
    const {order_id,order_total_price,order_estimated_completion_date,order_additional_requests} = req.body;
    //check if all fields are provided
    if (!order_id || !order_total_price || !order_estimated_completion_date || !order_additional_requests) {
    return res.status(400).json({
        message: "Please enter all required fields, which are required",
        success : false    
        });
    }
    try {
    const [order] = await connection.execute(
      "SELECT * FROM orders WHERE order_id = ?",[order_id]
    );

    if (order.length === 0) {
      return res.status(200).json({
        error: "No order found!",
        success: true
      });
    }
    await connection.execute(
      "INSERT INTO order_info (order_id,order_total_price,order_estimated_completion_date,order_additional_requests) VALUES (?,?,?,?)",
      [order_id,order_total_price,order_estimated_completion_date,order_additional_requests]
    );
    return res.status(201).json({
        message: "Order Info inserted succesfully",
        success: true
    });
    } catch (error) {
    return res.status(500).json({
     message: "Internal server error, Something went wrong!",
     success: false,
     error : error.message
    });
  }
}


// GET order by order_hash
export async function getOrderByHash(req, res) {
  const { order_hash } = req.params;

  try {
    const [orders] = await connection.execute(`
      SELECT 
        o.order_id,
        o.status,
        o.order_hash,
        c.first_name, c.last_name, c.email, c.phone,
        v.brand, v.type, v.year, v.color,
        i.order_total_price,
        i.order_estimated_completion_date,
        i.order_additional_requests
      FROM orders o
      JOIN customers c ON o.customer_id = c.customer_id
      JOIN vehicles v ON o.vehicle_id = v.vehicle_id
      LEFT JOIN order_info i ON o.order_id = i.order_id
      WHERE o.order_hash = ?
    `, [order_hash]);

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const [services] = await connection.execute(`
      SELECT s.name FROM requests r
      JOIN services s ON r.service_id = s.service_id
      WHERE r.order_id = ?
    `, [orders[0].order_id]);

    return res.json({
      success: true,
      order: orders[0],
      services: services.map(s => s.name)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
}
