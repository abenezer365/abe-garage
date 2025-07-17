import connection from "../config/database.config.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
// Generate invoice (Insert into invoices table)
export async function generateInvoice(req, res) {
  const { order_id } = req.params;

  try {
    // Check if invoice already exists
    const [existing] = await connection.execute(
      "SELECT * FROM invoices WHERE order_id = ?",
      [order_id]
    );
    if (existing.length > 0) {
      return res.status(400).json({
        message: "Invoice already exists for this order",
        success: false,
      });
    }

    // Get total amount from order_info
    const [orderInfo] = await connection.execute(
      "SELECT order_total_price FROM order_info WHERE order_id = ?",
      [order_id]
    );

    if (orderInfo.length === 0) {
      return res.status(404).json({
        message: "Order info not found",
        success: false,
      });
    }

    const total_amount = orderInfo[0].order_total_price;

    // Insert new invoice
    await connection.execute(
      `INSERT INTO invoices (order_id, total_amount) VALUES (?, ?)`,
      [order_id, total_amount]
    );

    return res.status(201).json({
      message: "Invoice generated successfully",
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate invoice",
      success: false,
      error: error.message,
    });
  }
}

// Send Invoice to customer email
export async function sendInvoice(req, res) {
  const { order_id } = req.params;

  try {
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

    // 2. Get invoice info (from order_info)
    const [invoiceRows] = await connection.execute(
      `SELECT order_total_price FROM order_info WHERE order_id = ?`,
      [order_id]
    );

    if (invoiceRows.length === 0) {
      return res.status(404).json({ message: "Invoice not found", success: false });
    }

    const totalAmount = invoiceRows[0].order_total_price;

    // 3. Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const now = new Date().getFullYear()
    // 4. Email content with custom styling
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customer.email,
      subject: `Invoice for Your Order #${order_id} - Abe Garage`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #F6F7FA; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <div style="background-color: #091436; color: white; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">Abe Garage</h2>
              <p style="margin: 5px 0 0;">Your Invoice is Ready</p>
            </div>
            <div style="padding: 20px;">
              <p>Dear <strong>${customer.first_name} ${customer.last_name}</strong>,</p>
              <p>Thank you for choosing Abe Garage. Below are your invoice details:</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background-color: #F6F7FA;">
                  <td style="padding: 10px; font-weight: bold;">Order ID:</td>
                  <td style="padding: 10px;">#${order_id}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold;">Total Amount:</td>
                  <td style="padding: 10px; color: #EE0D09; font-weight: bold; font-size: 1.2em;">$${totalAmount}</td>
                </tr>
              </table>
              <p style="margin-top: 30px;">Please proceed to make the payment and show your proof of payment to the receptionist.</p>
              <p>If you have any questions, feel free to contact us.</p>
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

    return res.status(200).json({
      message: `Invoice sent to ${customer.email}`,
      success: true,
    });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
}


// Mark Invoice as Paid
export async function markPayed(req, res) {
  const { order_id } = req.params;

  try {
    const [invoice] = await connection.execute(
      "SELECT * FROM invoices WHERE order_id = ?",
      [order_id]
    );

    if (invoice.length === 0) {
      return res.status(404).json({
        message: "Invoice not found",
        success: false,
      });
    }

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
      "UPDATE invoices SET is_paid = true, payment_date = ? WHERE order_id = ?",
      [now, order_id]
    );
     // 1. Get customer info (joined from orders)
    const [customerRows] = await connection.execute(
      `SELECT c.first_name, c.last_name, c.email, o.order_hash
      FROM orders o
      JOIN customers c ON o.customer_id = c.customer_id
      WHERE o.order_id = ?`,
      [order_id]
    );


    if (customerRows.length === 0) {
      return res.status(404).json({ message: "Customer not found", success: false });
    }

    const customer = customerRows[0];
    const { first_name, last_name, email, order_hash } = customer;
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
      to: email,
      subject: `Check your order status here ➡️`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #F6F7FA; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18);">
            <div style="background-color: #193f0dff; color: white; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">Abe Garage</h2>
              <p style="margin: 5px 0 0;">Your Order is placed succesfully</p>
            </div>
            <div style="padding: 20px;">
              <p>Dear <strong>${first_name} ${last_name}</strong>,</p>
              <p>Thank you for choosing Abe Garage. Below are your link to check your order status details:</p>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background-color: #F6F7FA;">
                  <td style="padding: 10px; font-weight: bold;">Order ID:</td>
                  <td style="padding: 10px;">#${order_id}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold;">Order Secret:</td>
                  <td style="padding: 10px; color: #EE0D09; font-weight: bold; font-size: 1.2em;"><a href="https://abegarage.abenezerzewge.com/order/">${order_hash}</a></td>
                </tr>
              </table>
              <a href="https://abegarage.abenezerzewge.com/order/${order_hash}" style="margin-top: 30px;">https://abegarage.abenezerzewge.com/order/${order_hash}</a>
              <p style="margin-top: 30px;">Click the link below and save the link, you can check the status of your order everytime you want.</p>
              <p>If you have any questions, feel free to contact us.</p>
              <a href="mailto:info.abegarage@gmail.com" style="display: inline-block; margin-top: 20px; padding: 12px 20px; background-color: #EE0D09; color: white; text-decoration: none; border-radius: 4px;">Contact Support</a>
            </div>
            <div style="background-color: #113008ff; color: white; text-align: center; padding: 10px;">
              <small>&copy; ${now} Abe Garage. All rights reserved.</small>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      message: `Invoice marked as paid, email sent to ${email}`,
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to mark invoice as paid",
      success: false,
      error: error.message,
    });
  }
}

// Mark Invoice as Unpaid
export async function markUnpaid(req, res) {
  const { order_id } = req.params;

  try {
    const [invoice] = await connection.execute(
      "SELECT * FROM invoices WHERE order_id = ?",
      [order_id]
    );

    if (invoice.length === 0) {
      return res.status(404).json({
        message: "Invoice not found",
        success: false,
      });
    }

    await connection.execute(
      "UPDATE invoices SET is_paid = false, payment_date = NULL WHERE order_id = ?",
      [order_id]
    );

    return res.status(200).json({
      message: "Invoice marked as unpaid",
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to mark invoice as unpaid",
      success: false,
      error: error.message,
    });
  }
}
