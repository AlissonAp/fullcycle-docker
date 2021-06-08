FROM golang:alpine AS builder

ENV GO111MODULE=on

WORKDIR /app

COPY ./src/ .

RUN go mod init x
RUN go build -o main .

FROM scratch

COPY --from=builder /app/main /main

CMD ["/main"]