import connection from "../config/database.config.js";
// request controller.js
export async function addRequest(req, res) {
  const { order_id, service_ids } = req.body;

  if (!order_id || !Array.isArray(service_ids) || service_ids.length === 0) {
    return res.status(400).json({
      message: "Order ID and at least one service_id are required",
      success: false,
    });
  }

  try {
    const insertPromise = service_ids.map(service_id => {
      return connection.execute(
        `INSERT INTO requests (order_id, service_id) VALUES (?, ?)`,
        [order_id, service_id]
      );
    });

    await Promise.all(insertPromise);

    return res.status(201).json({
      message: "Services successfully attached to order",
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to attach services",
      success: false,
      error: error.message
    });
  }
}

//Update request status 
export async function updateStatus(req, res) {
  const {request_id} = req.params;
  const {status} = req.body;

  try {
    const [request] = await connection.execute(
      "SELECT * FROM requests WHERE request_id = ?",[request_id]
    );

    if (request.length === 0) {
      return res.status(200).json({
        error: "No request found!",
        success: true
      });
    }
    let is_completed = true;
    if(status == 'false') is_completed = false
    await connection.execute(
        "UPDATE requests SET is_completed = ? WHERE request_id = ?",[is_completed,request_id]
    );
    return(
        res.status(200).json({
            message: "Request status updated!",
            success: true
        }))

  } catch (error) {
     return res.status(500).json({
       message: "Unable to update request status! Internal server error!",
       success: false,
       error: error.message
    });
  }
}
