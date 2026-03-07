# Luxury Seoul Backend

Production-ready Django REST API for the Luxury Seoul Jewelry e-commerce store.

## Features
- **Public API**: Catalog, search, filtering, and health check.
- **Admin API**: Secure CRUD for categories, products, and images.
- **Security**: JWT authentication for admin access.
- **Deployment**: Configured for Koyeb/Docker with PostgreSQL.
- **Efficiency**: Optimized querysets and organized app structure.

## Local Setup (Standard)
1.  **Clone the repository** (if not already cloned).
2.  **Navigate to backend**: `cd backend`.
3.  **Create virtual environment**: `python -m venv venv`.
4.  **Activate venv**: `venv\Scripts\activate` (Windows).
5.  **Install dependencies**: `pip install -r requirements.txt`.
6.  **Create .env**: Use `.env.example` as a template.
7.  **Run migrations**: `python manage.py migrate`.
8.  **Create superuser**: `python manage.py createsuperuser`.
9.  **Start server**: `python manage.py runserver`.

## Local Setup (Docker)
1.  **Run with Compose**: `docker-compose up --build`.
2.  **Access App**: `VITE_API_URL=https://zestful-betty-baveehub-f85022f4.koyeb.app`.
3.  **Access Admin**: `http://VITE_API_URL=https://zestful-betty-baveehub-f85022f4.koyeb.app/admin`.

## API Endpoints
- `GET /api/catalog/health/`: API status.
- `GET /api/catalog/categories/`: List categories.
- `GET /api/catalog/products/`: List products (filters: `category__slug`, `is_new`, `search`).
- `GET /api/catalog/products/<slug>/`: Detailed product info.
- `POST /api/auth/login/`: Get JWT tokens.

## Deployment on Koyeb
1.  Connect your GitHub repository to Koyeb.
2.  Configure Environment Variables:
    - `SECRET_KEY`: Your secret key.
    - `DEBUG`: `0`.
    - `DATABASE_URL`: Your PostgreSQL URL.
    - `ALLOWED_HOSTS`: `your-app-name.koyeb.app`.
    - `ADMIN_USER` & `ADMIN_PASSWORD`: (Optional) To create superuser on first run.
3.  Deploy.
