import connection from "../config/database.config.js";
import bcrypt from 'bcrypt'

//Add customer info Controller
export async function addCustomer(req, res) {
    const { first_name, last_name, email, phone } = req.body;

    //check if all fields are provided
    if (!email || !first_name || !last_name || !phone) {
    return res.status(400).json({
        message: "Please enter all required fields",
        success : false    
        });
    }

    try {
    //check if customer email already exists(row, field)
    const [user] = await connection.execute("SELECT * FROM customers where email = ?",[email]);
    if (user.length > 0) {
      if (user[0].email === email) {
         return res.status(409).json({
            message: "Customer Already exist",
            success: false, 
         });
      }
    }
        // Generate a stable 10-character alphanumeric string
    const customerHash = (await bcrypt.genSalt(10)).replace(/\W/g, '').slice(-10);
     await connection.execute(
      "INSERT INTO customers (first_name, last_name, email, phone, customer_hash ,is_active) VALUES (?,?,?,?,?,?)",
      [first_name, last_name, email, phone, customerHash, true]
    );

    return res.status(201).json({
        message: "Customer registered",
        success: true
    });
    } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error, Something went wrong!",
      error : error.message
    });
  }
}

//Get all customer info Controller
export async function getAllCustomers(req, res) {
  try {
    const [customers] = await connection.execute(
      "SELECT * FROM customers LIMIT 10"
    );

    if (customers.length === 0) {
      return res.status(200).json({
        error: "No customers yet!",
        success: true
      });
    }

    res.status(200).json({
      message: "Customers data retrieved successfully",
      success: true,
      customers: customers
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to qeury customers! Internal server error!",
       success: false,
      error: error.message
    });
  }
}

//Get single customer info Controller
export async function getSingleCustomer(req, res) {
  // req.params.user_id comes from reqeust parameter
  const {customer_id} = req.params;

  try {
    const [customer] = await connection.execute(
      "SELECT * FROM customers WHERE customer_id = ?",[customer_id]
    );

    if (customer.length === 0) {
      return res.status(200).json({
        error: "No customer yet!",
        success: true
      });
    }

    res.status(200).json({
      message: "Customer data retrieved successfully",
      success: true,
      user: customer[0]
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to qeury customer! Internal server error!",
       success: false,
      error: error.message
    });
  }
}

//Deactivate customer Controller
export async function deactivate(req, res) {
  // req.params.user_id comes from reqeust parameter
  const {customer_id} = req.params;

  try {
    const [customer] = await connection.execute(
      "SELECT * FROM customers WHERE customer_id = ?",[customer_id]
    );

    if (customer.length === 0) {
      return res.status(200).json({
        error: "No customer yet!",
        success: true
      });
    }

    await connection.execute(
      "UPDATE customers SET is_active = false WHERE customer_id = ?",[customer_id]
    );

     res.status(200).json({
      message: "Customer Deactivated",
      success: true
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to deactivate customer! Internal server error!",
       success: false,
       error: error.message
    });
  }
}

//Ativate customer Controller
export async function activate(req, res) {
  // req.params.user_id comes from reqeust parameter
  const {customer_id} = req.params;

  try {
    const [customer] = await connection.execute(
      "SELECT * FROM customers WHERE customer_id = ?",[customer_id]
    );

    if (customer.length === 0) {
      return res.status(200).json({
        error: "No customer yet!",
        success: true
      });
    }

    await connection.execute(
      "UPDATE customers SET is_active = true WHERE customer_id = ?",[customer_id]
    );

     res.status(200).json({
      message: "Customer Activated",
      success: true
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to Activate customer! Internal server error!",
       success: false,
       error: error.message
    });
  }
}

//Update customer info Controller
export async function editProfile(req, res) {
  const { first_name, last_name, email, phone } = req.body;
   const {customer_id} = req.params;

  if (!email || !first_name || !last_name || !phone) {
    return res.status(400).json({
      message: "Missing required fields",
      success: false
    });
  }

  try {

    // Check for duplicate email
    const [existingCustomer] = await connection.execute(
      "SELECT customer_id FROM customers WHERE email = ? AND customer_id != ?",
      [email, customer_id]
    );

    if (existingCustomer.length > 0) {
      return res.status(409).json({
        message: "Email already in use by another customer",
        success: false
      });
    }

    // Fixed UPDATE query (removed hashedPassword)
    await connection.execute(
      `UPDATE customers 
       SET first_name = ?, 
           last_name = ?, 
           email = ?,
           phone = ? 
       WHERE customer_id = ?`,
      [first_name, last_name, email, phone, customer_id]
    );

    return res.status(200).json({
      message: "Customer profile updated successfully!",
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      error: error.message
    });
  }
}

//Delete Customer
export async function deleteCustomer(req, res) {
  // req.params.user_id comes from reqeust parameter
  const {customer_id} = req.params;

  try {
    const [customer] = await connection.execute(
      "SELECT * FROM customers WHERE customer_id = ?",[customer_id]
    );

    if (customer.length === 0) {
      return res.status(200).json({
        message: "Customer not found",
        success: true
      });
    }
       // Perform deletion
    await connection.execute(
      "DELETE FROM customers WHERE customer_id = ?",
      [customer_id]
    );
    return(
      res.status(200).json({
       message: "Customer Deleted ✅",
       success: true
     }))

  } catch (error) {
     return res.status(500).json({
       message: "Unable to Delete customer! Internal server error!",
       success: false,
       error: error.message
    });
  }
}