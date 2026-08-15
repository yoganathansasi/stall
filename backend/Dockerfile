# Build Stage
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Copy source code and dependency files
COPY go.mod ./
COPY . .

# Generate go.sum and download dependencies
RUN go mod tidy && go mod download

# Build application
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server cmd/server/main.go

# Run Stage
FROM alpine:3.19

WORKDIR /app

COPY --from=builder /app/server .

EXPOSE 8080

CMD ["./server"]
