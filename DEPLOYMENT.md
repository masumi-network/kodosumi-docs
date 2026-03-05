# Deploying kodosumi-docs to Digital Ocean

This guide covers deploying the kodosumi-docs Next.js site to Digital Ocean using three approaches:

- **App Platform** (recommended — managed, zero infrastructure)
- **Droplets with Docker** (self-managed VM)
- **Container Registry + Kubernetes (DOKS)**

## Prerequisites

- [Digital Ocean account](https://cloud.digitalocean.com/)
- [`doctl` CLI](https://docs.digitalocean.com/reference/doctl/) installed and authenticated
- Docker installed locally (for Droplet or Container Registry paths)

---

## Option 1: App Platform (Recommended)

Digital Ocean App Platform auto-builds and deploys directly from your GitHub repository.

### Steps

1. Go to [App Platform](https://cloud.digitalocean.com/apps) in your Digital Ocean dashboard.
2. Click **Create App** and connect your GitHub account.
3. Select the `masumi-network/kodosumi-docs` repository and the `main` branch.
4. App Platform detects the `Dockerfile` automatically. Confirm the build settings:
   - **Type**: Web Service
   - **HTTP Port**: `3000`
   - **Run Command**: `node server.js`
5. Choose your plan (Basic or Pro depending on traffic needs).
6. Set any required environment variables (none required for a standard docs build).
7. Click **Deploy**.

App Platform handles SSL, CDN, and rolling deployments automatically. Each push to `main` triggers a new deployment.

---

## Option 2: Droplets with Docker

Deploy on a self-managed Ubuntu droplet.

### 1. Create a Droplet

```bash
doctl compute droplet create kodosumi-docs \
  --image ubuntu-22-04-x64 \
  --size s-1vcpu-1gb \
  --region fra1 \
  --ssh-keys <your-ssh-key-id>
```

### 2. Install Docker on the Droplet

```bash
ssh root@<droplet-ip>
apt-get update && apt-get install -y docker.io docker-compose
```

### 3. Build and Run

Clone the repository and start with Docker Compose:

```bash
git clone https://github.com/masumi-network/kodosumi-docs.git
cd kodosumi-docs
docker-compose up --build -d
```

The docs site is now served on port `3000`. To expose it on port 80/443, use Nginx or Caddy as a reverse proxy.

### 4. Nginx Reverse Proxy (optional)

```nginx
server {
    listen 80;
    server_name docs.kodosumi.io;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Option 3: Container Registry + Kubernetes (DOKS)

For production-grade deployments with auto-scaling.

### 1. Build and Push to Digital Ocean Container Registry

```bash
# Authenticate
doctl registry login

# Build the image
docker build -t registry.digitalocean.com/<your-registry>/kodosumi-docs:latest .

# Push
docker push registry.digitalocean.com/<your-registry>/kodosumi-docs:latest
```

### 2. Deploy to DOKS

Create a Kubernetes manifest `k8s/deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kodosumi-docs
spec:
  replicas: 2
  selector:
    matchLabels:
      app: kodosumi-docs
  template:
    metadata:
      labels:
        app: kodosumi-docs
    spec:
      containers:
        - name: kodosumi-docs
          image: registry.digitalocean.com/<your-registry>/kodosumi-docs:latest
          ports:
            - containerPort: 3000
          env:
            - name: NODE_ENV
              value: production
---
apiVersion: v1
kind: Service
metadata:
  name: kodosumi-docs
spec:
  selector:
    app: kodosumi-docs
  ports:
    - port: 80
      targetPort: 3000
  type: LoadBalancer
```

Apply with:

```bash
kubectl apply -f k8s/deployment.yaml
```

---

## Environment Variables

No environment variables are required for a standard documentation build.

| Variable   | Required | Default       | Description                   |
|------------|----------|---------------|-------------------------------|
| `NODE_ENV` | No       | `production`  | Node environment              |
| `PORT`     | No       | `3000`        | Port the server listens on    |
| `HOSTNAME` | No       | `0.0.0.0`     | Hostname binding              |

---

## Updating the Deployment

**App Platform**: deployments trigger automatically on every push to `main`.

**Droplet / Docker Compose**:

```bash
cd kodosumi-docs
git pull
docker-compose up --build -d
```

**DOKS**:

```bash
docker build -t registry.digitalocean.com/<your-registry>/kodosumi-docs:latest .
docker push registry.digitalocean.com/<your-registry>/kodosumi-docs:latest
kubectl rollout restart deployment/kodosumi-docs
```
