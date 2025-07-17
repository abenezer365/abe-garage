# 🌐 Top 10 Common HTTP Status Codes

| Status Code | Name                  | Description                                                                 |
|-------------|-----------------------|-----------------------------------------------------------------------------|
| **200**     | OK                    | ✅ Request succeeded. Everything worked as expected.                        |
| **201**     | Created               | ✅ Resource was successfully created (e.g., after a POST request).          |
| **204**     | No Content            | ✅ Request succeeded, but there is no content to send in the response.      |
| **400**     | Bad Request           | ❌ The server couldn't understand the request due to invalid syntax/data.   |
| **401**     | Unauthorized          | ❌ Authentication failed or not provided.                                   |
| **403**     | Forbidden             | ❌ Authenticated but not authorized to access the requested resource.       |
| **404**     | Not Found             | ❌ The requested resource was not found on the server.                      |
| **409**     | Conflict              | ❌ Request could not be completed due to a conflict (e.g., duplicate data). |
| **500**     | Internal Server Error | ❌ Server encountered an unexpected condition.                              |
| **503**     | Service Unavailable   | ❌ Server is temporarily unavailable (maintenance or overload).             |

---

## 🧠 Quick Tips

- Use **201** after a successful `POST` that creates a new resource.
- Use **204** when deleting a resource and not returning any data.
- Use **401** for authentication-required errors (e.g., missing or invalid token).
- Use **403** for role-based restrictions (e.g., normal users accessing admin routes).
- Use **409** for duplicate data errors (e.g., existing email).

> ✅ Always accompany error responses with a helpful JSON message.
