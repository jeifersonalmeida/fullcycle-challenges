FROM golang:latest AS builder
WORKDIR /app
COPY . .
RUN go build

FROM scratch
COPY --from=builder /app/hello-world .
ENTRYPOINT [ "./hello-world" ]