import connection from "../config/database.config.js";
//Add Service controller
export async function addService(req, res) {
     const { name, description} = req.body;

    //check if all fields are provided
    if (!name || !description) {
    return res.status(400).json({
        message: "Please enter all required fields",
        success : false    
        });
    }
    try {
     await connection.execute(
      "INSERT INTO services (name, description,is_active) VALUES (?,?,?)",
      [name, description, true]
    );

    return res.status(201).json({
        message: "Service added to the database",
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
//Get All Services controller
export async function getAllServices(req, res) {
     try {
    const [services] = await connection.execute(
      "SELECT * FROM services LIMIT 15"
    );

    if (services.length === 0) {
      return res.status(200).json({
        error: "No services found!",
        success: true
      });
    }

    res.status(200).json({
      message: "Services retrieved successfully",
      success: true,
      services: services
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to qeury services! Internal server error!",
       success: false,
      error: error.message
    });
  }
}
//Edit Services controller
export async function editServices(req, res) {
    const { name, description} = req.body;
    const {service_id} = req.params;

    //check if all fields are provided
    if (!name || !description) {
    return res.status(400).json({
        message: "Please enter all required fields",
        success : false    
        });
    }

  try {
    // Fixed UPDATE query (removed hashedPassword)
    await connection.execute(
      `UPDATE services
       SET name = ?, 
           description = ?
       WHERE service_id = ?`,
      [name, description, service_id]
    );

    return res.status(200).json({
      message: "Service updated successfully!",
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
//Get Single Service controller
export async function getSingleService(req, res) {
    // req.params.user_id comes from reqeust parameter
  const {service_id} = req.params;

  try {
    const [service] = await connection.execute(
      "SELECT * FROM services WHERE service_id = ?",[service_id]
    );

    if (service.length === 0) {
      return res.status(200).json({
        error: "No service found!",
        success: true
      });
    }

    res.status(200).json({
      message: "Service data retrieved successfully",
      success: true,
      service: service[0]
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to qeury customer! Internal server error!",
       success: false,
      error: error.message
    });
  }
}
//Delete Service controller
export async function deleteService(req, res) {
    const {service_id} = req.params;

  try {
    const [service] = await connection.execute(
      "SELECT * FROM services WHERE service_id = ?",[service_id]
    );

    if (service.length === 0) {
      return res.status(200).json({
        message: "Service not found",
        success: true
      });
    }
       // Perform deletion
    await connection.execute(
      "DELETE FROM services WHERE service_id = ?",
      [service_id]
    );

     res.status(200).json({
      message: "Service Deleted ✅",
      success: true
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to Delete service! Internal server error!",
       success: false,
       error: error.message
    });
  }
}

//Deactivate Service Controller
export async function deactivate(req, res) {
  const {service_id} = req.params;

  try {
    const [service] = await connection.execute(
      "SELECT * FROM services WHERE service_id = ?",[service_id]
    );

    if (service.length === 0) {
      return res.status(200).json({
        error: "No service yet, Unable to deactivate!",
        success: false
      });
    }

    await connection.execute(
      "UPDATE services SET is_active = false WHERE service_id = ?",[service_id]
    );

     res.status(200).json({
      message: "Service Deactivated",
      success: true
    })

  } catch (error) {
     return res.status(500).json({
       message: "Unable to deactivate service! Internal server error!",
       success: false,
       error: error.message
    });
  }
}

//Ativate Service Controller
export async function activate(req, res) {
  const {service_id} = req.params;

  try {
    const [service] = await connection.execute(
      "SELECT * FROM services WHERE service_id = ?",[service_id]
    );

    if (service.length === 0) {
      return res.status(200).json({
        error: "No service yet, Unable to deactivate!",
        success: false
      });
    }

    await connection.execute(
      "UPDATE services SET is_active = true WHERE service_id = ?",[service_id]
    );

     res.status(200).json({
      message: "Service Activated",
      success: true
    })
  } catch (error) {
     return res.status(500).json({
       message: "Unable to Activate service! Internal server error!",
       success: false,
       error: error.message
    });
  }
}
