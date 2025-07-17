import connection from "../config/database.config.js";
//Add Vehicle controller
export async function addVehicle(req, res) {
    const {customer_id,year,brand, model, type, mileage, tag, color, serial} = req.body;

    //check if all fields are provided
    if (!customer_id || !year || !brand || !model || !type || !mileage || !tag || !color || !serial) {
    return res.status(400).json({
        message: "Please enter all required fields",
        success : false    
        });
    }
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
      "INSERT INTO vehicles (customer_id,year,brand, model, type, mileage, tag, color, serial) VALUES (?,?,?,?,?,?,?,?,?)",
      [customer_id,year,brand, model, type, mileage, tag, color, serial]
    );

    return res.status(201).json({
        message: "Vehicle added to the database",
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
//Get All Vehicle controller
export async function getAllVehicles(req, res) {
    try {
   const [vehicles] = await connection.execute(
      `SELECT v.*, c.first_name, c.last_name, c.email
      FROM vehicles v
      JOIN customers c ON v.customer_id = c.customer_id`
    );


    if (vehicles.length === 0) {
      return res.status(200).json({
        error: "No vehicle found!",
        success: true
      });
    }

    res.status(200).json({
      message: "Vehicles retrieved successfully",
      success: true,
      vehicles: vehicles
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to qeury vehicles! Internal server error!",
       success: false,
      error: error.message
    });
  }
}
//Edit Vehicle controller
export async function editVehicle(req, res) {
     const {vehicle_id} = req.params;
     const {year,brand, model, type, mileage, tag, color, serial} = req.body;

    //check if all fields are provided
    if (!year || !brand || !model || !type || !mileage || !tag || !color || !serial) {
    return res.status(400).json({
        message: "Please enter all required fields",
        success : false    
        });
    }
  try {
    await connection.execute(
      `UPDATE vehicles
       SET  year = ?,
            brand = ?,
            model = ?,
            type = ?,
            mileage  = ?,
            tag = ?, 
            color = ?, 
            serial = ?
       WHERE vehicle_id = ?`,
      [year,brand, model, type, mileage, tag, color, serial, vehicle_id]
    );

    return res.status(200).json({
      message: "Vehicle updated successfully!",
      success: true
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
      error: error.message
    });
  }
}
//Get Single Vehicle controller
export async function getSingleVehicle(req, res) {
    // req.params.user_id comes from reqeust parameter
  const {vehicle_id} = req.params;

  try {
    const [vehicle] = await connection.execute(
      "SELECT * FROM vehicles WHERE vehicle_id = ?",[vehicle_id]
    );

    if (vehicle.length === 0) {
      return res.status(200).json({
        error: "No vehicle found!",
        success: true
      });
    }

    res.status(200).json({
      message: "Vehicle data retrieved successfully",
      success: true,
      vehicle: vehicle[0]
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to qeury vehicle! Internal server error!",
       success: false,
      error: error.message
    });
  }
}
//Get All Vehicle For One Customer controller
export async function getAllVehicleForOneCustomer(req, res) {
    // req.params.user_id comes from reqeust parameter
  const {customer_id} = req.params;

  try {
    const [vehicles] = await connection.execute(
      "SELECT * FROM vehicles WHERE customer_id = ?",[customer_id]
    );

    if (vehicles.length === 0) {
      return res.status(200).json({
        error: "No vehicle found!",
        success: true
      });
    }

    res.status(200).json({
      message: "Vehicle data retrieved successfully",
      success: true,
      vehicles: vehicles
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to qeury vehicles! Internal server error!",
       success: false,
      error: error.message
    });
  }
}
//Delete Vehicle controller
export async function deleteVehicle(req, res) {
    const {vehicle_id} = req.params;

  try {
    const [vehicle] = await connection.execute(
      "SELECT * FROM vehicles WHERE vehicle_id = ?",[vehicle_id]
    );

    if (vehicle.length === 0) {
      return res.status(200).json({
        message: "Service not found",
        success: true
      });
    }
       // Perform deletion
    await connection.execute(
      "DELETE FROM vehicles WHERE vehicle_id = ?",
      [vehicle_id]
    );

     res.status(200).json({
      message: "Vehicle Deleted ✅",
      success: true
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to Delete vehicle! Internal server error!",
       success: false,
       error: error.message
    });
  }
}

