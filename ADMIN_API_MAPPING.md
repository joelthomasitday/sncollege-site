# Admin Panel API Mapping & Integration Guide

This document serves as the definitive guide for connecting the Admin Panel frontend to the Backend API. It covers authentication, file uploads, and CRUD operations for all modules.

---

## 1. Auth Module

**Base URL**: `/api/auth`

### Login

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "email": "admin@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Logged in successfully"
  }
  ```
  _(Note: HttpOnly cookie `auth-token` is set automatically)_

### Get Current User (Me)

- **URL**: `/api/auth/me`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "65a...",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
  ```

### Logout

- **URL**: `/api/auth/logout`
- **Method**: `POST`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

### Example Fetch (Login)

```ts
const login = async (email, password) => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};
```

---

## 2. File Upload Module

**Base URL**: `/api/upload`

### Upload File

- **URL**: `/api/upload`
- **Method**: `POST`
- **Headers**: `Content-Type: multipart/form-data` (handled automatically by `FormData`)
- **Payload**: `FormData` object with a key `file`.
- **Response**:
  ```json
  {
    "success": true,
    "url": "https://res.cloudinary.com/.../image.jpg",
    "public_id": "sample_id",
    "optimizedUrl": "https://res.cloudinary.com/.../image/upload/f_auto,q_auto/sample_id",
    "autoCropUrl": "https://res.cloudinary.com/.../image/upload/c_auto,g_auto,h_500,w_500/sample_id"
  }
  ```

### Usage Pattern

1. **Upload**: Send file to `/api/upload`.
2. **Receive URL**: Get the `url` string from the response.
3. **Attach**: Send this URL as a string field (e.g., `photoUrl`, `pdfUrl`) to other CRUD endpoints.

### Example Upload Function

```ts
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData, // No Content-Type header needed
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.error);
  return data.url;
};
```

---

## 3. Pages Module (About, Vision, etc.)

**Base URL**: `/api/pages`

### List All Pages

- **URL**: `/api/pages`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      { "_id": "...", "slug": "about", "title": "About Us", ... }
    ]
  }
  ```

### Get Single Page

- **URL**: `/api/pages/[id]` (or filter list by slug)
- **Method**: `GET`

### Create Page

- **URL**: `/api/pages`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "slug": "vision",
    "title": "Our Vision",
    "content": "<p>HTML content...</p>"
  }
  ```

### Update Page

- **URL**: `/api/pages/[id]`
- **Method**: `PUT`
- **Payload**:
  ```json
  {
    "content": "<p>Updated content...</p>"
  }
  ```

### Recommended UI Fields

- **Title**: Text Input
- **Slug**: Read-only (or Text Input for new pages)
- **Content**: Rich Text Editor (Quill, TinyMCE)

---

## 4. Courses Module

**Base URL**: `/api/courses`

### List Courses

- **URL**: `/api/courses`
- **Method**: `GET`

### Add Course

- **URL**: `/api/courses`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "title": "B.Sc. Computer Science",
    "description": "Undergraduate program...",
    "duration": "3 Years",
    "department": "Computer Science"
  }
  ```

### Edit Course

- **URL**: `/api/courses/[id]`
- **Method**: `PUT`
- **Payload**: (Any subset of fields)

### Delete Course

- **URL**: `/api/courses/[id]`
- **Method**: `DELETE`

### UI Form Structure

- **Title**: Text Input
- **Department**: Dropdown or Text
- **Duration**: Text (e.g., "3 Years")
- **Description**: Textarea

---

## 5. Faculty Module

**Base URL**: `/api/faculty`

### List Faculty

- **URL**: `/api/faculty`
- **Method**: `GET`

### Add Faculty

- **URL**: `/api/faculty`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "name": "Dr. Smith",
    "designation": "Professor",
    "department": "Physics",
    "qualification": "Ph.D",
    "photoUrl": "https://res.cloudinary.com/..."
  }
  ```

### Integration Flow (Image Upload)

```ts
const handleSubmit = async (formData, file) => {
  let photoUrl = formData.photoUrl;

  if (file) {
    photoUrl = await uploadFile(file); // Use the upload helper
  }

  await fetch("/api/faculty", {
    method: "POST",
    body: JSON.stringify({ ...formData, photoUrl }),
  });
};
```

---

## 6. News Module

**Base URL**: `/api/news`

### Create News

- **URL**: `/api/news`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "title": "College Fest 2024",
    "content": "Details about the fest...",
    "date": "2024-12-25",
    "category": "Events"
  }
  ```

### List News

- **URL**: `/api/news`
- **Method**: `GET`

### Recommended UI Fields

- **Title**: Text Input
- **Date**: Date Picker
- **Category**: Dropdown (Events, Academic, Sports)
- **Content**: Rich Text Editor

---

## 7. Gallery Album Module

**Base URL**: `/api/gallery`

### Create Album

- **URL**: `/api/gallery`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "title": "Convocation 2023",
    "coverImage": "https://..."
  }
  ```

### Add Images to Album

_Note: This depends on your specific implementation. Typically, you update the album's image list._

- **URL**: `/api/gallery/[id]`
- **Method**: `PUT`
- **Payload**:
  ```json
  {
    "images": [
      "https://res.cloudinary.com/.../img1.jpg",
      "https://res.cloudinary.com/.../img2.jpg"
    ]
  }
  ```

### Bulk Upload Pattern

1. User selects 5 files.
2. Frontend loops through files and calls `uploadFile(file)` for each.
3. Collect all returned URLs into an array.
4. Send array to `/api/gallery/[id]`.

---

## 8. IQAC Document Module

**Base URL**: `/api/iqac` (or `/api/documents` depending on route setup)

### Add Document

- **URL**: `/api/iqac`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "title": "Annual Report 2023",
    "year": "2023",
    "url": "https://res.cloudinary.com/.../report.pdf"
  }
  ```

### Flow

1. Upload PDF via `/api/upload` -> Get URL.
2. Post metadata + URL to `/api/iqac`.

---

## 9. Unified Error Handling

The frontend should expect errors in this format (or normalize them to this):

```json
{
  "success": false,
  "error": {
    "message": "Invalid data",
    "field": "title"
  }
}
```

_Note: Some endpoints might currently return `{ success: false, message: "..." }`. The frontend fetch wrapper should handle both._

### Frontend Detection Logic

```ts
if (!response.ok || !data.success) {
  const errorMsg =
    data.error?.message || data.message || "Something went wrong";
  showToast.error(errorMsg);
}
```

---

## 10. Unified Success Response

Standard response format:

```json
{
  "success": true,
  "data": { ... }
}
```

### React Query / SWR Integration

```ts
const fetchCourses = async () => {
  const res = await fetch("/api/courses");
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data; // Return only the data payload
};

// Usage
const { data, error } = useSWR("/api/courses", fetchCourses);
```

---

## 11. Role-Based Access (Optional)

- **Admin**: Full access to all endpoints (GET, POST, PUT, DELETE).
- **Editor**:
  - Can: Create/Edit News, Gallery, Pages.
  - Cannot: Manage Faculty, Courses, or Delete critical resources.
  - _Implementation_: Check `req.user.role` in backend API routes before executing sensitive actions.

---
